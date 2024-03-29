package handler

import (
	"net/http"
	"sort"
	"strconv"

	"github.com/gorilla/websocket"
	echo "github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"

	"backend/internal/domain/model"
	"backend/internal/domain/repository/groupChatRepo"
	"backend/internal/domain/repository/groupRepo"
	"backend/internal/domain/repository/messageRepo"
	"backend/internal/domain/repository/userGroupRepo"
	"backend/internal/infra/http/helper"
)

type Group struct {
	repo          groupRepo.Repository
	messageRepo   messageRepo.Repository
	userGroupRepo userGroupRepo.Repository
	groupChatRepo groupChatRepo.Repository
}

func NewGroup(repo groupRepo.Repository, messageRepo messageRepo.Repository, userGroupRepo userGroupRepo.Repository, groupChatRepo groupChatRepo.Repository) *Group {
	return &Group{
		groupChatRepo: groupChatRepo,
		messageRepo:   messageRepo,
		userGroupRepo: userGroupRepo,
		repo:          repo,
	}
}

func (g *Group) NewGroup(c echo.Context) error {
	creatorID, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	name := c.FormValue("name")
	if name == "" {
		return c.String(http.StatusBadRequest, "group name can not be empty")
	}

	uCreatorID := uint64(creatorID)

	logrus.Warnln("uc", uCreatorID)

	groupID, err := g.repo.Create(c.Request().Context(), model.Group{
		Creator:     uCreatorID,
		Name:        name,
		Description: c.FormValue("description"),
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if err = g.userGroupRepo.Create(c.Request().Context(), model.UserGroup{
		GroupID: groupID,
		UserID:  uCreatorID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusCreated)
}

func (g *Group) GetGroupData(c echo.Context) error {
	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	group, users, err := g.userGroupRepo.GetGroupWithUserGroups(c.Request().Context(), groupID)
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(group) == 0 {
		return c.String(http.StatusNotFound, "no groups found")
	}

	return c.JSON(http.StatusOK, echo.Map{
		"group": group,
		"users": users,
	})
}

func (g *Group) GetGroupDataWs(c echo.Context) error {
	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	for {
		var requestData struct {
			Stat string `json:"stat"`
		}

		err = ws.ReadJSON(&requestData)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				return err
			}
			break
		}

		if requestData.Stat == "exit" {
			break
		}

		groupID := groupID

		group, users, err := g.userGroupRepo.GetGroupWithUserGroups(c.Request().Context(), groupID)
		if err != nil {
			return echo.ErrInternalServerError
		}

		if len(group) == 0 {
			ws.WriteMessage(websocket.TextMessage, []byte("No groups found"))
			continue
		}

		err = ws.WriteJSON(echo.Map{
			"group": group,
			"users": users,
		})
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Group) GetGroups(c echo.Context) error {
	userID, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	uUserID := uint64(userID)

	groups, err := g.userGroupRepo.Get(c.Request().Context(), userGroupRepo.GetCommand{
		UserID: &uUserID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(groups) == 0 {
		return echo.ErrNotFound
	}

	return c.JSON(http.StatusOK, groups)
}

func (g *Group) DeleteGroup(c echo.Context) error {
	creatorID, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	uCreatorID := uint64(creatorID)

	groups, err := g.repo.Get(c.Request().Context(), groupRepo.GetCommand{
		ID:        &groupID,
		CreatorID: &uCreatorID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(groups) == 0 {
		return c.String(http.StatusNotFound, "group not found")
	}

	if err = g.repo.Delete(c.Request().Context(), groupRepo.GetCommand{
		ID:        &groupID,
		CreatorID: &uCreatorID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (g *Group) AddUserToGroup(c echo.Context) error {
	creatorID, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	uCreatorID := uint64(creatorID)

	groups, err := g.repo.Get(c.Request().Context(), groupRepo.GetCommand{
		ID:        &groupID,
		CreatorID: &uCreatorID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(groups) == 0 {
		return c.String(http.StatusNotFound, "group not found")
	}

	id, err := strconv.ParseUint(c.FormValue("id"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	if err = g.userGroupRepo.Create(c.Request().Context(), model.UserGroup{
		GroupID: groupID,
		UserID:  id,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusCreated)
}

func (g *Group) DeleteUserFromGroup(c echo.Context) error {
	creatorID, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	uCreatorID := uint64(creatorID)

	groups, err := g.repo.Get(c.Request().Context(), groupRepo.GetCommand{
		ID:        &groupID,
		CreatorID: &uCreatorID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(groups) == 0 {
		return c.String(http.StatusNotFound, "group not found")
	}

	id, err := strconv.ParseUint(c.Param("userid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	if err = g.userGroupRepo.Delete(c.Request().Context(), userGroupRepo.GetCommand{
		UserID:  &id,
		GroupID: &groupID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (g *Group) NewGroupMessage(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}
	uID := uint64(id)

	userID, err := strconv.ParseUint(c.Param("userid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	if userID != uID {
		return echo.ErrUnauthorized
	}

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	users, err := g.userGroupRepo.Get(c.Request().Context(), userGroupRepo.GetCommand{
		GroupID: &groupID,
		UserID:  &uID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(users) == 0 {
		return c.String(http.StatusNotFound, "you are not part of this group")
	}

	messageContent := c.FormValue("content")
	if messageContent == "" {
		return c.String(http.StatusBadRequest, "message body can not be empty")
	}

	messageID, err := g.messageRepo.Create(c.Request().Context(), model.Message{
		Content:  messageContent,
		ChatID:   groupID,
		SenderID: uID,
		Type:     model.TypeGP,
		IsRead:   "false",
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if err = g.groupChatRepo.Create(c.Request().Context(), model.GroupChat{
		GroupID:   groupID,
		MessageID: messageID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusCreated)
}

func (g *Group) NewGroupMessageWs(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}
	uID := uint64(id)

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	for {
		var incomingMessage struct {
			UserID         uint64 `json:"userid"`
			MessageContent string `json:"content"`
			Stat           string `json:"stat"`
		}

		err = ws.ReadJSON(&incomingMessage)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				return err
			}
			break
		}

		if incomingMessage.Stat == "exit" {
			break
		}

		userID := incomingMessage.UserID
		groupID := groupID
		messageContent := incomingMessage.MessageContent

		if userID != uID {
			ws.WriteMessage(websocket.TextMessage, []byte("Unauthorized"))
			continue
		}

		users, err := g.userGroupRepo.Get(c.Request().Context(), userGroupRepo.GetCommand{
			GroupID: &groupID,
			UserID:  &uID,
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		if len(users) == 0 {
			ws.WriteMessage(websocket.TextMessage, []byte("You are not part of this group"))
			continue
		}

		if messageContent == "" {
			ws.WriteMessage(websocket.TextMessage, []byte("Message body cannot be empty"))
			continue
		}

		messageID, err := g.messageRepo.Create(c.Request().Context(), model.Message{
			Content:  messageContent,
			ChatID:   groupID,
			SenderID: uID,
			Type:     model.TypeGP,
			IsRead:   "false",
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		if err = g.groupChatRepo.Create(c.Request().Context(), model.GroupChat{
			GroupID:   groupID,
			MessageID: messageID,
		}); err != nil {
			return echo.ErrInternalServerError
		}

		ws.WriteMessage(websocket.TextMessage, []byte("Message sent"))
	}

	return nil
}

func (g *Group) DeleteGroupMessage(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	uID := uint64(id)

	users, err := g.userGroupRepo.Get(c.Request().Context(), userGroupRepo.GetCommand{
		GroupID: &groupID,
		UserID:  &uID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(users) == 0 {
		return c.String(http.StatusNotFound, "you are not part of this group")
	}

	messageID, err := strconv.ParseUint(c.Param("messageid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	if err = g.messageRepo.Delete(c.Request().Context(), messageRepo.GetCommand{
		ID: &messageID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	if err = g.groupChatRepo.Delete(c.Request().Context(), groupChatRepo.GetCommand{
		ID:      &messageID,
		GroupID: &groupID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusCreated)
}

func (g *Group) GetGroupMessages(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	uID := uint64(id)

	users, err := g.userGroupRepo.Get(c.Request().Context(), userGroupRepo.GetCommand{
		GroupID: &groupID,
		UserID:  &uID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(users) == 0 {
		return c.String(http.StatusNotFound, "you are not part of this group")
	}

	count, err := strconv.ParseUint(c.Param("count"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	chatType := model.TypeGP

	messages, err := g.messageRepo.GetDto(c.Request().Context(), messageRepo.GetCommand{
		ChatID: &groupID,
		Type:   &chatType,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	sort.Slice(messages, func(i, j int) bool {
		return messages[i].CreatedAt.After(messages[j].CreatedAt)
	})

	if count > uint64(len(messages)) {
		count = uint64(len(messages))
	}

	return c.JSON(http.StatusOK, messages[:count])
}

func (g *Group) GetGroupMessagesWs(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}
	uID := uint64(id)

	groupID, err := strconv.ParseUint(c.Param("groupid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	for {
		var requestData struct {
			Count uint64 `json:"count"`
			Stat  string `json:"stat"`
		}

		err = ws.ReadJSON(&requestData)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				return err
			}
			break
		}

		if requestData.Stat == "exit" {
			break
		}

		groupID := groupID
		count := requestData.Count

		users, err := g.userGroupRepo.Get(c.Request().Context(), userGroupRepo.GetCommand{
			GroupID: &groupID,
			UserID:  &uID,
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		if len(users) == 0 {
			ws.WriteMessage(websocket.TextMessage, []byte("You are not part of this group"))
			continue
		}

		chatType := model.TypeGP

		messages, err := g.messageRepo.GetDto(c.Request().Context(), messageRepo.GetCommand{
			ChatID: &groupID,
			Type:   &chatType,
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		sort.Slice(messages, func(i, j int) bool {
			return messages[i].CreatedAt.After(messages[j].CreatedAt)
		})

		if count > uint64(len(messages)) {
			count = uint64(len(messages))
		}

		err = ws.WriteJSON(messages[:count])
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Group) NewGroupHandler(gr *echo.Group) {
	GroupsGroup := gr.Group("/groups")

	GroupsGroup.POST("", g.NewGroup)
	GroupsGroup.GET("/allgroups", g.GetGroups)
	GroupsGroup.GET("/:groupid", g.GetGroupData)
	GroupsGroup.GET("/:groupid/ws", g.GetGroupDataWs)
	GroupsGroup.DELETE("/:groupid", g.DeleteGroup)
	GroupsGroup.POST("/:groupid", g.AddUserToGroup)
	GroupsGroup.DELETE("/:groupid/:userid", g.DeleteUserFromGroup)
	GroupsGroup.POST("/:groupid/message/:userid", g.NewGroupMessage)
	GroupsGroup.GET("/:groupid/message/:userid/ws", g.NewGroupMessageWs)
	GroupsGroup.DELETE("/:groupid/message/:messageid", g.DeleteGroupMessage)
	GroupsGroup.GET("/:groupid/message/:count", g.GetGroupMessages)
	GroupsGroup.GET("/:groupid/message/get/ws", g.GetGroupMessagesWs)
}

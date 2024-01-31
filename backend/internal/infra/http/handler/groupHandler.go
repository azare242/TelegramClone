package handler

import (
	"net/http"
	"sort"
	"strconv"

	echo "github.com/labstack/echo/v4"

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

	if err := g.repo.Create(c.Request().Context(), model.Group{
		Creator:     uint64(creatorID),
		Name:        name,
		Description: c.FormValue("description"),
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusCreated)
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

func (g *Group) NewGroupHandler(gr *echo.Group) {
	GroupsGroup := gr.Group("/groups")

	GroupsGroup.POST("", g.NewGroup)
	GroupsGroup.DELETE("/:groupid", g.DeleteGroup)
	GroupsGroup.POST("/:groupid", g.AddUserToGroup)
	GroupsGroup.DELETE("/:groupid/:userid", g.DeleteUserFromGroup)
	GroupsGroup.POST("/:groupid/message/:userid", g.NewGroupMessage)
	GroupsGroup.DELETE("/:groupid/message/:messageid", g.DeleteGroupMessage)
	GroupsGroup.GET("/:groupid/message/:count", g.GetGroupMessages)
}

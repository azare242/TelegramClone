package handler

import (
	"net/http"
	"sort"
	"strconv"

	"github.com/gorilla/websocket"
	echo "github.com/labstack/echo/v4"

	"backend/internal/domain/model"
	"backend/internal/domain/repository/messageRepo"
	"backend/internal/domain/repository/userChatRepo"
	"backend/internal/infra/http/helper"
)

type Chat struct {
	repo        userChatRepo.Repository
	messageRepo messageRepo.Repository
}

func NewUserChat(repo userChatRepo.Repository, messageRepo messageRepo.Repository) *Chat {
	return &Chat{
		messageRepo: messageRepo,
		repo:        repo,
	}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (ch *Chat) NewChat(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	reciverID, err := strconv.ParseUint(c.FormValue("id"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	userid := uint64(id)

	chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		UserID:     &userid,
		ReceiverID: &reciverID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(chats) != 0 {
		return c.String(http.StatusConflict, "chat already exist")
	}

	if err := ch.repo.Create(c.Request().Context(), model.Chat{
		UserID:     userid,
		ReceiverID: reciverID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.String(http.StatusCreated, "chat created")
}

func (ch *Chat) GetChat(c echo.Context) error {
	_, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	chatID, err := strconv.ParseUint(c.Param("chatid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		ID: &chatID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(chats) == 0 {
		return echo.ErrNotFound
	}

	return c.JSON(http.StatusOK, chats)
}

func (ch *Chat) GetChats(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}
	userid := uint64(id)

	chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		UserID: &userid,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	reciverChats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		ReceiverID: &userid,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	allChats := append(chats, reciverChats...)

	_ = model.Chat{}
	_ = model.Message{}

	type response struct {
		Chat          model.Chat `json:"chat"`
		UnreadMessage int        `json:"unreadMessage"`
	}

	if len(allChats) == 0 {
		return echo.ErrNotFound
	}

	res := make([]response, len(allChats))
	cond := "false"
	for i, v := range allChats {
		messages, _ := ch.messageRepo.Get(c.Request().Context(), messageRepo.GetCommand{
			IsRead: &cond,
			ChatID: &v.ChatID,
		})
		res[i] = response{
			Chat:          v,
			UnreadMessage: len(messages),
		}
	}

	return c.JSON(http.StatusOK, res)
}

func (ch *Chat) GetChatsWs(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}
	userid := uint64(id)

	sendUpdatedChats := func() error {
		chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
			UserID: &userid,
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		receiverChats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
			ReceiverID: &userid,
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		allChats := append(chats, receiverChats...)

		type response struct {
			Chat          model.Chat `json:"chat"`
			UnreadMessage int        `json:"unreadMessage"`
		}

		if len(allChats) == 0 {
			return nil
		}

		res := make([]response, len(allChats))
		cond := "false"
		for i, v := range allChats {
			messages, _ := ch.messageRepo.Get(c.Request().Context(), messageRepo.GetCommand{
				IsRead: &cond,
				ChatID: &v.ChatID,
			})
			res[i] = response{
				Chat:          v,
				UnreadMessage: len(messages),
			}
		}

		return ws.WriteJSON(res)
	}

	for {
		err = sendUpdatedChats()
		if err != nil {
			return err
		}

		type msg struct {
			Message string `json:"message"`
		}
		var m msg
		err = ws.ReadJSON(&m)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				return err
			}
			break
		}

		if m.Message == "new" {
			err = sendUpdatedChats()
			if err != nil {
				return err
			}
		}
		if m.Message == "exit" {
			break
		}
	}

	return nil
}

func (ch *Chat) DeleteChat(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	chatID, err := strconv.ParseUint(c.Param("chatid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		ID: &chatID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(chats) == 0 {
		return c.String(http.StatusNotFound, "this chat does not exist")
	}
	if chats[0].UserID != uint64(id) && chats[0].ReceiverID != uint64(id) {
		return c.String(http.StatusNotFound, "can not access this chat")
	}

	if err = ch.repo.Delete(c.Request().Context(), userChatRepo.GetCommand{
		ID: &chatID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.String(http.StatusOK, "chat deleted")
}

func (ch *Chat) DeleteChatMessage(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	chatID, err := strconv.ParseUint(c.Param("chatid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	messageID, err := strconv.ParseUint(c.Param("messageid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		ID: &chatID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(chats) == 0 {
		return c.String(http.StatusNotFound, "this chat does not exist")
	}
	if chats[0].UserID != uint64(id) && chats[0].ReceiverID != uint64(id) {
		return c.String(http.StatusNotFound, "can not access this chat")
	}

	if err := ch.messageRepo.Delete(c.Request().Context(), messageRepo.GetCommand{
		ID: &messageID,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (ch *Chat) NewChatMessage(c echo.Context) error {
	senderId, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	chatID, err := strconv.ParseUint(c.Param("chatid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		ID: &chatID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(chats) == 0 {
		return c.String(http.StatusNotFound, "this chat does not exist")
	}
	if chats[0].UserID != uint64(senderId) && chats[0].ReceiverID != uint64(senderId) {
		return c.String(http.StatusNotFound, "can not access this chat")
	}

	messageContent := c.FormValue("content")
	if messageContent == "" {
		return c.String(http.StatusBadRequest, "message content can not be empty")
	}

	if _, err := ch.messageRepo.Create(c.Request().Context(), model.Message{
		ChatID:   chatID,
		SenderID: uint64(senderId),
		Type:     model.TypePV,
		IsRead:   "false",
		Content:  messageContent,
	}); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusCreated)
}

func (ch *Chat) NewChatMessageWs(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	senderId, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	chatID, err := strconv.ParseUint(c.Param("chatid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	for {
		var incomingMessage struct {
			Content string `json:"content"`
			Stat    string `json:"stat"`
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

		chatID := chatID
		messageContent := incomingMessage.Content

		chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
			ID: &chatID,
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		if len(chats) == 0 {
			ws.WriteMessage(websocket.TextMessage, []byte("This chat does not exist"))
			continue
		}
		if chats[0].UserID != uint64(senderId) && chats[0].ReceiverID != uint64(senderId) {
			ws.WriteMessage(websocket.TextMessage, []byte("Cannot access this chat"))
			continue
		}

		if messageContent == "" {
			ws.WriteMessage(websocket.TextMessage, []byte("Message content cannot be empty"))
			continue
		}

		if _, err := ch.messageRepo.Create(c.Request().Context(), model.Message{
			ChatID:   chatID,
			SenderID: uint64(senderId),
			Type:     model.TypePV,
			IsRead:   "false",
			Content:  messageContent,
		}); err != nil {
			return echo.ErrInternalServerError
		}

		ws.WriteMessage(websocket.TextMessage, []byte("Message sent"))
	}

	return nil
}

func (ch *Chat) GetMessageByCount(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	chatID, err := strconv.ParseUint(c.Param("chatid"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
		ID: &chatID,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(chats) == 0 {
		return c.String(http.StatusNotFound, "this chat does not exist")
	}
	if chats[0].UserID != uint64(id) && chats[0].ReceiverID != uint64(id) {
		return c.String(http.StatusNotFound, "can not access this chat")
	}

	count, err := strconv.ParseUint(c.Param("count"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	chatType := model.TypePV

	messages, err := ch.messageRepo.GetDto(c.Request().Context(), messageRepo.GetCommand{
		ChatID: &chatID,
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

func (ch *Chat) GetMessageByCountWs(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	chatID, err := strconv.ParseUint(c.Param("chatid"), 10, 64)
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

		chatID := chatID
		count := requestData.Count

		chats, err := ch.repo.Get(c.Request().Context(), userChatRepo.GetCommand{
			ID: &chatID,
		})
		if err != nil {
			return echo.ErrInternalServerError
		}

		if len(chats) == 0 {
			ws.WriteMessage(websocket.TextMessage, []byte("This chat does not exist"))
			continue
		}
		if chats[0].UserID != uint64(id) && chats[0].ReceiverID != uint64(id) {
			ws.WriteMessage(websocket.TextMessage, []byte("Cannot access this chat"))
			continue
		}

		chatType := model.TypePV

		messages, err := ch.messageRepo.GetDto(c.Request().Context(), messageRepo.GetCommand{
			ChatID: &chatID,
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

func (ch *Chat) NewUserChatHandler(g *echo.Group) {
	chatGroup := g.Group("/chats")

	chatGroup.POST("", ch.NewChat)
	chatGroup.GET("", ch.GetChats)
	chatGroup.GET("/ws", ch.GetChatsWs)
	chatGroup.GET("/:chatid", ch.GetChat)
	chatGroup.DELETE("/:chatid", ch.DeleteChat)
	chatGroup.POST("/:chatid/message", ch.NewChatMessage)
	chatGroup.GET("/:chatid/message/ws", ch.NewChatMessageWs)
	chatGroup.DELETE("/:chatid/message/:messageid", ch.DeleteChatMessage)
	chatGroup.GET("/:chatid/message/:count", ch.GetMessageByCount)
	chatGroup.GET("/:chatid/message/get/ws", ch.GetMessageByCountWs)
}

package handler

import (
	"net/http"
	"sort"
	"strconv"

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

	if len(chats) == 0 {
		return echo.ErrNotFound
	}

	return c.JSON(http.StatusOK, chats)
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

func (ch *Chat) NewUserChatHandler(g *echo.Group) {
	chatGroup := g.Group("/chats")

	chatGroup.POST("", ch.NewChat)
	chatGroup.GET("", ch.GetChats)
	chatGroup.GET("/:chatid", ch.GetChat)
	chatGroup.DELETE("/:chatid", ch.DeleteChat)
	chatGroup.POST("/:chatid/message", ch.NewChatMessage)
	chatGroup.DELETE("/:chatid/message/:messageid", ch.DeleteChatMessage)
	chatGroup.GET("/:chatid/message/:count", ch.GetMessageByCount)
}

package handler

import (
	"net/http"
	"strconv"

	echo "github.com/labstack/echo/v4"

	"backend/internal/domain/model"
	"backend/internal/domain/repository/userChatRepo"
	"backend/internal/infra/http/helper"
)

type Chat struct {
	repo userChatRepo.Repository
}

func NewGroupChat(repo userChatRepo.Repository) *Chat {
	return &Chat{
		repo,
	}
}

func (ch *Chat) NewChat(c echo.Context) error {
	id, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	reciverID, err := strconv.ParseUint(c.Param("id"), 10, 64)
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
	return nil
}

func (ch *Chat) GetChats(c echo.Context) error {
	return nil
}

func (ch *Chat) DeleteChat(c echo.Context) error {
	return nil
}

func (ch *Chat) DeleteChatMessage(c echo.Context) error {
	return nil
}

func (ch *Chat) NewGroupChatHandler(g *echo.Group) {
	chatGroup := g.Group("/chats")
	chatGroup.POST("", ch.NewChat)
	chatGroup.GET("", ch.GetChats)
	chatGroup.GET("/:chatid", ch.GetChat)
	chatGroup.DELETE("/:chatid", ch.DeleteChat)
	chatGroup.DELETE("/:chatid/message/:messageid", ch.DeleteChatMessage)
}

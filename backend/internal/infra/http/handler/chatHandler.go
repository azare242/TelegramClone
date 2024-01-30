package handler

import (
	echo "github.com/labstack/echo/v4"

	"backend/internal/domain/repository/groupChatRepo"
)

type Chat struct {
	repo groupChatRepo.Repository
}

func NewGroupChat(repo groupChatRepo.Repository) *Chat {
	return &Chat{
		repo,
	}
}

func (ch *Chat) NewChat(c echo.Context) error {
	return nil
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

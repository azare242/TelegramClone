package handler

import (
	echo "github.com/labstack/echo/v4"

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
	_, err := helper.ValidateJWT(c)
	if err != nil {
		return echo.ErrUnauthorized
	}

	return nil
}

func (g *Group) DeleteGroup(c echo.Context) error {
	return nil
}

func (g *Group) AddUserToGroup(c echo.Context) error {
	return nil
}

func (g *Group) DeleteUserFromGroup(c echo.Context) error {
	return nil
}

func (g *Group) NewGroupMessage(c echo.Context) error {
	return nil
}

func (g *Group) DeleteGroupMessage(c echo.Context) error {
	return nil
}

func (g *Group) NewGroupHandler(gr *echo.Group) {
	GroupsGroup := gr.Group("/groups")

	GroupsGroup.POST("/", g.NewGroup)
	GroupsGroup.DELETE("/:groupid", g.DeleteGroup)
	GroupsGroup.PATCH("/:groupid", g.AddUserToGroup)
	GroupsGroup.DELETE("/:groupid/:userid", g.DeleteUserFromGroup)
	GroupsGroup.POST("/:groupid/message/:userid", g.NewGroupMessage)
	GroupsGroup.DELETE("/:groupid/message/:messageid", g.DeleteGroupMessage)
}

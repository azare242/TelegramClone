package handler

import (
	echo "github.com/labstack/echo/v4"

	"backend/internal/domain/repository/groupRepo"
)

type Group struct {
	repo groupRepo.Repository
}

func NewGroup(repo groupRepo.Repository) *Group {
	return &Group{
		repo,
	}
}

func (g *Group) NewGroup(c echo.Context) error {
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

func (g *Group) NewGroupHandler(gr *echo.Group) {
	GroupsGroup := gr.Group("/groups")
	GroupsGroup.POST("/", g.NewGroup)
	GroupsGroup.DELETE("/:groupid", g.DeleteGroup)
	GroupsGroup.PATCH("/:groupid", g.AddUserToGroup)
	GroupsGroup.DELETE("/:groupid/:userid", g.DeleteUserFromGroup)
}

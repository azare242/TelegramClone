package handler

import (
	"net/http"
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

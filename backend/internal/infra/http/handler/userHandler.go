package handler

import (
	"net/http"
	"strconv"

	echo "github.com/labstack/echo/v4"

	"backend/internal/domain/model"
	"backend/internal/domain/repository/userRepo"
	"backend/internal/infra/http/helper"
)

type User struct {
	repo userRepo.Repository
}

func NewUser(repo userRepo.Repository) *User {
	return &User{
		repo,
	}
}

func (u *User) RegisterUser(c echo.Context) error {
	password := c.FormValue("password")

	passHash := helper.HashData(password)

	req := model.User{
		Username: c.FormValue("username"),
		Password: passHash,
		Phone:    c.FormValue("phone"),
		IsActive: true,
	}

	if err := u.repo.Create(c.Request().Context(), req); err != nil {
		return c.String(http.StatusInternalServerError, "Cant create user")
	}

	return c.String(http.StatusCreated, "User created")
}

func (u *User) LoginUser(c echo.Context) error {
	password := c.FormValue("password")
	username := c.FormValue("username")
	// id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	// if err != nil {
	// 	return echo.ErrBadRequest
	// }

	passHash := helper.HashData(password)

	users, err := u.repo.Get(c.Request().Context(), userRepo.GetCommand{
		ID:       nil,
		Username: &username,
		Phone:    nil,
		IsActive: nil,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(users) == 0 {
		return echo.ErrNotFound
	}
	if len(users) > 1 {
		return echo.ErrInternalServerError
	}
	if users[0].Password != passHash {
		return echo.ErrUnauthorized
	}

	token, err := helper.JwtToken(users[0].UserID)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": token,
	})
}

func (u *User) GetUserByID(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return echo.ErrBadRequest
	}

	users, err := u.repo.Get(c.Request().Context(), userRepo.GetCommand{
		ID:       &id,
		Username: nil,
		Phone:    nil,
		IsActive: nil,
	})
	if err != nil {
		return echo.ErrInternalServerError
	}

	if len(users) == 0 {
		return echo.ErrNotFound
	}
	if len(users) > 1 {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, users[0])
}

func (u *User) UpdateUser(c echo.Context) error {
	return nil
}

func (u *User) DeleteUser(c echo.Context) error {
	return nil
}

func (u *User) GetUserByKey(c echo.Context) error {
	return nil
}

func (u *User) GetUserContact(c echo.Context) error {
	return nil
}

func (u *User) NewUserContact(c echo.Context) error {
	return nil
}

func (u *User) DeleteUserContact(c echo.Context) error {
	return nil
}

func (u *User) NewUserHandler(g *echo.Group) {
	g.POST("/register", u.RegisterUser)
	g.POST("/login", u.LoginUser)

	// user endpoints
	userGroup := g.Group("/users")
	userGroup.GET("/:userid", u.GetUserByID)
	userGroup.PATCH("/:userid", u.UpdateUser)
	userGroup.DELETE("/:userid", u.DeleteUser)
	userGroup.GET("/", u.GetUserByKey)

	// users contact list endpoints
	userGroup.GET("/:userid/contacts", u.GetUserContact)
	userGroup.POST("/:userid/contacts", u.NewUserContact)
	userGroup.DELETE("/:userid/contacts/:contactid", u.DeleteUserContact)
}

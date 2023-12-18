package router

import (
	"backend/internal/domain/http/handler"
	"backend/internal/domain/http/middleware"
	"github.com/labstack/echo/v4"
)

func SetupRouter(e *echo.Echo) {
	e.GET("healthz", handler.Healthz)

	e.Use(middleware.CustomLoggerMiddleware)

	apiGroup := e.Group("/api")

	// general users endpoints
	apiGroup.POST("/register", handler.RegisterUser)
	apiGroup.POST("/login", handler.LoginUser)

	// user endpoints
	userGroup := apiGroup.Group("/users")
	userGroup.GET("/:userid", handler.GetUserByID)
	userGroup.PATCH("/:userid", handler.UpdateUser)
	userGroup.DELETE("/:userid", handler.DeleteUser)
	userGroup.GET("/", handler.GetUserByKey)

	// users contact list endpoints
	userGroup.GET("/:userid/contacts", handler.GetUserContact)
	userGroup.POST("/:userid/contacts", handler.NewUserContact)
	userGroup.DELETE("/:userid/contacts/:contactid", handler.DeleteUserContact)

	// chat endpoints
	chatGroup := apiGroup.Group("/chats")
	chatGroup.POST("/", handler.NewChat)
	chatGroup.GET("/", handler.GetChats)
	chatGroup.GET("/:chatid", handler.GetChat)
	chatGroup.DELETE("/:chatid", handler.DeleteChat)
	chatGroup.DELETE("/:chatid/message/:messageid", handler.DeleteChatMessage)

	GroupsGroup := apiGroup.Group("/groups")
	GroupsGroup.POST("/", handler.NewGroup)
	GroupsGroup.DELETE("/:groupid", handler.DeleteGroup)
	GroupsGroup.PATCH("/:groupid", handler.AddUserToGroup)
	GroupsGroup.DELETE("/:groupid/:userid", handler.DeleteUserFromGroup)
}

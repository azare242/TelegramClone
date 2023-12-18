package main

import (
	"backend/internal/domain/http/router"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	router.SetupRouter(e)

	e.Start("localhost:8080")
}

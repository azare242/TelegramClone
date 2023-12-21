package handler

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func Healthz(c echo.Context) error {
	return c.JSON(http.StatusOK, "OK!")
}

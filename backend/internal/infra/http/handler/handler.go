package handler

import (
	"net/http"

	echo "github.com/labstack/echo/v4"
)

func Healthz(c echo.Context) error {
	return c.JSON(http.StatusOK, "OK!")
}

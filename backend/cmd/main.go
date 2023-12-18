package main

import (
	"backend/internal/domain/config"
	"backend/internal/domain/http/router"
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
	"strconv"
)

func main() {
	conf, err := config.LoadConfig()
	if err != nil {
		log.Warnln("cant find config file")
	}
	e := echo.New()

	router.SetupRouter(e)

	if err := e.Start(conf.Server.Address + ":" + strconv.Itoa(conf.Server.Port)); err != nil {
		log.Fatalf("server failed to start %v", err)
	}
}

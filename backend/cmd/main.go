package main

import (
	"backend/internal/infra/config"
	"backend/internal/infra/http/router"
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

	//open, err := gorm.Open(sqlite.Open("messenger.db"), new(gorm.Config))
	//if err != nil {
	//	return
	//}

	//err = open.AutoMigrate(&model.Userr{}, &model.CreditCard{})
	//if err != nil {
	//	return
	//}

	if err := e.Start(conf.Server.Address + ":" + strconv.Itoa(conf.Server.Port)); err != nil {
		log.Fatalf("server failed to start %v", err)
	}
}

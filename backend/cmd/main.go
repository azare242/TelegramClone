package main

import (
	"backend/internal/domain/model"
	"backend/internal/infra/config"
	"backend/internal/infra/http/router"
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"strconv"
)

func main() {
	conf, err := config.LoadConfig()
	if err != nil {
		log.Warnln("cant find config file")
	}
	e := echo.New()

	router.SetupRouter(e)

	db, err := gorm.Open(sqlite.Open("messenger.db"), new(gorm.Config))
	if err != nil {
		log.Warnln("cant open db")
		return
	}
	//port := strconv.Itoa(conf.Database.Port)
	//dsn := "host=" + conf.Database.Addr + " user=" + conf.Database.User + " password=" + conf.Database.Password + " dbname=" + conf.Database.DBName + " port=" + port
	//db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	//if err != nil {
	//	log.Fatalf("failed to connect database %v", err)
	//}

	err = db.AutoMigrate(&model.User{}, &model.Chat{}, &model.Message{}, &model.Group{}, &model.Contact{}, &model.UserGroup{}, &model.GroupChat{})
	if err != nil {
		return
	}

	if err := e.Start(conf.Server.Address + ":" + strconv.Itoa(conf.Server.Port)); err != nil {
		log.Fatalf("server failed to start %v", err)
	}
}

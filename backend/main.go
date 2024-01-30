package main

import (
	"backend/internal/infra/config"
	"backend/internal/infra/http/handler"
	"backend/internal/infra/http/middleware"
	"backend/internal/infra/repository/contactPostgres"
	"backend/internal/infra/repository/groupChatPostgres"
	"backend/internal/infra/repository/groupPostgres"
	"backend/internal/infra/repository/messagePostgres"
	"backend/internal/infra/repository/userChatPostgres"
	"backend/internal/infra/repository/userGroupPostgres"
	"backend/internal/infra/repository/userPostgres"
	"strconv"

	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	conf, err := config.LoadConfig()
	if err != nil {
		log.Warnln("cant find config file")
	}

	db, err := gorm.Open(sqlite.Open("messenger.db"), new(gorm.Config))
	if err != nil {
		log.Warnln("cant open db")
		return
	}

	err = db.AutoMigrate(new(userPostgres.UserDTO), new(userChatPostgres.UserChatDTO), new(messagePostgres.MessageDTO), new(groupPostgres.GroupDTO),
		new(contactPostgres.ContactDTO), new(userGroupPostgres.UserGroupDTO), new(groupChatPostgres.GroupChatDTO))
	if err != nil {
		return
	}

	repou := userPostgres.New(db)

	//repom := messagePostgres.New(db)
	//repog := groupPostgres.New(db)
	repoc := contactPostgres.New(db)
	//repoug := userGroupPostgres.New(db)
	//repogc := groupChatPostgres.New(db)
	//repouc := userChatPostgres.New(db)

	e := echo.New()

	e.Use(middleware.CustomLoggerMiddleware)
	//e.Use(echoMiddleware.Recover())

	e.GET("healthz", handler.Healthz)

	//port := strconv.Itoa(conf.Database.Port)
	//dsn := "host=" + conf.Database.Addr + " user=" + conf.Database.User + " password=" + conf.Database.Password + " dbname=" + conf.Database.DBName + " port=" + port
	//db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	//if err != nil {
	//	log.Fatalf("failed to connect database %v", err)
	//}

	hu := handler.NewUser(repou, repoc)
	hu.NewUserHandler(e.Group("/api"))

	//hg := handler.NewGroup(repog)

	if err := e.Start(conf.Server.Address + ":" + strconv.Itoa(conf.Server.Port)); err != nil {
		log.Fatalf("server failed to start %v", err)
	}
}

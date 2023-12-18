package middleware

import (
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
	"time"
)

func CustomLoggerMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		start := time.Now()

		err := next(c)

		end := time.Now()
		latency := end.Sub(start)

		req := c.Request()
		res := c.Response()
		ip := c.RealIP()
		status := res.Status
		method := req.Method
		path := req.URL.Path
		if path == "" {
			path = "/"
		}
		log.Infof("Method: \"%s\"\t Path: \"%s\"\t Status: %d\t Latency: \"%s\"\t"+
			" ip: \"%s\"\t request body: \"%s\"", method, path, status, latency, ip, req.Body)

		if err != nil {
			c.Error(err)
		}
		return nil
	}
}

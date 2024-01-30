package helper

import (
	"backend/internal/infra/config"
	"crypto/sha256"
	"encoding/hex"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

func HashData(data string) string {
	h := sha256.New()
	h.Write([]byte(data))
	passHash := hex.EncodeToString(h.Sum(nil))

	return passHash
}

func ValidateJWT(c echo.Context) (float64, error) {
	tokenString := c.Request().Header.Get("Authorization")
	if tokenString == "" {
		return 0, echo.ErrUnauthorized
	}

	conf, _ := config.LoadConfig()

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, echo.ErrUnauthorized
		}
		return []byte(conf.Server.TokenKey), nil
	})

	if err != nil || !token.Valid {
		return 0, echo.ErrUnauthorized
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, echo.ErrUnauthorized
	}
	userID, ok := claims["sub"].(float64)
	if !ok {
		return 0, echo.ErrUnauthorized
	}
	return userID, nil
}

func JwtToken(id uint64) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = id
	claims["exp"] = time.Now().Add(time.Hour * 12).Unix()

	conf, _ := config.LoadConfig()

	tokenString, err := token.SignedString([]byte(conf.Server.TokenKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func DeleteValueFromArray(arr *[]string, value string) {
	index := -1

	for i, v := range *arr {
		if v == value {
			index = i
			break
		}
	}

	if index == -1 {
		return
	}

	*arr = append((*arr)[:index], (*arr)[index+1:]...)
}

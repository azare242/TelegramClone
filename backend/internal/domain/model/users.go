package model

import "github.com/pkg/errors"

var (
	UserNotFoundErr          = errors.New("user not found")
	WrongCredentialsErr      = errors.New("wrong credentials")
	PhoneAlreadyExistsErr    = errors.New("phone already exists")
	UsernameAlreadyExistsErr = errors.New("username already exists")
)

type User struct {
	Name           string `gorm:"type:varchar(255);not null" json:"name"`
	UserID         uint64 `gorm:"primaryKey;autoIncrement;not null" json:"userID"`
	Username       string `gorm:"type:varchar(255);not null;unique" json:"username"`
	Password       string `gorm:"type:varchar(255);not null" json:"-"`
	Phone          string `gorm:"type:varchar(255);not null;unique" json:"phone"`
	IsActive       bool   `gorm:"type:boolean;not null;default:false" json:"isActive"`
	Biography      string `gorm:"type:varchar(255);default:''" json:"biography"`
	ProfilePicture string `gorm:"type:varchar(255);default:''" json:"profilePicture"`
}

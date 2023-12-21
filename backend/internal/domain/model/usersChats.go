package model

import "errors"

var (
	ChatNotFoundErr = errors.New("chat not found")
)

type Chat struct {
	ChatID uint64 `gorm:"primaryKey;autoIncrement;not null" json:"chatID"`
	UserID     uint64 `gorm:"foreignKey;not null" json:"userID"`
	ReceiverID uint64 `gorm:"foreignKey;not null" json:"receiverID"`
}

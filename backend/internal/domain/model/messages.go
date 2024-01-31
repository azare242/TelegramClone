package model

import "errors"

var (
	MessageNotFoundErr = errors.New("message not found")
)

type Type string

const (
	TypePV Type = "PV"
	TypeGP Type = "GP"
)

type Message struct {
	MessageID uint64 `gorm:"primaryKey;autoIncrement;not null" json:"messageID"`
	ChatID    uint64 `gorm:"foreignKey;not null" json:"chatID"`
	SenderID  uint64 `gorm:"foreignKey;not null" json:"senderID"`
	Type      Type   `gorm:"not null" json:"type"`
	Content   string `gorm:"type:varchar(5000);not null" json:"content"`
	IsRead    bool   `gorm:"type:bool;default:false" json:"isRead"`
}

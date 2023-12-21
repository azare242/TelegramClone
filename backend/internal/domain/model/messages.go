package model

import "errors"

var (
	MessageNotFoundErr = errors.New("message not found")
)

type Message struct {
	MessageID uint64 `gorm:"primaryKey;autoIncrement;not null" json:"messageID"`
	ChatID    uint64 `gorm:"foreignKey;not null" json:"chatID"`
	SenderID  uint64 `gorm:"foreignKey;not null" json:"senderID"`
	Type      string `gorm:"type:enum('pv','gp')" json:"type"`
	Content   string `gorm:"type:varchar(500);not null" json:"content"`
	IsRead    bool   `gorm:"type:bool;default:false" json:"isRead"`
}

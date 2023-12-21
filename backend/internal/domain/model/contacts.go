package model

import "errors"

var (
	ContactNotFoundErr = errors.New("contact not found")
	BlockedContactErr  = errors.New("contact is blocked you")
)

type Contact struct {
	ContactID     uint64 `gorm:"primaryKey;autoIncrement;not null" json:"contactID"`
	UserID        uint64 `gorm:"foreignKey;not null" json:"userID"`
	ContactUserID uint64 `gorm:"foreignKey;not null" json:"contactUserID"`
	Status        string `gorm:"type:enum('pending','accepted','blocked');default:'pending'" json:"status"`
}

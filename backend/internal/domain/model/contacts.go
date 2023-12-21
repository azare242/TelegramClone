package model

import "errors"

var (
	ContactNotFoundErr = errors.New("contact not found")
	BlockedContactErr  = errors.New("contact is blocked you")
)

type Status string

const (
	Pending Status = "pending"
	Accepted Status = "accepted"
	Blocked  Status = "blocked"
)

type Contact struct {
	ContactID     uint64 `gorm:"primaryKey;autoIncrement;not null" json:"contactID"`
	UserID        uint64 `gorm:"foreignKey;not null" json:"userID"`
	ContactUserID uint64 `gorm:"foreignKey;not null" json:"contactUserID"`
	Status        Status `gorm:"default:'pending'" json:"status"`
}

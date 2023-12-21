package model

import "errors"

var (
	GroupNotFoundErr = errors.New("group not found")
)

type Group struct {
	GroupID     uint64 `gorm:"primaryKey;auto_increment;not null" json:"groupID"`
	Name        string `gorm:"type:varchar(255);not null" json:"name"`
	Description string `gorm:"type:varchar(255);not null" json:"description"`
}

package model

type UserGroup struct {
	UserGroupID uint64 `gorm:"primaryKey;autoIncrement;not null" json:"userGroupID"`
	UserID      uint64 `gorm:"foreignKey;not null" json:"userID"`
	GroupID     uint64 `gorm:"foreignKey;not null" json:"groupID"`
}

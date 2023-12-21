package model

type GroupChat struct {
	GroupChatID uint64 `gorm:"primaryKey;auto_increment;not null" json:"groupChatID"`
	GroupID     uint64 `gorm:"foreignKey;not null" json:"groupID"`
	MessageID   uint64 `gorm:"foreignKey;not null" json:"messageID"`
}

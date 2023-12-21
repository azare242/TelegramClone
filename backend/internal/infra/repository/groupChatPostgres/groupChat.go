package groupChatPostgres

import (
	"backend/internal/domain/model"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type GroupChatDTO struct {
	model.GroupChat
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (u *GroupChatDTO) ToGroupChat() *model.GroupChat {
	return &model.GroupChat{
		GroupChatID: u.GroupChatID,
		GroupID:     u.GroupID,
		MessageID:   u.MessageID,
	}
}

func ToGroupChatDTO(groupChat *model.GroupChat) *GroupChatDTO {
	return &GroupChatDTO{
		GroupChat: model.GroupChat{
			GroupChatID: groupChat.GroupChatID,
			GroupID:     groupChat.GroupID,
			MessageID:   groupChat.MessageID,
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

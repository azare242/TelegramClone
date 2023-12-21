package userChatPostgres

import (
	"backend/internal/domain/model"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type UserChatDTO struct {
	model.Chat
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (u *UserChatDTO) ToUserChat() *model.Chat {
	return &model.Chat{
		ChatID:   u.ChatID,
		UserID: u.UserID,
		ReceiverID: u.ReceiverID,
	}
}

func ToUserChatDTO(userChat *model.Chat) *UserChatDTO {
	return &UserChatDTO{
		Chat: model.Chat{
			ChatID:   userChat.ChatID,
			UserID: userChat.UserID,
			ReceiverID: userChat.ReceiverID,
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

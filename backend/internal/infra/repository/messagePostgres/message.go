package messagePostgres

import (
	"backend/internal/domain/model"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type MessageDTO struct {
	model.Message
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (m *MessageDTO) ToMessage() *model.Message {
	return &model.Message{
		MessageID: m.MessageID,
		ChatID:    m.ChatID,
		SenderID:  m.SenderID,
		Content:   m.Content,
		Type:      m.Type,
		IsRead:    m.IsRead,
	}
}

func ToMessageDTO(message *model.Message) *MessageDTO {
	return &MessageDTO{
		Message: model.Message{
			MessageID: message.MessageID,
			ChatID:    message.ChatID,
			SenderID:  message.SenderID,
			Content:   message.Content,
			Type:      message.Type,
			IsRead:    message.IsRead,
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

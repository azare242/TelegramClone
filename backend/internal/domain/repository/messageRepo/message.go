package messageRepo

import (
	"backend/internal/domain/model"
	"context"
	"time"
)

type GetCommand struct {
	ID       *uint64
	ChatID   *uint64
	SenderID *uint64
	Type     *model.Type
}

type Repository interface {
	Create(ctx context.Context, message model.Message) (uint64, error)
	Get(ctx context.Context, cmd GetCommand) ([]model.Message, error)
	Update(ctx context.Context, message model.Message) error
	Delete(ctx context.Context, cmd GetCommand) error
	GetDto(ctx context.Context, cmd GetCommand) ([]MessageDTO, error)
}

type MessageDTO struct {
	model.Message
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

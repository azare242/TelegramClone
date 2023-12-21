package userChatRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	ID         *uint64
	UserID     *uint64
	ReceiverID *uint64
}

type Repository interface {
	Create(ctx context.Context, userChat model.Chat) error
	Get(ctx context.Context, cmd GetCommand) ([]model.Chat, error)
	Update(ctx context.Context, userChat model.Chat) error
	Delete(ctx context.Context, cmd GetCommand) error
}

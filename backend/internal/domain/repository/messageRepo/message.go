package messageRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	ID       *uint64
	ChatID   *uint64
	SenderID *uint64
	Type     *model.Type
}

type Repository interface {
	Create(ctx context.Context, message model.Message) error
	Get(ctx context.Context, cmd GetCommand) ([]model.Message, error)
	Update(ctx context.Context, message model.Message) error
	Delete(ctx context.Context, cmd GetCommand) error
}
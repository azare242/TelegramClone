package groupChatRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	ID *uint64
	GroupID *uint64
}

type Repository interface {
	Create(ctx context.Context, groupChat model.GroupChat) error
	Get(ctx context.Context, cmd GetCommand) ([]model.GroupChat, error)
	Update(ctx context.Context, groupChat model.GroupChat) error
	Delete(ctx context.Context, cmd GetCommand) error
}

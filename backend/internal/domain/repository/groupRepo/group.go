package groupRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	ID        *uint64
	Name      *string
	CreatorID *uint64
}

type Repository interface {
	Get(ctx context.Context, cmd GetCommand) ([]model.Group, error)
	Create(ctx context.Context, group model.Group) error
	Update(ctx context.Context, group model.Group) error
	Delete(ctx context.Context, cmd GetCommand) error
}

package groupRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	GroupID *uint64
	Name   *string
}

type Repository interface {
	Get(ctx context.Context, cmd GetCommand) ([]model.Group, error)
	Create(ctx context.Context, group model.Group) error
	Delete(ctx context.Context, group model.Group) error
	Update(ctx context.Context, cmd GetCommand) error
}
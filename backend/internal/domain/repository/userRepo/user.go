package userRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	ID       *uint64
	Username *string
	Phone    *string
	IsActive *string
}

type Repository interface {
	Create(ctx context.Context, user model.User) error
	Get(ctx context.Context, cmd GetCommand) ([]model.User, error)
	Update(ctx context.Context, user model.User) error
	Delete(ctx context.Context, cmd GetCommand) error
}

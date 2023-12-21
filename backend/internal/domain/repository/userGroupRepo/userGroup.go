package userGroupRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	ID 	 *uint64
	UserID   *uint64
	GroupID  *uint64
}

type Repository interface {
	Create(ctx context.Context, userGroup model.UserGroup) error
	Get(ctx context.Context, cmd GetCommand) ([]model.UserGroup, error)
	Update(ctx context.Context, userGroup model.UserGroup) error
	Delete(ctx context.Context, cmd GetCommand) error
}

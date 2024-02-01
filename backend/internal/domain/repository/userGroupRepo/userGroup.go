package userGroupRepo

import (
	"backend/internal/domain/model"
	"backend/internal/infra/repository/groupPostgres"
	"context"
	"time"
)

type GetCommand struct {
	ID      *uint64
	UserID  *uint64
	GroupID *uint64
}

type UserGroupDTO struct {
	model.UserGroup
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Repository interface {
	Create(ctx context.Context, userGroup model.UserGroup) error
	Get(ctx context.Context, cmd GetCommand) ([]model.UserGroup, error)
	Update(ctx context.Context, userGroup model.UserGroup) error
	Delete(ctx context.Context, cmd GetCommand) error
	GetGroupWithUserGroups(ctx context.Context, groupID uint64) ([]groupPostgres.GroupDTO, []UserGroupDTO, error)
}

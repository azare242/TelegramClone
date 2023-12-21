package userGroupPostgres

import (
	"backend/internal/domain/model"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type UserGroupDTO struct {
	model.UserGroup
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (u *UserGroupDTO) ToUserGroup() *model.UserGroup {
	return &model.UserGroup{
		UserGroupID: u.UserGroupID,
		UserID:  u.UserID,
		GroupID: u.GroupID,
	}
}

func ToUserGroupDTO(userGroup *model.UserGroup) *UserGroupDTO {
	return &UserGroupDTO{
		UserGroup: model.UserGroup{
			UserGroupID: userGroup.UserGroupID,
			UserID:  userGroup.UserID,
			GroupID: userGroup.GroupID,
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

package userGroupPostgres

import (
	"backend/internal/domain/model"
	"backend/internal/domain/repository/userGroupRepo"
	"context"
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

func ToUserGroupDTO(userGroup model.UserGroup) *UserGroupDTO {
	return &UserGroupDTO{
		UserGroup: model.UserGroup{
			UserGroupID: userGroup.UserGroupID,
			UserID:  userGroup.UserID,
			GroupID: userGroup.GroupID,
		},
		CreatedAt: time.Now(),
	}
}

func (r *Repository) Create(ctx context.Context, userGroup model.UserGroup) error {
	userGroupDTO := ToUserGroupDTO(userGroup)

	result := r.db.WithContext(ctx).Create(userGroupDTO)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (r *Repository) Get(ctx context.Context, cmd userGroupRepo.GetCommand) ([]model.UserGroup, error) {
	var userGroupDTOs []UserGroupDTO
	var condition UserGroupDTO

	if cmd.ID != nil {
		condition.UserID = *cmd.ID
	}
	if cmd.GroupID != nil {
		condition.GroupID = *cmd.GroupID
	}
	if cmd.UserID != nil {
		condition.UserGroupID = *cmd.UserID
	}

	result := r.db.WithContext(ctx).Where(&condition).Find(&userGroupDTOs)
	if result.Error != nil {
		return nil, result.Error
	}

	userGroups := make([]model.UserGroup, len(userGroupDTOs))

	for i, userGroupDTO := range userGroupDTOs {
		userGroups[i] = *userGroupDTO.ToUserGroup()
	}

	return userGroups, nil
}

func (r *Repository) Update(ctx context.Context, userGroup model.UserGroup) error {
	var condition UserGroupDTO
	condition.UserGroupID = userGroup.UserGroupID

	dto := UserGroupDTO{
		UserGroup: userGroup,
		UpdatedAt: time.Now(),
	}

	result := r.db.WithContext(ctx).Where(&condition).Updates(&dto)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (r *Repository) Delete(ctx context.Context, cmd userGroupRepo.GetCommand) error {
	var condition UserGroupDTO

	if cmd.ID != nil {
		condition.UserID = *cmd.ID
	}
	if cmd.GroupID != nil {
		condition.GroupID = *cmd.GroupID
	}
	if cmd.UserID != nil {
		condition.UserGroupID = *cmd.UserID
	}

	result := r.db.WithContext(ctx).Where(&condition).Delete(&UserGroupDTO{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

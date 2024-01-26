package userPostgres

import (
	"backend/internal/domain/model"
	"backend/internal/domain/repository/userRepo"
	"context"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type UserDTO struct {
	model.User
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (u *UserDTO) ToUser() *model.User {
	return &model.User{
		UserID:         u.UserID,
		Username:       u.Username,
		Password:       u.Password,
		Phone:          u.Phone,
		IsActive:       u.IsActive,
		Biography:      u.Biography,
		ProfilePicture: u.ProfilePicture,
	}
}

func ToUserDTO(user model.User) *UserDTO {
	return &UserDTO{
		User: model.User{
			UserID:         user.UserID,
			Username:       user.Username,
			Password:       user.Password,
			Phone:          user.Phone,
			IsActive:       user.IsActive,
			Biography:      user.Biography,
			ProfilePicture: user.ProfilePicture,
		},
		CreatedAt: time.Now(),
	}
}

func (u *Repository) Create(ctx context.Context, user model.User) error {
	userDTO := ToUserDTO(user)

	result := u.db.WithContext(ctx).Create(userDTO)
	if result.Error != nil {
		log.Warnln(result.Error)
		return result.Error
	}

	return nil
}

func (u *Repository) Get(ctx context.Context, cmd userRepo.GetCommand) ([]model.User, error) {
	var userDTOs []UserDTO
	var condition UserDTO

	if cmd.ID != nil {
		condition.UserID = *cmd.ID
	}
	if cmd.Username != nil {
		condition.Username = *cmd.Username
	}
	if cmd.Phone != nil {
		condition.Phone = *cmd.Phone
	}
	if cmd.IsActive != nil {
		condition.IsActive = *cmd.IsActive
	}

	result := u.db.WithContext(ctx).Where(&condition).Find(&userDTOs)
	if result.Error != nil {
		return nil, result.Error
	}

	users := make([]model.User, len(userDTOs))
	for i, userDTO := range userDTOs {
		users[i] = *userDTO.ToUser()
	}

	return users, nil
}

func (u *Repository) Update(ctx context.Context, user model.User) error {
	var condition UserDTO
	condition.UserID = user.UserID

	dto := UserDTO{
		User:      user,
		UpdatedAt: time.Now(),
	}

	result := u.db.WithContext(ctx).Where(&condition).Updates(&dto)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (u *Repository) Delete(ctx context.Context, cmd userRepo.GetCommand) error {
	var condition UserDTO

	if cmd.ID != nil {
		condition.UserID = *cmd.ID
	}
	if cmd.Username != nil {
		condition.Username = *cmd.Username
	}
	if cmd.Phone != nil {
		condition.Phone = *cmd.Phone
	}
	if cmd.IsActive != nil {
		condition.IsActive = *cmd.IsActive
	}

	result := u.db.WithContext(ctx).Where(&condition).Delete(&UserDTO{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

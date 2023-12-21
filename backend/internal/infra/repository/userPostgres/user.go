package userPostgres

import (
	"backend/internal/domain/model"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type UserDTO struct {
	model.User
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
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

func ToUserDTO(user *model.User) *UserDTO {
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
		UpdatedAt: time.Now(),
	}
}

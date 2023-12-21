package groupPostgres

import (
	"backend/internal/domain/model"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type GroupDTO struct {
	model.Group
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (g *GroupDTO) ToGroup() *model.Group {
	return &model.Group{
		GroupID:   g.GroupID,
		Name: g.Name,
		Description: g.Description,
	}
}

func ToGroupDTO(group *model.Group) *GroupDTO {
	return &GroupDTO{
		Group: model.Group{
			GroupID:   group.GroupID,
			Name: group.Name,
			Description: group.Description,
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

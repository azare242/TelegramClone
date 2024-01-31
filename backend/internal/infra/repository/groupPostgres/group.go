package groupPostgres

import (
	"backend/internal/domain/model"
	"backend/internal/domain/repository/groupRepo"
	"context"
	"time"

	"gorm.io/gorm"
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
		GroupID:     g.GroupID,
		Name:        g.Name,
		Description: g.Description,
	}
}

func ToGroupDTO(group model.Group) *GroupDTO {
	return &GroupDTO{
		Group: model.Group{
			GroupID:     group.GroupID,
			Name:        group.Name,
			Description: group.Description,
		},
		CreatedAt: time.Now(),
	}
}

func (g *Repository) Create(ctx context.Context, group model.Group) error {
	groupDTO := ToGroupDTO(group)

	result := g.db.WithContext(ctx).Create(groupDTO)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (g *Repository) Get(ctx context.Context, cmd groupRepo.GetCommand) ([]model.Group, error) {
	var groupDTOs []GroupDTO
	var condition GroupDTO

	if cmd.ID != nil {
		condition.GroupID = *cmd.ID
	}
	if cmd.Name != nil {
		condition.Name = *cmd.Name
	}

	result := g.db.WithContext(ctx).Where(&condition).Find(&groupDTOs)
	if result.Error != nil {
		return nil, result.Error
	}

	groups := make([]model.Group, len(groupDTOs))
	for i, userDTO := range groupDTOs {
		groups[i] = *userDTO.ToGroup()
	}

	return groups, nil
}

func (g *Repository) Update(ctx context.Context, group model.Group) error {
	var condition GroupDTO
	condition.GroupID = group.GroupID

	dto := GroupDTO{
		Group:     group,
		UpdatedAt: time.Now(),
	}

	result := g.db.WithContext(ctx).Where(&condition).Updates(&dto)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (g *Repository) Delete(ctx context.Context, cmd groupRepo.GetCommand) error {
	var condition GroupDTO

	if cmd.ID != nil {
		condition.GroupID = *cmd.ID
	}
	if cmd.Name != nil {
		condition.Name = *cmd.Name
	}

	result := g.db.WithContext(ctx).Where(&condition).Delete(&GroupDTO{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

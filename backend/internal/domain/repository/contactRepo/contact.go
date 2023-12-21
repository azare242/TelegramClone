package contactRepo

import (
	"backend/internal/domain/model"
	"context"
)

type GetCommand struct {
	ID 	 *uint64
	UserID 	 *uint64
	Status 	 *model.Status
}

type Repository interface {
	Create(ctx context.Context, contact model.Contact) error
	Get(ctx context.Context, cmd GetCommand) ([]model.Contact, error)
	Update(ctx context.Context, contact model.Contact) error
	Delete(ctx context.Context, cmd GetCommand) error
}

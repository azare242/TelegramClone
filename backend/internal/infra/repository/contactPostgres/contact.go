package contactPostgres

import (
	"backend/internal/domain/model"
	"gorm.io/gorm"
	"time"
)

type Repository struct {
	db *gorm.DB
}

type ContactDTO struct {
	model.Contact
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (c *ContactDTO) ToContact() *model.Contact {
	return &model.Contact{
		ContactID:     c.ContactID,
		UserID:        c.UserID,
		ContactUserID: c.ContactUserID,
		Status:        c.Status,
	}
}

func ToContactDTO(contact *model.Contact) *ContactDTO {
	return &ContactDTO{
		Contact: model.Contact{
			ContactID:     contact.ContactID,
			UserID:        contact.UserID,
			ContactUserID: contact.ContactUserID,
			Status:        contact.Status,
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

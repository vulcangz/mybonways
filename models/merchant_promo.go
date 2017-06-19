package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/satori/go.uuid"
)

type MerchantPromo struct {
	ID               uuid.UUID `json:"id" db:"id"`
	CreatedAt        time.Time `json:"created_at" db:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" db:"updated_at"`
	ItemName         string    `json:"item_name" db:"item_name"`
	CompanyID        string    `json:"company_id" db:"company_id"`
	Category         string    `json:"category" db:"category"`
	OldPrice         int       `json:"old_price" db:"old_price"`
	NewPrice         int       `json:"new_price" db:"new_price"`
	StartDate        time.Time `json:"start_date" db:"start_date"`
	EndDate          time.Time `json:"end_date" db:"end_date"`
	Description      string    `json:"description" db:"description"`
	Images           []string  `json:"images" db:"-"`
	PromoImages      string    `json:"promo_images" db:"promo_images"`
	FeaturedImage    string    `json:"featured_image" db:"featured_image"`
	FeaturedImageB64 string    `json:"featured_image_b64" db:"featured_image_b64"`
	Slug             string    `json:"slug" db:"slug"`
}

// String is not required by pop and may be deleted
func (m MerchantPromo) String() string {
	jm, _ := json.Marshal(m)
	return string(jm)
}

// MerchantPromos is not required by pop and may be deleted
type MerchantPromos []MerchantPromo

// String is not required by pop and may be deleted
func (m MerchantPromos) String() string {
	jm, _ := json.Marshal(m)
	return string(jm)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (m *MerchantPromo) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (m *MerchantPromo) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (m *MerchantPromo) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

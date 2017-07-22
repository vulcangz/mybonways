package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/markbates/validate/validators"
	"github.com/satori/go.uuid"
)

type Favourite struct {
	ID        uuid.UUID `json:"id" db:"id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	PromoID   uuid.UUID `json:"promo_id" db:"promo_id"`
	PromoSlug string    `json:"promo_slug" db:"promo_slug"`
	CompanyID string    `json:"company_id" db:"company_id"`
}

// String is not required by pop and may be deleted
func (f Favourite) String() string {
	jf, _ := json.Marshal(f)
	return string(jf)
}

// Favourites is not required by pop and may be deleted
type Favourites []Favourite

// String is not required by pop and may be deleted
func (f Favourites) String() string {
	jf, _ := json.Marshal(f)
	return string(jf)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (f *Favourite) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.Validate(
		&validators.StringIsPresent{Field: f.PromoSlug, Name: "PromoSlug"},
		&validators.StringIsPresent{Field: f.CompanyID, Name: "CompanyID"},
	), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (f *Favourite) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (f *Favourite) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

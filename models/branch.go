package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/satori/go.uuid"
)

type Branch struct {
	ID            uuid.UUID `json:"id" db:"id"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
	CompanyID     string    `json:"company_id" db:"company_id"`
	Address       string    `json:"address" db:"address"`
	Neighbourhood string    `json:"neighbourhood" db:"neighbourhood"`
	City          string    `json:"city" db:"city"`
	Country       string    `json:"country" db:"country"`
	Latitude      float64   `json:"latitude" db:"latitude"`
	Longitude     float64   `json:"longitude" db:"longitude"`
}

// String is not required by pop and may be deleted
func (b Branch) String() string {
	jb, _ := json.Marshal(b)
	return string(jb)
}

// Branches is not required by pop and may be deleted
type Branches []Branch

// String is not required by pop and may be deleted
func (b Branches) String() string {
	jb, _ := json.Marshal(b)
	return string(jb)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (b *Branch) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (b *Branch) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (b *Branch) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

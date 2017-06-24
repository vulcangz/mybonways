package models

import (
	"encoding/json"
	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/markbates/validate/validators"
	"github.com/satori/go.uuid"
	"time"
)

type AllLocation struct {
	ID            uuid.UUID `json:"id" db:"id"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
	Country       string    `json:"country" db:"country"`
	City          string    `json:"city" db:"city"`
	Neighbourhood string    `json:"neighbourhood" db:"neighbourhood"`
}

// String is not required by pop and may be deleted
func (a AllLocation) String() string {
	ja, _ := json.Marshal(a)
	return string(ja)
}

// AllLocations is not required by pop and may be deleted
type AllLocations []AllLocation

// String is not required by pop and may be deleted
func (a AllLocations) String() string {
	ja, _ := json.Marshal(a)
	return string(ja)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (a *AllLocation) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.Validate(
		&validators.StringIsPresent{Field: a.Country, Name: "Country"},
		&validators.StringIsPresent{Field: a.City, Name: "City"},
		&validators.StringIsPresent{Field: a.Neighbourhood, Name: "Neighbourhood"},
	), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (a *AllLocation) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (a *AllLocation) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

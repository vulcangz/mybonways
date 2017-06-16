package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/satori/go.uuid"
)

type Location struct {
	ID         uuid.UUID  `json:"id" db:"id"`
	CreatedAt  time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at" db:"updated_at"`
	BranchID   uuid.UUID  `json:"branch_id" db:"branch_id"`
	CompanyID  string     `json:"company_id" db:"company_id"`
	Area       string     `json:"area" db:"area"`
	Coordinate [2]float64 `json:"coordinate" db:"coordinate"`
}

// String is not required by pop and may be deleted
func (l Location) String() string {
	jl, _ := json.Marshal(l)
	return string(jl)
}

// Locations is not required by pop and may be deleted
type Locations []Location

// String is not required by pop and may be deleted
func (l Locations) String() string {
	jl, _ := json.Marshal(l)
	return string(jl)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (l *Location) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (l *Location) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (l *Location) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

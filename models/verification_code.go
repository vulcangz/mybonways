package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/satori/go.uuid"
)

type VerificationCode struct {
	ID        uuid.UUID `json:"id" db:"id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	CompanyID string    `json:"company_id" db:"company_id"`
	Code      string    `json:"code" db:"code"`
}

// String is not required by pop and may be deleted
func (v VerificationCode) String() string {
	jv, _ := json.Marshal(v)
	return string(jv)
}

// VerificationCodes is not required by pop and may be deleted
type VerificationCodes []VerificationCode

// String is not required by pop and may be deleted
func (v VerificationCodes) String() string {
	jv, _ := json.Marshal(v)
	return string(jv)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (v *VerificationCode) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (v *VerificationCode) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (v *VerificationCode) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

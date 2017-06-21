package models

import (
	"encoding/json"
	"time"

	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/satori/go.uuid"
)

type Merchant struct {
	ID                     uuid.UUID `json:"id" db:"id"`
	CreatedAt              time.Time `json:"created_at" db:"created_at"`
	UpdatedAt              time.Time `json:"updated_at" db:"updated_at"`
	Approved               bool      `json:"approved" db:"approved"`
	CompanyName            string    `json:"company_name" db:"company_name"`
	CompanyID              string    `json:"company_id" db:"company_id"`
	MerchantEmail          string    `json:"merchant_email" db:"merchant_email"`
	MerchantPassword       []byte    `json:"-" db:"merchant_password"`
	MerchantPasswordString string    `json:"merchant_password" db:"-"`
	Slug                   string    `json:"slug" db:"slug"`
}

// String is not required by pop and may be deleted
func (m Merchant) String() string {
	jm, _ := json.Marshal(m)
	return string(jm)
}

// Merchants is not required by pop and may be deleted
type Merchants []Merchant

// String is not required by pop and may be deleted
func (m Merchants) String() string {
	jm, _ := json.Marshal(m)
	return string(jm)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (m *Merchant) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (m *Merchant) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (m *Merchant) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

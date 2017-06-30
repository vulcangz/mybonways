package models

import (
	"encoding/json"
	"github.com/markbates/pop"
	"github.com/markbates/validate"
	"github.com/markbates/validate/validators"
	"github.com/satori/go.uuid"
	"time"
)

type Slide struct {
	ID        uuid.UUID `json:"id" db:"id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	Url       string    `json:"url" db:"url"`
	Image     string    `json:"image" db:"image"`
}

// String is not required by pop and may be deleted
func (s Slide) String() string {
	js, _ := json.Marshal(s)
	return string(js)
}

// Slides is not required by pop and may be deleted
type Slides []Slide

// String is not required by pop and may be deleted
func (s Slides) String() string {
	js, _ := json.Marshal(s)
	return string(js)
}

// Validate gets run everytime you call a "pop.Validate" method.
// This method is not required and may be deleted.
func (s *Slide) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.Validate(
		&validators.StringIsPresent{Field: s.Url, Name: "Url"},
		&validators.StringIsPresent{Field: s.Image, Name: "Image"},
	), nil
}

// ValidateSave gets run everytime you call "pop.ValidateSave" method.
// This method is not required and may be deleted.
func (s *Slide) ValidateSave(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run everytime you call "pop.ValidateUpdate" method.
// This method is not required and may be deleted.
func (s *Slide) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

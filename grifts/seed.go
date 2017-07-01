package grifts

import (
	"github.com/markbates/grift/grift"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

var _ = grift.Add("db:seed:admin", func(c *grift.Context) error {

	// Add DB seeding stuff here
	admin := models.Admin{
		Email:          "hello@mybonways.com",
		PasswordString: "password",
	}

	var err error
	admin.Password, err = bcrypt.GenerateFromPassword([]byte(admin.PasswordString), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	admin.PasswordString = ""
	err = models.DB.Create(&admin)
	if err != nil {
		return err
	}
	return nil
})

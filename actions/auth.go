package actions

import (
	"log"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

// Login contains login details
type Login struct {
	// PasswordHash []byte
	Email    string `db:"merchant_email"`
	Password string `db:"merchant_password"`
}

/*
	{
	"company_name":"My BonWays",
	"company_id":"mybonways",
	"merchant_email":"hello@mybonways.com",
	"merchant_password":"password"
}
*/

// MerchantLogin handles login for merchants...
func MerchantLogin(c buffalo.Context) error {
	// get the post parameters...
	login := &Login{}
	err := c.Bind(login)
	if err != nil {
		return errors.WithStack(err)
	}
	// check if the email and password is in the db...
	log.Println("Login: ", login)
	// login.PasswordHash, err = bcrypt.GenerateFromPassword([]byte(login.Password), bcrypt.DefaultCost)
	tx := c.Value("tx").(*pop.Connection)
	query := pop.Q(tx)
	query = tx.Where("merchant_email = ?", login.Email)
	m := models.Merchant{}

	err = query.First(&m)
	if err != nil {
		log.Printf("first error: %#v \n ", m)
		log.Println("err", err)
		return c.Error(404, errors.WithStack(err))
	}

	// check if the password is correct:
	err = bcrypt.CompareHashAndPassword(m.MerchantPassword, []byte(login.Password))
	if err != nil {
		log.Printf("first error: %#v \n ", m)
		log.Println("err", err)
		return c.Error(404, errors.WithStack(err))
	}

	log.Printf("Login merchant: %#v \n ", m)
	/// since the person is in the database...generate a token for him/her
	token, err := GenerateJWT(m)
	if err != nil {
		log.Println("GenJwt error: ", err)
		return c.Error(404, errors.WithStack(err))
	}
	return c.Render(200, render.JSON(token))
}

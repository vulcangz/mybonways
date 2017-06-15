package actions

import (
	"encoding/json"
	"log"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

// Login contains login details
type MerchantLoginStruct struct {
	// PasswordHash []byte
	CompanyID        string `json:"company_id"`
	MerchantEmail    string `json:"merchant_email"`
	MerchantPassword string `json:"merchant_password"`
}

// MerchantLogin handles login for merchants...
func MerchantLogin(c buffalo.Context) error {
	// get the post parameters...
	login := &MerchantLoginStruct{}
	err := c.Bind(login)
	if err != nil {
		return errors.WithStack(err)
	}
	// check if the email and password is in the db...
	log.Println("Login: ", login)

	tx := c.Value("tx").(*pop.Connection)
	query := pop.Q(tx)
	query = tx.Where("company_id = ?", login.CompanyID).Where("merchant_email = ?", login.MerchantEmail)
	m := models.Merchant{}

	err = query.First(&m)
	if err != nil {
		log.Printf("first error: %#v \n ", m)
		log.Println("err", err)
		return c.Error(http.StatusNotFound, errors.WithStack(err))
	}

	// check if the password is correct:
	err = bcrypt.CompareHashAndPassword(m.MerchantPassword, []byte(login.MerchantPassword))
	if err != nil {
		log.Printf("first error: %#v \n ", m)
		log.Println("err", err)
		return c.Error(http.StatusNotAcceptable, errors.WithStack(err))
	}

	log.Printf("Login merchant: %#v \n ", m)
	/// since the person is in the database...generate a token for him/her
	token, err := GenerateJWT(m)
	if err != nil {
		log.Println("GenJwt error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	cookie := &http.Cookie{
		Name:  "X-MERCHANT-TOKEN",
		Value: token["token"].(string),
		Path:  "/",
	}

	http.SetCookie(c.Response(), cookie)
	return c.Render(http.StatusOK, render.JSON(token))
}

func MerchantLoginCheckMiddleware(next buffalo.Handler) buffalo.Handler {
	return func(c buffalo.Context) error {
		req := c.Request()
		if req.Method != "GET" {
			b, err := json.Marshal(req.Form)
			if err == nil {
				c.LogField("form", string(b))
			}
		}
		b, err := json.Marshal(c.Params())
		if err == nil {
			c.LogField("params", string(b))
		}

		cookie, err := req.Cookie("X-MERCHANT-TOKEN")
		if err != nil {
			c.LogField("auth", "not authenticated. No cookie")
			return c.Error(http.StatusForbidden, errors.WithStack(err))
		}

		tokenValue := cookie.Value
		log.Println("tokenValue: ", tokenValue)
		// validate the token
		token, err := jwt.Parse(tokenValue, func(token *jwt.Token) (interface{}, error) {
			publicKey, err := jwt.ParseRSAPublicKeyFromPEM(encryption.Bytes("public.pub"))

			if err != nil {
				return publicKey, err
			}
			return publicKey, nil
		})

		// branch out into the possible error from signing
		switch err.(type) {

		case nil: // no error
			if !token.Valid { // but may still be invalid
				log.Println("invalid token: ", err)
				return c.Error(http.StatusForbidden, errors.WithStack(err))
			}

			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				c.Set("Merchant", claims["Merchant"])
			} else {
				log.Println("not ok: ", err)
				return c.Error(http.StatusForbidden, errors.WithStack(err))
			}
			return next(c)
		default: // something else went wrong
			// log.Printf("error: %#v", err)
			log.Println("error: ", err)
			return c.Error(http.StatusForbidden, errors.WithStack(err))
		}

		// return next(c)
	}
}

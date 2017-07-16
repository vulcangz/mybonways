package actions

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

// Login contains login details
type AdminLoginStruct struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// AdminLogin handles login for merchants...
func AdminLogin(c buffalo.Context) error {
	// get the post parameters...
	login := AdminLoginStruct{}
	err := c.Bind(&login)
	if err != nil {
		return errors.WithStack(err)
	}
	// check if the email and password is in the db...
	log.Println("Login: ", login)

	tx := c.Value("tx").(*pop.Connection)
	query := pop.Q(tx)
	query = tx.Where("email = ?", login.Email)
	admin := models.Admin{}

	err = query.First(&admin)
	if err != nil {
		log.Printf("first error: %#v \n ", admin)
		log.Println("err", err)
		return c.Error(http.StatusNotFound, errors.WithStack(err))
	}

	// check if the password is correct:
	err = bcrypt.CompareHashAndPassword(admin.Password, []byte(login.Password))
	if err != nil {
		log.Printf("first error: %#v \n ", admin)
		log.Println("err", err)
		return c.Error(http.StatusNotAcceptable, errors.WithStack(err))
	}

	log.Printf("Login merchant: %#v \n ", admin)
	/// since the person is in the database...generate a token for him/her
	token, err := GenerateAdminJWT(admin)
	if err != nil {
		log.Println("GenJwt error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	cookie := &http.Cookie{
		Name:    "X-ADMIN-TOKEN",
		Value:   token["token"].(string),
		Path:    "/",
		Expires: time.Now().Add(365 * 24 * time.Hour),
	}

	http.SetCookie(c.Response(), cookie)
	return c.Render(http.StatusOK, render.JSON(token))
}

func AdminLoginCheckMiddleware(next buffalo.Handler) buffalo.Handler {
	log.Println("ADMIN LOGIN MIDDLEWARE")
	return func(c buffalo.Context) error {
		req := c.Request()
		if req.Method != "GET" {
			b, err := json.Marshal(req.Form)
			if err == nil {
				log.Println("not get")
				c.LogField("form", string(b))
			}
		}
		b, err := json.Marshal(c.Params())
		if err == nil {
			c.LogField("params", string(b))
		}

		cookie, err := req.Cookie("X-ADMIN-TOKEN")
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
				log.Printf("\nAdmin is set... %T \n %#v\n", claims["Admin"], claims["Admin"])

				c.Set("Admin", claims["Admin"])
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

// GenerateMerchantJWT generates a jwt token for the user
func GenerateAdminJWT(admin models.Admin) (map[string]interface{}, error) {
	claims := jwt.MapClaims{}

	resp := make(map[string]interface{})

	// create claims
	claims["Admin"] = admin
	claims["AdminEmail"] = admin.Email

	// set the expiration to 1 year in milliseconds
	claims["exp"] = time.Now().Add(time.Hour * 24 * 30 * 12).Unix()

	t := jwt.NewWithClaims(jwt.GetSigningMethod("RS256"), claims)

	// pub, err := jwt.ParseRSAPrivateKeyFromPEM(config.Get().Encryption.Private)
	pub, err := jwt.ParseRSAPrivateKeyFromPEM(encryption.Bytes("private.pem"))
	if err != nil {
		return resp, err
	}
	tokenString, err := t.SignedString(pub)
	if err != nil {
		return resp, err
	}

	resp["admin"] = admin
	resp["message"] = "Token successfully generated"
	resp["token"] = tokenString

	return resp, err
}

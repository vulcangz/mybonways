package actions

import (
	"log"
	"math/rand"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gobuffalo/buffalo"
	"github.com/tonyalaribe/mybonways/models"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// GenerateJWT generates a jwt token for the user
func GenerateJWT(m models.Merchant) (map[string]interface{}, error) {
	claims := jwt.MapClaims{}

	resp := make(map[string]interface{})

	// create claims
	claims["Merchant"] = m
	claims["MerchantEmail"] = m.MerchantEmail

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

	resp["merchant"] = m
	resp["message"] = "Token successfully generated"
	resp["token"] = tokenString

	return resp, err
}

// RandStringBytes generates random string...(for appending to slugs)
func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func ServeLocale(c buffalo.Context) error {
	language := strings.Split(c.Request().Header["Accept-Language"][0], ",")[0]
	log.Println("REQUEST:: ", language)
	err := c.Render(200, spa.Template("text/javascript", "assets/js/AdminMenu/menu-"+language+".js"))
	if err != nil {
		log.Println("ERROR:: ", err)
		language = strings.Split(language, ";")[0]
		err = c.Render(200, spa.Template("text/javascript", "assets/js/AdminMenu/menu-"+language+".js"))
		if err != nil {
			err = c.Render(200, spa.Template("text/javascript", "assets/js/AdminMenu/menu-en.js"))
		}
	}
	return err
}

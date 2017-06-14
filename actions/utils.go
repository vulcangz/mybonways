package actions

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/tonyalaribe/mybonways/models"
)

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

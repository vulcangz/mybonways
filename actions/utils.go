package actions

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/tonyalaribe/mybonways/config"
	"github.com/tonyalaribe/mybonways/models"
)

// GenerateJWT generates a jwt token for the user
func GenerateJWT(m models.Merchant) (resp models.MerchantLogin, err error) {
	claims := jwt.MapClaims{}

	// create claims
	claims["Merchant"] = m
	claims["email"] = m.MerchantEmail

	// set the expiration to 1 year in milliseconds
	claims["exp"] = time.Now().Add(time.Hour * 24 * 30 * 12).Unix()

	t := jwt.NewWithClaims(jwt.GetSigningMethod("RS256"), claims)

	pub, err := jwt.ParseRSAPrivateKeyFromPEM(config.Get().Encryption.Private)
	if err != nil {
		return
	}
	tokenString, err := t.SignedString(pub)

	if err != nil {
		return
	}

	resp = models.MerchantLogin{
		Merchant: m,
		Message:  "Token succesfully generated",
		Token:    tokenString,
	}

	return
}

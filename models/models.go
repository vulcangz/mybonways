package models

import (
	"log"

	"github.com/gobuffalo/envy"
	"github.com/markbates/pop"
)

// DB is a connection to your database to be used
// throughout your application.
var DB *pop.Connection

func init() {
	var err error
	env := envy.Get("GO_ENV", "development")
	DB, err = pop.Connect(env)
	if err != nil {
		log.Fatal(err)
	}

	debug := envy.Get("DEBUG", "true")

	pop.Debug = env == "development" || debug == "true"
	pop.Debug = true
	pop.MapTableName("merchant_promo_search_results", "merchant_promos")
}

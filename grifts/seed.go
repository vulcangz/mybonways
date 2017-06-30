package grifts

import (
	"math/rand"
	"strconv"
	"time"

	"github.com/markbates/grift/grift"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

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
	db := models.DB
	if tx := c.Get("tx"); tx != nil {
		db = tx.(*pop.Connection)
	}
	return db.Create(&admin)
})

var _ = grift.Add("db:seed:locations", func(c *grift.Context) error {
	// countries := []string{"Cameroon", "Nigeria"}
	// cities := []string{"Garoua", "Yaounde", "Douala", "Abuja", "Calabar", "Benin"}
	db := models.DB
	if tx := c.Get("tx"); tx != nil {
		db = tx.(*pop.Connection)
	}
	locations := make([]models.Location, 6)
	locations[0] = models.Location{Country: "Nigeria", City: "Calabar", Neighbourhood: "Marian"}
	locations[1] = models.Location{Country: "Nigeria", City: "Benin", Neighbourhood: "Ulegu"}
	locations[2] = models.Location{Country: "Nigeria", City: "Abuja", Neighbourhood: "Jabi"}
	locations[3] = models.Location{Country: "Cameroon", City: "Douala", Neighbourhood: "Deido"}
	locations[4] = models.Location{Country: "Cameroon", City: "Yaounde", Neighbourhood: "Mfou"}
	locations[5] = models.Location{Country: "Cameroon", City: "Garoua", Neighbourhood: "Lagdo"}
	for _, l := range locations {
		err := db.Create(&l)
		if err != nil {
			return err
		}
	}
	return nil
})

var _ = grift.Add("db:seed:merchants", func(c *grift.Context) error {
	merchant := models.Merchant{}

	var err error
	db := models.DB
	if tx := c.Get("tx"); tx != nil {
		db = tx.(*pop.Connection)
	}
	// Add DB seeding stuff here
	for i := 1; i < 3; i++ {
		merchant = models.Merchant{
			Approved:               true,
			CompanyName:            "Baze comp" + strconv.Itoa(i),
			CompanyID:              "baze" + strconv.Itoa(i),
			MerchantEmail:          "baze" + strconv.Itoa(i) + "@gmail.com",
			MerchantPasswordString: "password",
		}
		merchant.MerchantPassword, err = bcrypt.GenerateFromPassword([]byte(merchant.MerchantPasswordString), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		merchant.MerchantPasswordString = ""
		err := db.Create(&merchant)
		if err != nil {
			return err
		}
	}
	return err
})

// branches, locations, merchants, and promos...
var _ = grift.Add("db:seed:branches", func(c *grift.Context) error {
	branches := make([]models.Branch, 4)
	// Add DB seeding stuff here
	branches[0] = models.Branch{CompanyID: "blaze1", Address: "Ulegu Benin", Neighbourhood: "Ulegu", City: "Benin", Country: "Nigeria",
		Latitude:  6.264387,
		Longitude: 5.716624,
	}
	branches[1] = models.Branch{CompanyID: "blaze2", Address: "Marian Calabar", Neighbourhood: "Marian", City: "Calabar", Country: "Nigeria",
		Latitude:  4.972580,
		Longitude: 8.339740,
	}
	branches[2] = models.Branch{CompanyID: "blaze2", Address: "Jabi Abuja", Neighbourhood: "Jabi", City: "Abuja", Country: "Nigeria",
		Latitude:  9.076139,
		Longitude: 7.399947,
	}
	branches[3] = models.Branch{CompanyID: "blaze1", Address: "Deido Douala", Neighbourhood: "Deido", City: "Douala", Country: "Nigeria",
		Latitude:  4.063046,
		Longitude: 9.712326,
	}
	// 9.076139, 7.399947
	db := models.DB
	if tx := c.Get("tx"); tx != nil {
		db = tx.(*pop.Connection)
	}
	var err error
	for _, branch := range branches {
		err = db.Create(&branch)

	}
	return err
})

// RandStringBytes generates random string...(for appending to slugs)
func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

var _ = grift.Add("db:seed:promos", func(c *grift.Context) error {
	// promos := make([]models.MerchantPromo, 7)
	db := models.DB
	if tx := c.Get("tx"); tx != nil {
		db = tx.(*pop.Connection)
	}
	var err error

	items := []string{"laptop", "shirt", "bed", "house", "books", "chairs", "table"}
	promo := models.MerchantPromo{}
	for j := 1; j < 3; j++ {
		for i := 1; i < 8; i++ {
			promo = models.MerchantPromo{
				ItemName:         items[i],
				CompanyID:        "braze" + strconv.Itoa(j),
				Category:         "category",
				OldPrice:         i * 1000,
				NewPrice:         (i * 1000) / 2,
				StartDate:        time.Now(),
				EndDate:          time.Now().Local().Add(time.Hour * time.Duration(24*i)),
				Description:      "Demo Description for " + items[i],
				PromoImages:      "",
				FeaturedImage:    "",
				FeaturedImageB64: "",
				Slug:             items[i] + "_" + RandStringBytes(6),
			}
			err = db.Create(&promo)
			if err != nil {
				return err
			}
		}
	}
	return nil
})

var _ = grift.Add("db:seed", func(c *grift.Context) error {
	// return errors if any...
	return models.DB.Transaction(func(tx *pop.Connection) error {

		// remove all previously existing values...
		// err := tx.TruncateAll()
		// if err != nil {
		// 	return errors.WithStack(err)
		// }
		c.Set("tx", tx)
		err := grift.Run("db:seed:admin", c)
		if err != nil {
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:locations", c)
		if err != nil {
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:merchants", c)
		if err != nil {
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:branches", c)
		if err != nil {
			return errors.WithStack(err)
		}
		return nil

	})
})

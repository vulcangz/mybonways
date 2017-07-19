package grifts

import (
	"math/rand"
	"time"

	"log"

	"github.com/gosimple/slug"
	"github.com/markbates/grift/grift"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

var (
	cat = []string{"Electronique/Service", "Beauté/Cosmetique", "Apparels", "Furniture", "Sorties/Restaurant/Snack",
		"Bricolage/Decoration", "Cadeau", "Enfants", "Supermarché/Shopping", "Banque/Service", "Groceries",
		"Transport/Service", "Santé/Bien-être", "Location"}
	merchantIDs    = []string{"mybonways", "past3", "crunchies", "prometal"}
	merchantEmails = []string{"hello@mybonways.com", "hello@past3.com", "hello@crunchies.com", "hello@prometal.com"}
	// addresses      = []string{"", "", "", ""}
	// 4.027673, 9.743304 : Prometal
	slides = models.MerchantPromos{}
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
	db := models.DB
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	err = db.RawQuery("DELETE FROM admins").Exec()
	if err != nil {
		return err
	}
	return db.Create(&admin)
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
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	var err error
	err = db.RawQuery("DELETE FROM merchant_promos").Exec()
	if err != nil {
		return err
	}
	fileString := []string{
		"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/8a5d2656-6879-11e7-a188-78acc0541b73",    //laptop
		"https://s3-us-west-2.amazonaws.com/test-past3/featured_images/6e065d62-6a3f-11e7-bfc1-78acc0541b73", // perfume
		"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/47fcf6fa-6a3f-11e7-bfc1-78acc0541b73",    //shirt
		"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/587470b6-6a3f-11e7-bfc1-78acc0541b73",    // bed
		"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/60c1f504-6a3f-11e7-bfc1-78acc0541b73",    // house
		"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/65d77386-6a3f-11e7-bfc1-78acc0541b73",    // books
		"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/68985db3-6a3f-11e7-bfc1-78acc0541b73",    // chairs
		"https://s3-us-west-2.amazonaws.com/test-past3/featured_images/8d946a4e-6879-11e7-a188-78acc0541b73", // table
	}
	items := []string{"laptop", "Perfume", "shirt", "bed", "house", "books", "chairs", "table"}
	// cat := []string{"Computers", "Furniture", "Groceries", "Apparels"}
	promo := models.MerchantPromo{}

	for j, id := range merchantIDs {
		for i, v := range items {
			promo = models.MerchantPromo{
				ItemName:         v,
				CompanyID:        id,
				Category:         cat[i],
				OldPrice:         (i + 1) * 1000,
				NewPrice:         ((i + 1) * 1000) / 2,
				StartDate:        time.Now(),
				EndDate:          time.Now().Local().Add(time.Hour * time.Duration(24*i)),
				Description:      "Demo Description for " + v,
				PromoImages:      fileString[i],
				FeaturedImage:    fileString[i],
				FeaturedImageB64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAkQMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAACBAABAwX/xAAhEAACAgEFAQEBAQAAAAAAAAAAAQIDYQQREhMhMVFBFP/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARECEv/aAAwDAQACEQMRAD8A6mno+eHQpowTT1D9VZsyZ104N40r8N4QNYwGC6pL6sDSii+ADCnUR1YG+BXEBhR1YKdWBviC4gWFerBXUNOJXEaSjqBdXnwbcQeIyKSqwYzpH3EznACcuykSuowdmyApdX58ENcjpX4Qf68EDDdOiHiHq4+CtCHYITRpCJrFAxRohmiRNgiwAGimg2CBaFoFhMFsC0LBZbYLY02oUTcorEWqYEkGwZDLWFiFLo+Dsha0nAU2IGQMB6j+DlYnT/ByDJat4hoziaIY0RCbkDC1GCyNgtjxN6VIBsuTM5MeIvSNgblSYLZWJvQtybgbk3DE+htgtlblNhh6GQtabyYvaxHrHchRAPTlPwbgxGmXiHK5GbYzFmiZhFmiZUKtNy9zPkTkNFomwWwXICUisZ2rlIylIqUjKUhyItE2DuZuRXIaNabl7mXIvkB613KbA5FOQKiTYtazScha2RNXA7lmPIgjN0z8Q5XM5FFvz0drsM27oxmGpiUbQ+zJUTTfMpzFe1foLtKZUzKwzlYLyuMpXZGzpiVhnKwWldkyldkaKadhXYJu70ncMsOqwJTEVav0NWgqHOYLmK9oMribVRvOwVusBncKXXE2rjXsIJ9pCVY1pvHK7zi0jlbJjZ1Y6jIa1BzYh7spFPu/ID1GRJsCQ9RYblqMmUtRkUkzGbHqMNy1GTOWoyJSb/TNsNLD3+jJa1GTn7l7hox0VqAlqDnRYSYaMdDvyC9RkS3BfwWqkNWX5Fbb8mU2LWMm1cjfvyWJEFtVj//Z",
				Slug:             v + "-" + RandStringBytes(6),
			}
			if i == j {
				slides = append(slides, promo)
			}
			err = db.Create(&promo)
			if err != nil {
				log.Println("create error: ", err)
				return err
			}
		}
	}

	return nil
})

var _ = grift.Add("db:seed:slides", func(c *grift.Context) error {
	db := models.DB
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	// items := []string{"laptop", "shirt", "bed"}
	var err error
	err = db.RawQuery("DELETE FROM slides").Exec()
	if err != nil {
		return err
	}

	for _, v := range slides {
		slide := models.Slide{
			Image: v.FeaturedImage,
			// Url:   "/promos/" + v + "_" + RandStringBytes(6),
			Url: "/promo/" + v.Slug,
		}
		err = db.Create(&slide)
		if err != nil {
			log.Println("create error: ", err)
			return err
		}
	}
	return nil
})

var _ = grift.Add("db:seed:categories", func(c *grift.Context) error {
	db := models.DB
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	var err error
	err = db.RawQuery("DELETE FROM categories").Exec()
	if err != nil {
		return err
	}
	category := models.Category{}
	slug.CustomSub = map[string]string{
		"/": " ",
	}
	for _, c := range cat {
		category = models.Category{
			Name: c,
			Slug: slug.Make(c) + "-" + RandStringBytes(5),
		}
		err = db.Create(&category)
		if err != nil {
			log.Println("create error: ", err)
			return err
		}
	}
	return err
})

var _ = grift.Add("db:seed:user", func(c *grift.Context) error {
	db := models.DB
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	var err error
	err = db.RawQuery("DELETE FROM users").Exec()
	if err != nil {
		return err
	}
	users := []models.User{
		{Approved: true,
			FullName: "My Bonways",
			Email:    "hello@mybonways.com",
			Password: "password",
			Image:    "",
			Provider: "email"},
		{Approved: true,
			FullName: "John Doe",
			Email:    "john@doe.com",
			Password: "password",
			Image:    "",
			Provider: "email"},
	}
	for _, user := range users {
		user.UserPassword, err = bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Println("bcrypt error: ", err)
			return err
		}
		user.Password = ""
		err = db.Create(&user)
		if err != nil {
			log.Println("create error: ", err)
			return err
		}
	}
	return err
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
			log.Println("catch error branches: ", err)
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:promos", c)
		if err != nil {
			log.Println("catch error promos: ", err)
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:slides", c)
		if err != nil {
			log.Println("catch error slides: ", err)
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:categories", c)
		if err != nil {
			log.Println("catch error cateories: ", err)
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:user", c)
		if err != nil {
			log.Println("catch error user: ", err)
			return errors.WithStack(err)
		}
		log.Println("about to close")
		return nil

	})
})

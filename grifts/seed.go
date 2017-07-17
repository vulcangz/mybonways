package grifts

import (
	"fmt"
	"math/rand"
	"strings"
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

var _ = grift.Add("db:seed:locations", func(c *grift.Context) error {
	db := models.DB
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	err := db.RawQuery("DELETE FROM locations").Exec()
	if err != nil {
		return err
	}
	NewLocations := []models.Location{
		{Country: "Nigeria", City: "Calabar", Neighbourhood: "Marian"},
		{Country: "Nigeria", City: "Benin", Neighbourhood: "Ulegu"},
		{Country: "Nigeria", City: "Abuja", Neighbourhood: "Jabi"},
		{Country: "Nigeria", City: "Abuja", Neighbourhood: "Kubwa"},
		{Country: "Nigeria", City: "Abuja", Neighbourhood: "Asokoro"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Deido"},
		{Country: "Cameroon", City: "Yaounde", Neighbourhood: "Mfou"},
		{Country: "Cameroon", City: "Garoua", Neighbourhood: "Lagdo"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Prometal"},

		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonaberi"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonanjo"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Joss"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonapriso"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Nkondo"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "New Bell"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bali"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Nkongmondo"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Koumassi"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bali"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonadoumbe"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonadouma"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonadibong"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Akwa"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Akwa nord"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Nkololoun"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Ngangue"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonaloka"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Brazzaville"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Km5"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Yabassi"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Ngodi"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonamikengue"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Deido"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonateki"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bepanda"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Ndogbati"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bassa"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Makepe"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Ndogbong"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Zone industrielle bassa"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Nylon"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Madagascar"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonadiwoto"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Aéroport"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Tergal"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Cité des palmiers"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Beedi"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Logpom"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Kotto"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bonamossadi"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bell"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Youpwe"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Port"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Bessengue"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Ndogbassi"},
		{Country: "Cameroon", City: "Douala", Neighbourhood: "Makepe missoke"},
	}
	for _, l := range NewLocations {
		err = db.Create(&l)
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
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	err = db.RawQuery("DELETE FROM merchants").Exec()
	if err != nil {
		return err
	}
	for i := 0; i < 4; i++ {
		merchant = models.Merchant{
			Approved:               true,
			CompanyName:            strings.Title(merchantIDs[i]),
			CompanyID:              merchantIDs[i],
			MerchantEmail:          merchantEmails[i],
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
	branches := make([]models.Branch, 10)
	// Add DB seeding stuff here
	branches[0] = models.Branch{Title: "Mybonways Benin branch", CompanyID: "mybonways", Address: "Ulegu Benin",
		Neighbourhood: "Ulegu", City: "Benin", Country: "Nigeria", Latitude: 6.264387, Longitude: 5.716624}
	branches[1] = models.Branch{Title: "Past3 Calabar branch", CompanyID: "past3", Address: "Marian Calabar",
		Neighbourhood: "Marian", City: "Calabar", Country: "Nigeria", Latitude: 4.972580, Longitude: 8.339740}
	branches[2] = models.Branch{Title: "Crunchies Abuja branch", CompanyID: "crunchies", Address: "Jabi Abuja",
		Neighbourhood: "Jabi", City: "Abuja", Country: "Nigeria", Latitude: 9.076139, Longitude: 7.399947}
	branches[3] = models.Branch{Title: "Mybonways Douala branch", CompanyID: "mybonways", Address: "Deido Douala",
		Neighbourhood: "Deido", City: "Douala", Country: "Cameroon", Latitude: 4.063046, Longitude: 9.712326}
	branches[4] = models.Branch{Title: "Mybonways abuja branch", CompanyID: "mybonways", Address: "Kubwa Abuja",
		Neighbourhood: "Kubwa", City: "Abuja", Country: "Nigeria", Latitude: 9.151287, Longitude: 7.333245}
	branches[5] = models.Branch{Title: "Prometal Douala branch", CompanyID: "prometal", Address: "Prometal Douala",
		Neighbourhood: "Prometal", City: "Douala", Country: "Cameroon", Latitude: 4.027673, Longitude: 9.743304}
	branches[6] = models.Branch{Title: "Prometal Abuja branch", CompanyID: "prometal", Address: "Asokoro Abuja",
		Neighbourhood: "Asokoro", City: "Abuja", Country: "Nigeria", Latitude: 9.044077, Longitude: 7.520171}
	branches[7] = models.Branch{Title: "Mybonways Bonaberi branch", CompanyID: "mybonways", Address: "Bonaberi Douala",
		Neighbourhood: "Bonaberi", City: "Douala", Country: "Cameroon", Latitude: 4.085677, Longitude: 9.649905}
	// 4.085677, 9.649905
	db := models.DB
	if tx := c.Value("tx"); tx != nil {
		log.Println("tx not nil")
		db = tx.(*pop.Connection)
	}
	var err error
	err = db.RawQuery("DELETE FROM branches").Exec()
	if err != nil {
		return err
	}
	for _, branch := range branches {
		queryString := fmt.Sprintf(`INSERT INTO branches(
					created_at, updated_at, id, company_id, address, city, country, neighbourhood,latitude, longitude, location)
			VALUES ( current_timestamp, current_timestamp, uuid_in(md5(random()::text || clock_timestamp()::text)::cstring), ?, ?, ?, ?,
					?, ?, ?, ST_GeomFromText('POINT(%f %f)'));`, branch.Longitude, branch.Latitude)

		query := db.RawQuery(queryString, branch.CompanyID, branch.Address, branch.City, branch.Country, branch.Neighbourhood, branch.Latitude, branch.Longitude)
		err = query.Exec()
		if err != nil {
			log.Println("create errror:", err)
			return errors.WithStack(err)
		}
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
		// "https://s3-us-west-2.amazonaws.com/test-past3/promo_images/7ac809e1-5de0-11e7-877f-78acc0541b73",    // piggy bank
		// "https://s3-us-west-2.amazonaws.com/test-past3/promo_images/7cacad0a-5de0-11e7-877f-78acc0541b73",    // money
		// "https://s3-us-west-2.amazonaws.com/test-past3/promo_images/7e998b1f-5de0-11e7-877f-78acc0541b73",    // flower
		// "https://s3-us-west-2.amazonaws.com/test-past3/promo_images/80432cd9-5de0-11e7-877f-78acc0541b73",    // dog
		// "https://s3-us-west-2.amazonaws.com/test-past3/promo_images/837fc7c7-5de0-11e7-877f-78acc0541b73",    // cat
	}
	items := []string{"laptop", "Perfume", "shirt", "bed", "house", "books", "chairs", "table"}
	// cat := []string{"Computers", "Furniture", "Groceries", "Apparels"}
	promo := models.MerchantPromo{}

	for _, id := range merchantIDs {
		for i, v := range items {
			promo = models.MerchantPromo{
				ItemName:         v,
				CompanyID:        id,
				Category:         cat[i],
				OldPrice:         i * 1000,
				NewPrice:         (i * 1000) / 2,
				StartDate:        time.Now(),
				EndDate:          time.Now().Local().Add(time.Hour * time.Duration(24*i)),
				Description:      "Demo Description for " + v,
				PromoImages:      fileString[i],
				FeaturedImage:    fileString[i],
				FeaturedImageB64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAkQMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAACBAABAwX/xAAhEAACAgEFAQEBAQAAAAAAAAAAAQIDYQQREhMhMVFBFP/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARECEv/aAAwDAQACEQMRAD8A6mno+eHQpowTT1D9VZsyZ104N40r8N4QNYwGC6pL6sDSii+ADCnUR1YG+BXEBhR1YKdWBviC4gWFerBXUNOJXEaSjqBdXnwbcQeIyKSqwYzpH3EznACcuykSuowdmyApdX58ENcjpX4Qf68EDDdOiHiHq4+CtCHYITRpCJrFAxRohmiRNgiwAGimg2CBaFoFhMFsC0LBZbYLY02oUTcorEWqYEkGwZDLWFiFLo+Dsha0nAU2IGQMB6j+DlYnT/ByDJat4hoziaIY0RCbkDC1GCyNgtjxN6VIBsuTM5MeIvSNgblSYLZWJvQtybgbk3DE+htgtlblNhh6GQtabyYvaxHrHchRAPTlPwbgxGmXiHK5GbYzFmiZhFmiZUKtNy9zPkTkNFomwWwXICUisZ2rlIylIqUjKUhyItE2DuZuRXIaNabl7mXIvkB613KbA5FOQKiTYtazScha2RNXA7lmPIgjN0z8Q5XM5FFvz0drsM27oxmGpiUbQ+zJUTTfMpzFe1foLtKZUzKwzlYLyuMpXZGzpiVhnKwWldkyldkaKadhXYJu70ncMsOqwJTEVav0NWgqHOYLmK9oMribVRvOwVusBncKXXE2rjXsIJ9pCVY1pvHK7zi0jlbJjZ1Y6jIa1BzYh7spFPu/ID1GRJsCQ9RYblqMmUtRkUkzGbHqMNy1GTOWoyJSb/TNsNLD3+jJa1GTn7l7hox0VqAlqDnRYSYaMdDvyC9RkS3BfwWqkNWX5Fbb8mU2LWMm1cjfvyWJEFtVj//Z",
				Slug:             v + "_" + RandStringBytes(6),
			}
			if i < 4 {
				slides = append(slides, promo)
			}
			err = db.Create(&promo)
			if err != nil {
				log.Println("create error: ", err)
				return err
			}
		}
	}
	// for j := 1; j < 3; j++ {
	// 	for i := 1; i < 8; i++ {
	// 		fileIndex := i - 1
	// 		if i > 5 {
	// 			fileIndex = 0
	// 		}
	// 		promo = models.MerchantPromo{
	// 			ItemName:         items[i-1],
	// 			CompanyID:        "baze" + strconv.Itoa(j),
	// 			Category:         cat[j-1],
	// 			OldPrice:         i * 1000,
	// 			NewPrice:         (i * 1000) / 2,
	// 			StartDate:        time.Now(),
	// 			EndDate:          time.Now().Local().Add(time.Hour * time.Duration(24*i)),
	// 			Description:      "Demo Description for " + items[i-1],
	// 			PromoImages:      fileString[fileIndex],
	// 			FeaturedImage:    fileString[fileIndex],
	// 			FeaturedImageB64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAkQMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAACBAABAwX/xAAhEAACAgEFAQEBAQAAAAAAAAAAAQIDYQQREhMhMVFBFP/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARECEv/aAAwDAQACEQMRAD8A6mno+eHQpowTT1D9VZsyZ104N40r8N4QNYwGC6pL6sDSii+ADCnUR1YG+BXEBhR1YKdWBviC4gWFerBXUNOJXEaSjqBdXnwbcQeIyKSqwYzpH3EznACcuykSuowdmyApdX58ENcjpX4Qf68EDDdOiHiHq4+CtCHYITRpCJrFAxRohmiRNgiwAGimg2CBaFoFhMFsC0LBZbYLY02oUTcorEWqYEkGwZDLWFiFLo+Dsha0nAU2IGQMB6j+DlYnT/ByDJat4hoziaIY0RCbkDC1GCyNgtjxN6VIBsuTM5MeIvSNgblSYLZWJvQtybgbk3DE+htgtlblNhh6GQtabyYvaxHrHchRAPTlPwbgxGmXiHK5GbYzFmiZhFmiZUKtNy9zPkTkNFomwWwXICUisZ2rlIylIqUjKUhyItE2DuZuRXIaNabl7mXIvkB613KbA5FOQKiTYtazScha2RNXA7lmPIgjN0z8Q5XM5FFvz0drsM27oxmGpiUbQ+zJUTTfMpzFe1foLtKZUzKwzlYLyuMpXZGzpiVhnKwWldkyldkaKadhXYJu70ncMsOqwJTEVav0NWgqHOYLmK9oMribVRvOwVusBncKXXE2rjXsIJ9pCVY1pvHK7zi0jlbJjZ1Y6jIa1BzYh7spFPu/ID1GRJsCQ9RYblqMmUtRkUkzGbHqMNy1GTOWoyJSb/TNsNLD3+jJa1GTn7l7hox0VqAlqDnRYSYaMdDvyC9RkS3BfwWqkNWX5Fbb8mU2LWMm1cjfvyWJEFtVj//Z",
	// 			Slug:             items[i-1] + "_" + RandStringBytes(6),
	// 		}
	// 		err = db.Create(&promo)
	// 		if err != nil {
	// 			log.Println("create error: ", err)
	// 			return err
	// 		}
	// 	}
	// }
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

	// imagesURLs := []string{
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/8a5d2656-6879-11e7-a188-78acc0541b73",    //laptop
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/47fcf6fa-6a3f-11e7-bfc1-78acc0541b73",    //shirt
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/587470b6-6a3f-11e7-bfc1-78acc0541b73",    // bed
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/featured_images/6e065d62-6a3f-11e7-bfc1-78acc0541b73", // perfume
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/7ac809e1-5de0-11e7-877f-78acc0541b73",
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/7cacad0a-5de0-11e7-877f-78acc0541b73",
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/7e998b1f-5de0-11e7-877f-78acc0541b73",
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/80432cd9-5de0-11e7-877f-78acc0541b73",
	// 	"https://s3-us-west-2.amazonaws.com/test-past3/promo_images/837fc7c7-5de0-11e7-877f-78acc0541b73",
	// }
	// slide := models.Slide{}
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
			Slug: slug.Make(c) + "_" + RandStringBytes(5),
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
	user := models.User{
		Approved: true,
		FullName: "Michael Akpan",
		Email:    "mike@gmail.com",
		Password: "password",
		Image:    "",
		Provider: "email",
	}
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

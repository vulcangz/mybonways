package grifts

import (
	"fmt"
	"log"
	"strings"

	"github.com/markbates/grift/grift"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

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

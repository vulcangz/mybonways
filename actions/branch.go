package actions

import (
	"fmt"
	"log"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/satori/go.uuid"
	"github.com/tonyalaribe/mybonways/models"
)

// BranchResource allows CRUD with HTTP against the User model
type BranchResource struct {
	buffalo.BaseResource
}

// type fullBranch struct {
// 	BB []models.Branch
// 	LL []models.Location
// }

// List renders all branches
func (br *BranchResource) List(c buffalo.Context) error {
	log.Println("List()")
	// m := []models.Location{}
	b := []models.Branch{}

	tx := c.Value("tx").(*pop.Connection)
	merchant := c.Value("Merchant").(map[string]interface{})

	err := tx.Where("branches.company_id = ?", merchant["company_id"]).All(&b)
	// err = tx.Where("locations.company_id = ?", merchant["company_id"]).All(&m)
	if err != nil {
		log.Println("branch error: ", err)
		return c.Error(404, errors.WithStack(err))
	}

	return c.Render(200, render.JSON(b))
}

// Show renders a target branch
func (br *BranchResource) Show(c buffalo.Context) error {
	// TODO: GET A PARTICULAR BRANCH BY IT'S COMPANYID
	b := models.Branch{}
	tx := c.Value("tx").(*pop.Connection)

	err := tx.Where("branches.id = ?", c.Param("branch_id")).First(&b)
	if err != nil {
		log.Println("error show:", err)
		return c.Render(200, render.JSON(struct{ Err string }{"no branch"}))
	}
	return c.Render(200, render.JSON(b))
}

// Create a branch
func (br *BranchResource) Create(c buffalo.Context) error {
	b := &models.Branch{}
	err := c.Bind(b)
	if err != nil {
		return errors.WithStack(err)
	}
	log.Printf("b: %#v", b)

	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	queryString := fmt.Sprintf(`INSERT INTO public.branches(
            created_at, updated_at, id, company_id, address, city, country, neighbourhood,latitude, longitude, location)
    VALUES ( current_timestamp, current_timestamp, uuid_in(md5(random()::text || clock_timestamp()::text)::cstring), ?, ?, ?, ?,
            ?, ?, ?, ST_GeomFromText('POINT(%f %f)'));
`, b.Longitude, b.Latitude)
	query := tx.RawQuery(queryString, b.CompanyID, b.Address, b.City, b.Country, b.Neighbourhood, b.Latitude, b.Longitude)
	err = query.Exec()
	if err != nil {
		log.Println("create errror:", err)
		return errors.WithStack(err)
	}

	// log.Printf("\nBRANCH: %#v\n", b)
	// tx := c.Value("tx").(*pop.Connection)
	//
	// err = tx.Create(b)
	// if err != nil {
	// 	log.Println("create errror:", err)
	// 	return errors.WithStack(err)
	// }
	return c.Render(200, render.JSON(b))
}

// Update a target branch
func (br *BranchResource) Update(c buffalo.Context) error {
	tx := c.Value("tx").(*pop.Connection)
	branch := &models.Branch{}

	err := c.Bind(branch)
	if err != nil {
		return errors.WithStack(err)
	}

	verrs, err := branch.ValidateUpdate(tx)
	if err != nil {
		return errors.WithStack(err)
	}
	if verrs.HasAny() {
		c.Set("verrs", verrs.Errors)
		return c.Render(422, render.JSON(verrs))
	}
	log.Println()
	log.Println("branch:: ", branch)
	log.Println()

	err = tx.Update(branch)
	if err != nil {
		log.Println("update err: ", err)
		return errors.WithStack(err)
	}

	err = tx.Reload(branch)
	if err != nil {
		return errors.WithStack(err)
	}

	return c.Render(200, render.JSON(branch))
}

func (br *BranchResource) Destroy(c buffalo.Context) error {
	uid, _ := uuid.FromString(c.Param("branch_id"))
	b := &models.Branch{ID: uid}
	tx := c.Value("tx").(*pop.Connection)
	err := tx.Destroy(b)
	if err != nil {
		log.Println("err: ", err)
		return c.Render(200, render.JSON(struct{ Err string }{"Could not delete"}))
	}
	return c.Render(200, render.JSON(b))
}

// func GetLongAndLatFromArea(area string, component map[maps.Component]string) (lng float64, lat float64, err error) {

// 	APIKey := envy.Get("GEOCODE_API_KEY", "key")
// 	gmap, err := maps.NewClient(maps.WithAPIKey(APIKey))
// 	if err != nil {
// 		log.Println("gmap error: ", err)
// 		return 0, 0, err
// 	}

// 	r := &maps.GeocodingRequest{
// 		Address:    area,
// 		Components: component,
// 	}

// 	result, err := gmap.Geocode(context.Background(), r)
// 	if err != nil {
// 		log.Println("result err: ", err)
// 		return 0, 0, err
// 	}
// 	if len(result) < 1 {
// 		log.Println("No result...")
// 		return 0, 0, errors.New("No result")
// 	}
// 	lng = result[0].Geometry.Location.Lng
// 	lat = result[0].Geometry.Location.Lat
// 	return lng, lat, nil
// }

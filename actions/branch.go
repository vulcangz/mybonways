package actions

import (
	"context"
	"log"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/envy"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
	"googlemaps.github.io/maps"
)

// BranchResource allows CRUD with HTTP against the User model
type BranchResource struct {
	buffalo.BaseResource
}

// List renders all branches
func (br *BranchResource) List(c buffalo.Context) error {
	b := models.Branch{}
	tx := c.Value("tx").(*pop.Connection)
	err := tx.All(&b)
	if err != nil {
		return c.Error(404, errors.WithStack(err))
	}

	return c.Render(200, render.JSON(b))
}

// Show renders a target branch
func (br *BranchResource) Show(c buffalo.Context) error {
	// TODO: GET A PARTICULAR BRANCH BY IT'S COMPANYID
	return nil
}

// Create a branch
func (br *BranchResource) Create(c buffalo.Context) error {
	b := &models.Branch{}
	err := c.Bind(b)
	if err != nil {
		return errors.WithStack(err)
	}
	log.Printf("\nBRANCH: %#v\n", b)
	tx := c.Value("tx").(*pop.Connection)

	err = tx.Create(b)
	if err != nil {
		log.Println("create errror:", err)
		return errors.WithStack(err)
	}
	log.Println("created branch")
	// APIKey := envy.Get("GEOCODE_API_KEY", "key")
	// gmap, err := maps.NewClient(maps.WithAPIKey(APIKey))
	// if err != nil {
	// 	log.Println("gmap error: ", err)
	// }

	component := make(map[maps.Component]string)
	if b.Country != "" {
		component["country"] = b.Country
	}
	if b.Location.Area == "" {
		log.Println("no area provided")
		return c.Render(201, render.JSON(struct{ Err string }{Err: "No area provided"}))
	}
	component["locality"] = b.Location.Area
	// r := &maps.GeocodingRequest{
	// 	Address:    b.Location.Area,
	// 	Components: component,
	// }
	// log.Println("got component")

	// result, err := gmap.Geocode(context.Background(), r)
	// if err != nil {
	// 	log.Println("result err: ", err)
	// }
	l := &models.Location{}
	l = &b.Location
	l.BranchID = b.ID

	// log.Printf("\nresult geo: %#v\n", result)
	// if len(result) < 1 {
	// 	log.Println("No result...")
	// 	return c.Render(201, render.JSON(struct{ Err string }{Err: "no result"}))
	// }
	// get coordinate from the api using the area provided by the merchant
	lng, lat, err := GetLongAndLatFromArea(b.Location.Area, component)
	if err != nil {
		return c.Render(201, render.JSON(struct{ Err string }{Err: "no result"}))
	}
	log.Println("\nlocation: ", l, "\n")
	l.Longtitude = lng // longtitude
	l.Latitude = lat   // latitude

	err = tx.Create(l)
	if err != nil {
		log.Println("create location errror: ", err)
		return errors.WithStack(err)
	}

	c.Logger().Infof("Branch: %#v \n location: %#v", b, l)

	return c.Render(201, render.JSON(b))
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
	err = tx.Update(branch)
	if err != nil {
		return errors.WithStack(err)
	}

	err = tx.Reload(branch)
	if err != nil {
		return errors.WithStack(err)
	}
	component := make(map[maps.Component]string)
	l := &models.Location{}
	// update location
	if branch.Location.Area != "" {
		if branch.Country != "" {
			component["country"] = branch.Country
		}
		if branch.Location.Area == "" {
			log.Println("no area provided")
			return c.Render(201, render.JSON(struct{ Err string }{Err: "No area provided"}))
		}
		component["locality"] = branch.Location.Area
		l = &branch.Location
		// the merchant wants to update the area...
		// get the long and lat from area provided...
		l.Longtitude, l.Latitude, err = GetLongAndLatFromArea(branch.Location.Area, component)
		if err != nil {
			return errors.WithStack(err)
		}
		verrs, err := l.ValidateUpdate(tx)
		if err != nil {
			return errors.WithStack(err)
		}
		if verrs.HasAny() {
			c.Set("verrs", verrs.Errors)
			return c.Render(422, render.JSON(verrs))
		}
		err = tx.Update(l)
		if err != nil {
			return errors.WithStack(err)
		}
	}
	return c.Render(200, render.JSON(branch))
}

func GetLongAndLatFromArea(area string, component map[maps.Component]string) (lng float64, lat float64, err error) {

	APIKey := envy.Get("GEOCODE_API_KEY", "key")
	gmap, err := maps.NewClient(maps.WithAPIKey(APIKey))
	if err != nil {
		log.Println("gmap error: ", err)
		return 0, 0, err
	}

	r := &maps.GeocodingRequest{
		Address:    area,
		Components: component,
	}

	result, err := gmap.Geocode(context.Background(), r)
	if err != nil {
		log.Println("result err: ", err)
		return 0, 0, err
	}
	if len(result) < 1 {
		log.Println("No result...")
		return 0, 0, errors.New("No result")
	}
	lng = result[0].Geometry.Location.Lng
	lat = result[0].Geometry.Location.Lat
	return lng, lat, nil
}

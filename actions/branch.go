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

	tx := c.Value("tx").(*pop.Connection)

	err = tx.Create(b)
	if err != nil {
		return errors.WithStack(err)
	}
	gmap, err := maps.NewClient(maps.WithAPIKey(envy.Get("GEOCODE_API_KEY", "key")))
	if err != nil {
		log.Println("gmap error: ", err)
	}
	component := make(map[maps.Component]string)
	component["country"] = b.Country
	component["locality"] = b.Location.Area
	r := &maps.GeocodingRequest{
		Components: component,
	}

	result, err := gmap.Geocode(context.Background(), r)
	l := &models.Location{}
	l.BranchID = b.ID
	// get coordinate from the api using the area provided by the merchant
	l.Coordinate[0] = result[0].Geometry.Location.Lng // longtitude
	l.Coordinate[1] = result[0].Geometry.Location.Lat // latitude

	err = tx.Create(l)
	if err != nil {
		return errors.WithStack(err)
	}

	c.Logger().Infof("Branch: %#v \n location: %#v", b, l)

	return c.Render(201, render.JSON(b))
}

// Update a target user
// func (br *BranchResource) Update(c buffalo.Context) error {
// 	tx := c.Value("tx").(*pop.Connection)
// 	u := c.Value("user").(*models.Branch)

// 	err := c.Bind(u)
// 	if err != nil {
// 		return errors.WithStack(err)
// 	}

// 	verrs, err := u.ValidateUpdate(tx)
// 	if err != nil {
// 		return errors.WithStack(err)
// 	}
// 	if verrs.HasAny() {
// 		c.Set("verrs", verrs.Errors)
// 		return c.Render(422, render.JSON(verrs))
// 	}
// 	err = tx.Update(u)
// 	if err != nil {
// 		return errors.WithStack(err)
// 	}

// 	err = tx.Reload(u)
// 	if err != nil {
// 		return errors.WithStack(err)
// 	}
// 	return c.Render(200, render.JSON(u))
// }

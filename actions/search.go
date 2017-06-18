package actions

import (
	"log"
	"net/http"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/tonyalaribe/mybonways/models"
)

func AreaSearchHandler(c buffalo.Context) error {
	// search for a branch based on the area supplied.
	// return the branches details and its location coordinates
	area := c.Param("area")
	log.Println("\n Area: ", area)

	l := []models.Location{}

	tx := c.Value("tx").(*pop.Connection)

	err := tx.Where("locations.area LIKE ?", area).All(&l)
	if err != nil {
		log.Println("tx.All() Error: ", err)
	}
	return c.Render(http.StatusOK, render.JSON(l))
}

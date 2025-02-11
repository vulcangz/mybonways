package actions

import (
	"log"
	"net/http"

	"github.com/gobuffalo/buffalo"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
)

// This file is generated by Buffalo. It offers a basic structure for
// adding, editing and deleting a page. If your model is more
// complex or you need more than the basic implementation you need to
// edit this file.

// Following naming logic is implemented in Buffalo:
// Model: Singular (Location)
// DB Table: Plural (Locations)
// Resource: Plural (Locations)
// Path: Plural (/locations)
// View Template Folder: Plural (/templates/locations/)

// LocationsResource is the resource for the location model
type LocationsResource struct {
	buffalo.Resource
}

// List gets all Locations. This function is mapped to the the path
// GET /locations
func (v LocationsResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	locations := &models.Locations{}
	// You can order your list here. Just change
	err := tx.All(locations)
	// to:
	// err := tx.Order("(case when completed then 1 else 2 end) desc, lower([sort_parameter]) asc").All(locations)
	// Don't forget to change [sort_parameter] to the parameter of
	// your model, which should be used for sorting.
	if err != nil {
		return err
	}
	// Make locations available inside the html template
	c.Set("locations", locations)
	return c.Render(200, r.HTML("locations/index.html"))
}

// Show gets the data for one Location. This function is mapped to
// the path GET /locations/{location_id}
func (v LocationsResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Location
	location := &models.Location{}
	// To find the Location the parameter location_id is used.
	err := tx.Find(location, c.Param("location_id"))
	if err != nil {
		return err
	}
	// Make location available inside the html template
	c.Set("location", location)
	return c.Render(200, r.HTML("locations/show.html"))
}

// New renders the formular for creating a new location.
// This function is mapped to the path GET /locations/new
func (v LocationsResource) New(c buffalo.Context) error {
	// Make location available inside the html template
	c.Set("location", &models.Location{})
	return c.Render(200, r.HTML("locations/new.html"))
}

// Create adds a location to the DB. This function is mapped to the
// path POST /locations
func (v LocationsResource) Create(c buffalo.Context) error {
	log.Println("Inside create...")

	// Allocate an empty Location
	location := &models.Location{}
	// Bind location to the html form elements
	err := c.Bind(location)
	if err != nil {
		log.Println("bind error: ", err)
		return err
	}
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)

	// check if the location exists already...
	exists, err := tx.Where("neighbourhood = ? AND city = ? AND country = ?", location.Neighbourhood, location.City, location.Country).
		Exists(location)
	if exists {
		return c.Render(409, r.JSON(location))
	}

	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(location)
	if err != nil {
		return err
	}
	if verrs.HasAny() {
		// Make location available inside the html template
		c.Set("location", location)
		// Make the errors available inside the html template
		c.Set("errors", verrs)
		// Render again the new.html template that the user can
		// correct the input.
		return c.Render(422, r.HTML("locations/new.html"))
	}
	// If there are no errors set a success message
	c.Flash().Add("success", "Location was created successfully")
	// and return the location created...
	return c.Render(201, r.JSON(location))
}

// Edit renders a edit formular for a location. This function is
// mapped to the path GET /locations/{location_id}/edit
func (v LocationsResource) Edit(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Location
	location := &models.Location{}
	err := tx.Find(location, c.Param("location_id"))
	if err != nil {
		return err
	}
	// Make location available inside the html template
	c.Set("location", location)
	return c.Render(200, r.HTML("locations/edit.html"))
}

// Update changes a location in the DB. This function is mapped to
// the path PUT /locations/{location_id}
func (v LocationsResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Location
	location := &models.Location{}
	err := tx.Find(location, c.Param("location_id"))
	if err != nil {
		return err
	}
	// Bind location to the html form elements
	err = c.Bind(location)
	if err != nil {
		return err
	}
	verrs, err := tx.ValidateAndUpdate(location)
	if err != nil {
		return err
	}
	if verrs.HasAny() {
		// Make location available inside the html template
		c.Set("location", location)
		// Make the errors available inside the html template
		c.Set("errors", verrs)
		// Render again the edit.html template that the user can
		// correct the input.
		return c.Render(422, r.HTML("locations/edit.html"))
	}
	// If there are no errors set a success message
	c.Flash().Add("success", "Location was updated successfully")
	// and redirect to the locations index page
	return c.Redirect(302, "/locations/%s", location.ID)
}

// Destroy deletes a location from the DB. This function is mapped
// to the path DELETE /locations/{location_id}
func (v LocationsResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Location
	location := &models.Location{}
	// To find the Location the parameter location_id is used.
	err := tx.Find(location, c.Param("location_id"))
	if err != nil {
		return err
	}
	err = tx.Destroy(location)
	if err != nil {
		return err
	}
	// If there are no errors set a flash message
	c.Flash().Add("success", "Location was destroyed successfully")
	// Redirect to the locations index page
	return c.Redirect(302, "/locations")
}

// GetCountries retrieves all available countries...
func (v LocationsResource) GetCountries(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	locations := &models.Locations{}
	// You can order your list here. Just change

	err := tx.RawQuery("SELECT DISTINCT country FROM locations").All(locations)
	// to:
	// err := tx.Order("(case when completed then 1 else 2 end) desc, lower([sort_parameter]) asc").All(allLocations)
	// Don't forget to change [sort_parameter] to the parameter of
	// your model, which should be used for sorting.
	if err != nil {
		return c.Error(http.StatusNoContent, errors.WithStack(err))
	}
	// Make AllLocations available inside the html template
	c.Set("locations:: ", locations)
	return c.Render(201, r.JSON(locations))
}

// GetCities retrieves all cities of a country...
func (v LocationsResource) GetCities(c buffalo.Context) error {
	log.Println("c.Param('country'): ", c.Param("country"))
	country := c.Param("country")
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	locations := &models.Locations{}

	err := tx.RawQuery("SELECT DISTINCT city FROM locations WHERE country = ?", country).All(locations)
	if err != nil {
		return c.Error(http.StatusNoContent, errors.WithStack(err))
	}

	return c.Render(201, r.JSON(locations))
}

// GetNeighbourhood retrieves all neighbourhoods of a particular city in a particular Country
func (v LocationsResource) GetNeighbourhood(c buffalo.Context) error {
	log.Println("c.Param('country'): ", c.Param("country"))
	country := c.Param("country")
	city := c.Param("city")
	if city == "" || country == "" {
		return c.Error(http.StatusBadRequest, errors.WithStack(errors.New("Invalid Request")))
	}
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	locations := &models.Locations{}

	err := tx.RawQuery("SELECT neighbourhood FROM locations WHERE country = ? AND city = ?", country, city).All(locations)
	if err != nil {
		return c.Error(http.StatusNoContent, errors.WithStack(err))
	}

	return c.Render(201, r.JSON(locations))
}

func (v LocationsResource) UpdateNeighbourhood(c buffalo.Context) error {
	country := c.Param("country")
	city := c.Param("city")
	neighbourhood := c.Param("neighbourhood")
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Location
	location := &models.Location{}
	// Bind location to the html form elements
	err := c.Bind(location)
	if err != nil {
		return err
	}

	if location.Neighbourhood == "" {
		return c.Render(http.StatusBadRequest, r.JSON(location))
	}

	err = tx.RawQuery("UPDATE locations SET neighbourhood = ? WHERE country = ? AND city = ? AND neighbourhood = ?",
		location.Neighbourhood, country, city, neighbourhood).Exec()
	if err != nil {
		log.Printf("\nUPdate query error: %s\n", err.Error)
		return err
	}
	log.Printf("No update error")
	return c.Render(201, r.JSON(location))
}

func (v LocationsResource) UpdateCountry(c buffalo.Context) error {
	country := c.Param("country")
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Location
	location := &models.Location{}
	// Bind location to the html form elements
	err := c.Bind(location)
	if err != nil {
		return err
	}

	if location.Country == "" {
		return c.Render(http.StatusBadRequest, r.JSON(location))
	}

	err = tx.RawQuery("UPDATE locations SET country = ? WHERE country = ?",
		location.Country, country).Exec()
	if err != nil {
		log.Printf("\nUPdate query error: %s\n", err.Error)
		return err
	}
	log.Printf("No update error")
	return c.Render(201, r.JSON(location))
}

func (v LocationsResource) UpdateCity(c buffalo.Context) error {
	country := c.Param("country")
	city := c.Param("city")
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Location
	location := &models.Location{}
	// Bind location to the html form elements
	err := c.Bind(location)
	if err != nil {
		return err
	}

	if location.City == "" {
		return c.Render(http.StatusBadRequest, r.JSON(location))
	}

	err = tx.RawQuery("UPDATE locations SET city = ? WHERE country = ? AND city = ?",
		location.City, country, city).Exec()
	if err != nil {
		log.Printf("\nUPdate query error: %s\n", err.Error)
		return err
	}
	log.Printf("No update error")
	return c.Render(201, r.JSON(location))

}

package actions

import (
	"log"
	"net/http"

	"github.com/pkg/errors"

	"golang.org/x/crypto/bcrypt"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/tonyalaribe/mybonways/models"
)

// This file is generated by Buffalo. It offers a basic structure for
// adding, editing and deleting a page. If your model is more
// complex or you need more than the basic implementation you need to
// edit this file.

// Following naming logic is implemented in Buffalo:
// Model: Singular (Admin)
// DB Table: Plural (Admins)
// Resource: Plural (Admins)
// Path: Plural (/admins)

// AdminsResource is the resource for the admin model
type AdminsResource struct {
	buffalo.Resource
}

// THIS ROUTE SHOULD BE REMOVED, FOR SECURITY REASONS, IT LISTS ALL ADMINS TO WHOMEVER GET /admins without authentication
// List gets all Admins. This function is mapped to the the path
// GET /admins
func (v AdminsResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	admins := &models.Admins{}
	// You can order your list here. Just change
	err := tx.All(admins)
	// to:
	// err := tx.Order("(case when completed then 1 else 2 end) desc, lower([sort_parameter]) asc").All(admins)
	// Don't forget to change [sort_parameter] to the parameter of
	// your model, which should be used for sorting.
	if err != nil {
		return err
	}
	return c.Render(200, r.JSON(admins))
}

// Show gets the data for one Admin. This function is mapped to
// the path GET /admins/{admin_id}
func (v AdminsResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Admin
	admin := &models.Admin{}
	// To find the Admin the parameter admin_id is used.
	err := tx.Find(admin, c.Param("admin_id"))
	if err != nil {
		return err
	}
	return c.Render(200, r.JSON(admin))
}

// New default implementation. Returns a 404
func (v AdminsResource) New(c buffalo.Context) error {
	return c.Error(http.StatusUnauthorized, errors.New("not available"))
}

// Create adds a admin to the DB. This function is mapped to the
// path POST /admins
func (v AdminsResource) Create(c buffalo.Context) error {
	// Allocate an empty Admin
	admin := &models.Admin{}
	// Bind admin to the html form elements
	err := c.Bind(admin)
	if err != nil {
		return err
	}

	admin.Password, err = bcrypt.GenerateFromPassword([]byte(admin.PasswordString), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	admin.PasswordString = ""

	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(admin)
	if err != nil {
		return err
	}
	if verrs.HasAny() {
		// Render errors as JSON
		return c.Render(400, r.JSON(verrs))
	}
	// Success!
	return c.Render(201, r.JSON(admin))
}

// Edit default implementation. Returns a 404
func (v AdminsResource) Edit(c buffalo.Context) error {
	return c.Error(http.StatusUnauthorized, errors.New("not available"))
}

// Update changes a admin in the DB. This function is mapped to
// the path PUT /admins/{admin_id}
func (v AdminsResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Admin
	admin := &models.Admin{}
	err := tx.Find(admin, c.Param("admin_id"))
	if err != nil {
		return err
	}
	// Bind admin to the html form elements
	err = c.Bind(admin)
	if err != nil {
		return err
	}
	verrs, err := tx.ValidateAndUpdate(admin)
	if err != nil {
		return err
	}
	if verrs.HasAny() {
		// Render errors as JSON
		return c.Render(400, r.JSON(verrs))
	}
	// Success!
	return c.Render(200, r.JSON(admin))
}

// Destroy deletes a admin from the DB. This function is mapped
// to the path DELETE /admins/{admin_id}
func (v AdminsResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Admin
	admin := &models.Admin{}
	// To find the Admin the parameter admin_id is used.
	err := tx.Find(admin, c.Param("admin_id"))
	if err != nil {
		return err
	}
	err = tx.Destroy(admin)
	if err != nil {
		return err
	}
	// Success!
	return c.Render(200, r.JSON(admin))
}

func (v AdminsResource) GetAnalytics(c buffalo.Context) error {
	analytic := &models.Analytics{}
	tx := c.Value("tx").(*pop.Connection)
	// merchant := c.Value("Admin").(map[string]interface{})

	err := tx.RawQuery(`SELECT (SELECT COUNT(*) FROM reservations WHERE status != 'claimed') as unapproved_listings_count,
		(SELECT COUNT(*) FROM merchant_promos) as listings_count,
		(SELECT COUNT(*) FROM users) as users_count FROM admins;`).First(analytic)

	if err != nil {
		log.Printf("\n---Anaytics query error: %#v\n", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	log.Printf("\n---Analytics result: %#v", analytic)
	return c.Render(200, render.JSON(analytic))
}

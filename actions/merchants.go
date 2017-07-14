package actions

import (
	"log"
	"net/http"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/satori/go.uuid"
	"github.com/tonyalaribe/mybonways/models"
	"golang.org/x/crypto/bcrypt"
)

// MerchantsResource allows CRUD with HTTP against the User model
type MerchantsResource struct {
	buffalo.BaseResource
}

// List renders all users
func (mr *MerchantsResource) List(c buffalo.Context) error {
	m := models.Merchants{}
	tx := c.Value("tx").(*pop.Connection)
	err := tx.All(&m)
	if err != nil {
		log.Println("list err: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	return c.Render(200, render.JSON(m))
}

// Show renders a target user
func (mr *MerchantsResource) Show(c buffalo.Context) error {
	m := &models.Merchant{}
	tx := c.Value("tx").(*pop.Connection)
	err := tx.Find(m, c.Param("merchant_id"))
	if err != nil {
		log.Println("Show err: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	return c.Render(200, render.JSON(m))
}

// Create a user
func (mr *MerchantsResource) Create(c buffalo.Context) error {
	m := &models.Merchant{}
	err := c.Bind(m)
	if err != nil {
		return errors.WithStack(err)
	}

	tx := c.Value("tx").(*pop.Connection)

	err = tx.Where("merchant_email = ? AND company_id = ?", m.MerchantEmail, m.CompanyID).First(m)
	if err == nil {
		log.Println("Merchant exists: ", m)
		return c.Render(http.StatusBadRequest, render.JSON(struct{ Error string }{Error: "Email or Company ID already Exists"}))
	}

	m.MerchantPassword, err = bcrypt.GenerateFromPassword([]byte(m.MerchantPasswordString), bcrypt.DefaultCost)
	if err != nil {
		return errors.WithStack(err)
	}
	m.MerchantPasswordString = ""
	c.Logger().Infof("merchant: %#v \n ", m)

	err = tx.Create(m)
	if err != nil {
		return errors.WithStack(err)
	}

	v := &models.VerificationCode{}
	v.CompanyID = m.CompanyID
	v.Code = uuid.NewV1().String()
	code := "https://mybonways.com/api/merchants/verify/" + v.Code
	log.Println(code)
	mailContext := make(map[string]interface{})
	mailContext["verification_url"] = code
	mailContext["account_email"] = m.MerchantEmail
	SendMail(EMAIL_VERIFICATION, mailContext, m.MerchantEmail)

	err = tx.Create(v)
	if err != nil {
		return errors.WithStack(err)
	}

	c.Logger().Infof("merchant: %#v \n verification: %#v", m, v)

	return c.Render(201, render.JSON(m))
}

// Update a target user
func (mr *MerchantsResource) Update(c buffalo.Context) error {
	tx := c.Value("tx").(*pop.Connection)
	u := c.Value("user").(*models.Merchant)

	err := c.Bind(u)
	if err != nil {
		return errors.WithStack(err)
	}

	verrs, err := u.ValidateUpdate(tx)
	if err != nil {
		return errors.WithStack(err)
	}
	if verrs.HasAny() {
		c.Set("verrs", verrs.Errors)
		return c.Render(422, render.JSON(verrs))
	}
	err = tx.Update(u)
	if err != nil {
		return errors.WithStack(err)
	}

	err = tx.Reload(u)
	if err != nil {
		return errors.WithStack(err)
	}
	return c.Render(200, render.JSON(u))
}

func VerifyMerchant(c buffalo.Context) error {
	code := c.Param("code")
	log.Printf("code: %#v \n ", code)
	v := models.VerificationCode{}
	tx := c.Value("tx").(*pop.Connection)

	c.Set("status", "error")

	query := pop.Q(tx)
	query = tx.Where("code = ?", code)

	err := query.First(&v)
	if err != nil {
		return c.Render(200, r.HTML("verification/merchant.html"))
		// return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	log.Printf("verification: %#v \n ", v)

	query2 := pop.Q(tx)
	query2 = tx.Where("company_id = ?", v.CompanyID)

	m := models.Merchant{}
	err = query2.First(&m)
	if err != nil {
		return c.Render(200, r.HTML("verification/merchant.html"))
		// return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	m.Approved = true
	err = tx.Update(&m)
	log.Println(err)
	if err != nil {
		return c.Render(200, r.HTML("verification/merchant.html"))
		// return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	// err = tx.Reload(&m)
	// if err != nil {

	// 	return errors.WithStack(err)
	// }
	c.Set("status", "successful")
	c.Set("companyname", m.CompanyName)
	c.Set("email", m.MerchantEmail)
	return c.Render(200, r.HTML("verification/merchant.html"))
	// return c.Render(200, render.JSON(m))
}

func (mr *MerchantsResource) GetByCompanyID(c buffalo.Context) error {
	m := &models.Merchant{}
	tx := c.Value("tx").(*pop.Connection)
	err := tx.Where("company_id = ?", c.Param("company_id")).First(m)
	if err != nil {
		log.Println("Show err: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	return c.Render(200, render.JSON(m))
}

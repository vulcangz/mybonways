package actions

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	uuid "github.com/satori/go.uuid"
	"github.com/tonyalaribe/mybonways/models"
)

// PromoResource allows CRUD with HTTP against the Promo model
type PromoResource struct {
	buffalo.BaseResource
}

// Create a MerchantPromo
func (pr *PromoResource) Create(c buffalo.Context) error {
	log.Println("create promo")
	mp := &models.MerchantPromo{}
	err := c.Bind(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	PromoImages := make([]string, 10)

	log.Println("b4 mp image")
	for _, v := range mp.Images {
		imgUUID := uuid.NewV1().String()
		imagename := "promo_images/" + imgUUID
		log.Println("b64error xx")
		imagepath, err := UploadBase64Image(s3bucket, v, imagename)
		if err != nil {
			log.Println("b64error")
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}

		log.Println("no up load b64 error")
		PromoImages = append(PromoImages, imagepath)
	}

	log.Println("after mp images")
	mp.PromoImages = strings.Trim(strings.Join(strings.Fields(fmt.Sprint(PromoImages)), ", "), "[]")

	log.Printf("MerchantPromo: %#v \n ", mp)
	tx := c.Value("tx").(*pop.Connection)
	err = tx.Create(mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	return c.Render(http.StatusOK, render.JSON(mp))
}

// Update a promo
func (pr *PromoResource) Update(c buffalo.Context) error {
	mp := &models.MerchantPromo{}
	err := c.Bind(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	//
	return c.Render(http.StatusOK, render.JSON(mp))

}

// List renders all branches
func (pr *PromoResource) List(c buffalo.Context) error {
	log.Println("in list ")
	m := models.MerchantPromos{}

	tx := c.Value("tx").(*pop.Connection)
	merchant := c.Value("Merchant").(map[string]interface{})

	log.Printf(" before query %#v", merchant)

	query := pop.Q(tx)
	query = tx.Where("company_id = ?", merchant["company_id"])

	err := query.All(&m)
	if err != nil {
		log.Println("promo_resource error: ", err)
		return c.Error(404, errors.WithStack(err))
	}
	log.Println("after query")
	return c.Render(200, render.JSON(m))
}

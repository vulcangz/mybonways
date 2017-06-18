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

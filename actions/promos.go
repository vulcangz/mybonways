package actions

import (
	"log"
	"net/http"

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
	mp := &models.MerchantPromo{}
	err := c.Bind(mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	bck := GetBucket()
	PromoImages := make([]string, 10)

	for _, v := range mp.Images {
		imgUUID := uuid.NewV1().String()
		imagename := "promo_images/" + imgUUID
		imagepath, err := UploadBase64Image(bck.S3Bucket, v, imagename)
		if err != nil {
			log.Println(err)
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}

		PromoImages = append(PromoImages, imagepath)
	}
	mp.PromoImages = PromoImages

	c.Logger().Infof("MerchantPromo: %#v \n ", mp)
	tx := c.Value("tx").(*pop.Connection)

	c.Logger().Printf("bout to tx.create")
	err = tx.Create(mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	c.Logger().Printf("after tx.create")

	c.Logger().Infof("MerchantPromo: %#v", mp)

	return c.Render(http.StatusOK, render.JSON(mp))
}

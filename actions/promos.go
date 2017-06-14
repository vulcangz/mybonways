package actions

import (
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
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
		return errors.WithStack(err)
	}

	c.Logger().Infof("MerchantPromo: %#v \n ", mp)
	tx := c.Value("tx").(*pop.Connection)

	err = tx.Create(mp)
	if err != nil {
		return errors.WithStack(err)
	}

	c.Logger().Infof("MerchantPromo: %#v", mp)

	return c.Render(201, render.JSON(mp))
}

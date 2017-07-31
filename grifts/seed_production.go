package grifts

import (
	"log"

	"github.com/markbates/grift/grift"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	"github.com/tonyalaribe/mybonways/models"
)

var _ = grift.Add("db:seed:production", func(c *grift.Context) error {
	return models.DB.Transaction(func(tx *pop.Connection) error {
		c.Set("tx", tx)
		err := grift.Run("db:seed:admin", c)
		if err != nil {
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:locations:production", c)
		if err != nil {
			return errors.WithStack(err)
		}
		err = grift.Run("db:seed:categories", c)
		if err != nil {
			log.Println("catch error cateories: ", err)
			return errors.WithStack(err)
		}
		log.Println("Db seed production")
		return nil
	})
})

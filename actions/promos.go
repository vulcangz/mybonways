package actions

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/gosimple/slug"
	"github.com/markbates/pop"
	"github.com/pkg/errors"
	uuid "github.com/satori/go.uuid"
	"github.com/tonyalaribe/mybonways/models"
)

const perPage = 6

// PromoResource allows CRUD with HTTP against the Promo model
type PromoResource struct {
	buffalo.BaseResource
}

// Create a MerchantPromo
func (pr *PromoResource) Create(c buffalo.Context) error {
	log.Println("create promo")
	mp := models.MerchantPromo{}
	err := c.Bind(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	mp.Slug = slug.Make(mp.ItemName) + "-" + RandStringBytes(5)

	PromoImages := make([]string, 10)

	log.Println("b4 mp image")
	for _, v := range mp.Images {
		imgUUID := uuid.NewV1().String()
		imagename := "promo_images/" + imgUUID
		imagepath, err := UploadBase64Image(s3bucket, v, imagename)
		if err != nil {
			log.Printf("b64error err: ", err)
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}

		log.Println("no up load b64 error")
		PromoImages = append(PromoImages, imagepath)
	}

	mp.Images = []string{}

	log.Println("after mp images")
	mp.PromoImages = strings.Trim(strings.Join(strings.Fields(fmt.Sprint(PromoImages)), ", "), "[]")

	featured_imgUUID := uuid.NewV1().String()
	imagename := "featured_images/" + featured_imgUUID
	log.Println("b64error xx")
	mp.FeaturedImage, err = UploadBase64Image(s3bucket, mp.FeaturedImageB64, imagename)
	if err != nil {
		log.Println("b64error")
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	mp.FeaturedImageB64, err = CompressAndBlurImageAndReturnBase64(mp.FeaturedImageB64)
	if err != nil {
		log.Println("compress error: ", err)
	}
	log.Printf("MerchantPromo: %#v \n ", mp)

	tx := c.Value("tx").(*pop.Connection)
	err = tx.Create(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	tx.Reload(&mp)
	log.Println(mp)
	return c.Render(http.StatusOK, render.JSON(mp))
}

// Show gets the data for one Promo. This function is mapped to
// the path GET /merchants/promos/{slug}
func (v *PromoResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Category
	merchantPromo := models.MerchantPromo{}

	query := pop.Q(tx)
	query = tx.Where("slug = ?", c.Param("promo_id"))

	err := query.First(&merchantPromo)
	if err != nil {
		return c.Error(404, errors.WithStack(err))
	}

	return c.Render(200, r.JSON(merchantPromo))
}

// Update a promo
func (pr *PromoResource) Update(c buffalo.Context) error {
	mp := &models.MerchantPromo{}
	err := c.Bind(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	tx := c.Value("tx").(*pop.Connection)
	// send the featured image to s3 bucket
	// But first of all check if the featured image name is in the db
	promo := &models.MerchantPromo{}
	err = tx.Where("id = ?", mp.ID).First(promo)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	if mp.FeaturedImage != promo.FeaturedImage {
		// push the image to s3 bucket...
		imgUUID := uuid.NewV1().String()
		imagename := "promo_images/" + imgUUID
		log.Println("b64error xx")
		imagepath, err := UploadBase64Image(s3bucket, mp.FeaturedImage, imagename)
		if err != nil {
			log.Println("b64error")
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}
		// create a blurred image of the featured image to save in the db...
		log.Println(mp.FeaturedImage)
		B64, err := CompressAndBlurImageAndReturnBase64(mp.FeaturedImage)
		if err != nil {
			log.Println("compress error", err)
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}
		log.Println(string(B64))
		mp.FeaturedImageB64 = string(B64)
		mp.FeaturedImage = imagepath
	}

	log.Println("no up load b64 error")

	err = tx.Update(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	// just to be sure
	err = tx.Reload(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	// successful update
	return c.Render(http.StatusOK, render.JSON(mp))

}

// List renders all Promos
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

// List renders all Promos
func (pr *PromoResource) Search(c buffalo.Context) error {
	// m := models.MerchantPromos{}
	// x := make(map[string]interface{})
	// m := []struct{
	//
	// }
	page, err := strconv.Atoi(c.Param("p"))
	if err != nil || page < 1 {
		page = 1
	}

	m := []models.MerchantPromoSearchResult{}

	tx := c.Value("tx").(*pop.Connection)

	searchTerms := c.Request().URL.Query().Get("q")
	searchLatitude := c.Request().URL.Query().Get("lat")
	searchLongitude := c.Request().URL.Query().Get("lng")
	var queryString string
	var query *pop.Query
	if searchTerms == "*" {
		queryString = `
			SELECT created_at, updated_at,company_id, item_name,  category, old_price, new_price, start_Date, end_date, description, promo_images, featured_image, featured_image_b64, slug,neighbourhood,city,country,longitude,latitude FROM merchant_promos x
				LEFT OUTER JOIN (
					SELECT company_id as cid,neighbourhood,city,country,longitude,latitude
					FROM branches
					WHERE ST_Distance_Sphere(location, ST_MakePoint(?,?)) <= 10 * 1609.34
					GROUP BY company_id,neighbourhood,city,country,longitude,latitude
				) y
				ON x.company_id = y.cid ORDER BY x.created_at desc LIMIT ? OFFSET ?;
			`
		query = tx.RawQuery(queryString, searchLongitude, searchLatitude, perPage, (page-1)*perPage)
	} else {
		queryString = `
		SELECT created_at, updated_at,company_id, item_name,  category, old_price, new_price, start_Date, end_date, description, promo_images, featured_image, featured_image_b64, slug,neighbourhood,city,country,longitude,latitude FROM merchant_promos x
			LEFT OUTER JOIN (
				SELECT company_id as cid,neighbourhood,city,country,longitude,latitude
				FROM branches
				WHERE ST_Distance_Sphere(location, ST_MakePoint(?,?)) <= 10 * 1609.34
				GROUP BY company_id,neighbourhood,city,country,longitude,latitude
			) y
			ON x.company_id = y.cid WHERE x.weighted_tsv @@ to_tsquery(?) ORDER BY x.created_at desc LIMIT ? OFFSET ?;
		`
		query = tx.RawQuery(queryString, searchLongitude, searchLatitude, searchTerms, perPage, (page-1)*perPage)
	}
	// ORDER BY created_at desc LIMIT 2 OFFSET 2

	// sql, x := query.ToSQL(model)
	// log.Println(sql)
	// log.Printf("%#v", x)
	err = query.All(&m)
	if err != nil {
		log.Println("promo_resource error: ", err)
		return c.Error(404, errors.WithStack(err))
	}
	log.Println("after query")
	log.Println("MerchantPromoSearchResult:: ", m)
	return c.Render(200, render.JSON(m))
}

// TODO PREVENT EXPIRED PROMOS FROM BEING LISTED...

func (pr *PromoResource) ListFeaturedPromos(c buffalo.Context) error {
	log.Println("IN list featured promos")
	m := []models.MerchantPromo{}

	tx := c.Value("tx").(*pop.Connection)

	query := tx.Order("created_at desc").Limit(perPage)

	err := query.All(&m)
	if err != nil {
		log.Println("feature promo error: ", err)
		return c.Error(404, errors.WithStack(err))
	}
	log.Println("after query")
	return c.Render(200, render.JSON(m))
}

func (pr *PromoResource) ListFeaturedPromosPage(c buffalo.Context) error {
	log.Println("IN list Page featured promos")
	m := models.MerchantPromos{}

	tx := c.Value("tx").(*pop.Connection)

	query := pop.Q(tx)
	page, err := strconv.Atoi(c.Param("page"))
	if err != nil {
		log.Println("incorrect params")
		return c.Error(404, errors.WithStack(err))
	}
	query = tx.Order("created_at desc").Paginate(page, perPage)

	err = query.All(&m)
	if err != nil {
		log.Println("feature promo error: ", err)
		return c.Error(404, errors.WithStack(err))
	}
	log.Println("after query")
	return c.Render(200, render.JSON(m))
}

func (v *PromoResource) GetPromoBySlug(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty MerchantPromo
	merchantPromo := models.MerchantPromo{}

	query := pop.Q(tx)
	query = tx.Where("slug = ?", c.Param("slug"))

	err := query.First(&merchantPromo)
	if err != nil {
		return c.Error(404, errors.WithStack(err))
	}

	return c.Render(200, r.JSON(merchantPromo))
}

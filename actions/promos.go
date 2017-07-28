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

const perPage = 16
const categoryPerPage = 16

// PromoResource allows CRUD with HTTP against the Promo model
type PromoResource struct {
	buffalo.BaseResource
}

// Create a MerchantPromo
func (pr *PromoResource) Create(c buffalo.Context) error {
	mp := models.MerchantPromo{}
	err := c.Bind(&mp)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	mp.Slug = slug.Make(mp.ItemName) + "-" + RandStringBytes(5)
	log.Println("PROMO: ", mp)
	PromoImages := make([]string, 10)

	for _, v := range mp.Images {
		imgUUID := uuid.NewV1().String()
		imagename := "promo_images/" + imgUUID
		imagepath, err := UploadBase64Image(s3bucket, v, imagename)
		if err != nil {
			log.Printf("b64error err: ", err)
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}

		PromoImages = append(PromoImages, imagepath)
	}

	mp.Images = []string{}

	mp.PromoImages = strings.Trim(strings.Join(strings.Fields(fmt.Sprint(PromoImages)), ", "), "[]")

	featured_imgUUID := uuid.NewV1().String()
	imagename := "featured_images/" + featured_imgUUID
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
	err = tx.Create(&mp, "comment", "favourite")
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	tx.RawQuery(`
	SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos WHERE id = ?`, mp.ID).First(&mp)
	return c.Render(http.StatusOK, render.JSON(mp))
}

// Show gets the data for one Promo. This function is mapped to
// the path GET /merchants/promos/{slug}
func (v *PromoResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty Category
	merchantPromo := models.MerchantPromo{}

	query := tx.RawQuery(`
	SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos WHERE slug = ?`, c.Param("promo_id")) // alias for slug since we are using resource

	err := query.First(&merchantPromo)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	return c.Render(200, r.JSON(merchantPromo))
}

// Update a promo
func (pr *PromoResource) Update(c buffalo.Context) error {
	mp := &models.MerchantPromo{}
	err := c.Bind(mp)
	if err != nil {
		log.Printf("Cannot get the promo: %#v", err)
		return c.Error(http.StatusBadRequest, errors.WithStack(err))
	}

	tx := c.Value("tx").(*pop.Connection)
	// send the featured image to s3 bucket
	// But first of all check if the featured image name is in the db
	promo := &models.MerchantPromo{}
	err = tx.RawQuery(`
	SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos WHERE id = ?`, mp.ID).First(promo)
	if err != nil {
		log.Printf("Cannot find the promo: %#v", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	if mp.FeaturedImage != promo.FeaturedImage {
		// push the image to s3 bucket...
		imgUUID := uuid.NewV1().String()
		imagename := "promo_images/" + imgUUID
		imagepath, err := UploadBase64Image(s3bucket, mp.FeaturedImage, imagename)
		if err != nil {
			log.Println("b64error")
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}
		// create a blurred image of the featured image to save in the db...
		B64, err := CompressAndBlurImageAndReturnBase64(mp.FeaturedImage)
		if err != nil {
			log.Println("compress error", err)
			return c.Error(http.StatusInternalServerError, errors.WithStack(err))
		}
		mp.FeaturedImageB64 = string(B64)
		mp.FeaturedImage = imagepath
	}

	log.Println("no up load b64 error")

	err = tx.Update(mp, "comment", "favourite")
	if err != nil {
		log.Printf("Cannot update the promo: %#v", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	// just to be sure
	err = tx.RawQuery(`
	SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos WHERE id = ?`, mp.ID).First(mp)
	if err != nil {
		log.Printf("Cannot reload the promo: %#v", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	// successful update
	return c.Render(http.StatusOK, render.JSON(mp))

}

// List renders all Promos
func (pr *PromoResource) List(c buffalo.Context) error {
	m := models.MerchantPromos{}

	tx := c.Value("tx").(*pop.Connection)
	merchant := c.Value("Merchant").(map[string]interface{})

	query := tx.RawQuery(`SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos WHERE company_id = ?`, merchant["company_id"])

	err := query.All(&m)
	if err != nil {
		log.Println("promo_resource error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	return c.Render(200, render.JSON(m))
}

func (pr *PromoResource) ListAll(c buffalo.Context) error {
	m := models.MerchantPromos{}

	tx := c.Value("tx").(*pop.Connection)

	err := tx.RawQuery(`
		SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos
	`).All(&m)
	if err != nil {
		log.Println("promo_resource error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	return c.Render(200, render.JSON(m))
}

// List renders all Promos
func (pr *PromoResource) Search(c buffalo.Context) error {
	page, err := strconv.Atoi(c.Param("p"))
	if err != nil || page < 1 {
		page = 1
	}

	m := []models.MerchantPromoSearchResult{}

	tx := c.Value("tx").(*pop.Connection)

	searchTerms := c.Request().URL.Query().Get("q")
	searchLatitude := c.Request().URL.Query().Get("lat")
	searchLongitude := c.Request().URL.Query().Get("lng")
	category := c.Request().URL.Query().Get("cat")

	var queryString string
	var query *pop.Query
	if searchTerms == "*" {
		queryString = `SELECT id, created_at, updated_at, company_id, item_name, category, old_price, new_price,
			start_date, end_date, description, promo_images, featured_image, featured_image_b64,
			slug, COALESCE(SUM(comment), 0) as comment, COALESCE(SUM(favourite), 0) as favourite,
			neighbourhood, city, country, longitude, latitude FROM merchant_promos x
			LEFT JOIN (SELECT promo_id, COUNT(*) AS comment FROM comments GROUP BY promo_id)c ON x.id = c.promo_id
			LEFT JOIN (SELECT promo_id, COUNT(*) AS favourite FROM favourites GROUP BY promo_id)f ON x.id = f.promo_id
				RIGHT OUTER JOIN (
					SELECT company_id as cid,neighbourhood,city,country,longitude,latitude
					FROM branches
					WHERE ST_Distance_Sphere(location, ST_MakePoint(?,?)) <= 10000 * 1609.34
					ORDER BY ST_Distance_Sphere(location,ST_MakePoint(?,?))
				) y
				ON x.company_id = y.cid WHERE x.id IS NOT NULL
				GROUP BY x.id,neighbourhood, city, country, longitude, latitude
				ORDER BY x.created_at desc;`
		query = tx.RawQuery(queryString, searchLongitude, searchLatitude, searchLongitude, searchLatitude)
	} else if category != "" && searchLatitude == "" {
		queryString = `
		SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, COALESCE(SUM(comment), 0) as comment,
		 COALESCE(SUM(favourite), 0) as favourite, neighbourhood, city, country, longitude, latitude FROM merchant_promos x
		  LEFT JOIN (SELECT promo_id, COUNT(*) AS comment FROM comments GROUP BY promo_id)c ON x.id = c.promo_id
			LEFT JOIN (SELECT promo_id, COUNT(*) AS favourite FROM favourites GROUP BY promo_id)f ON x.id = f.promo_id
			RIGHT OUTER JOIN (
				SELECT company_id as cid,neighbourhood,city,country,longitude,latitude
				FROM branches
				GROUP BY company_id,neighbourhood,city,country,longitude,latitude
			) y
			ON x.company_id = y.cid WHERE x.category=?
			GROUP BY x.id,neighbourhood,city,country,longitude,latitude
			ORDER BY x.created_at desc LIMIT ? OFFSET ?;
		`
		query = tx.RawQuery(queryString, category, categoryPerPage, (page-1)*perPage)
	} else if category != "" {
		queryString = `
		SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, COALESCE(SUM(comment), 0) as comment,
		 COALESCE(SUM(favourite), 0) as favourite, neighbourhood,
		city, country, longitude, latitude FROM merchant_promos x
		LEFT JOIN (SELECT promo_id, COUNT(*) AS comment FROM comments GROUP BY promo_id)c ON x.id = c.promo_id
		LEFT JOIN (SELECT promo_id, COUNT(*) AS favourite FROM favourites GROUP BY promo_id)f ON x.id = f.promo_id
			RIGHT OUTER JOIN (
				SELECT company_id as cid,neighbourhood,city,country,longitude,latitude
				FROM branches
				WHERE ST_Distance_Sphere(location, ST_MakePoint(?,?)) <= 10000 * 1609.34
				ORDER BY ST_Distance_Sphere(location,ST_MakePoint(?,?))
			) y
			ON x.company_id = y.cid WHERE x.category=?
			ORDER BY x.created_at desc LIMIT ? OFFSET ?;
		`
		query = tx.RawQuery(queryString, searchLongitude, searchLatitude, searchLongitude, searchLatitude, category, categoryPerPage, (page-1)*perPage)
	} else {
		queryString = `
		SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, COALESCE(SUM(comment), 0) as comment,
		 COALESCE(SUM(favourite), 0) as favourite, neighbourhood,
		city, country, longitude, latitude FROM merchant_promos x
		LEFT JOIN (SELECT promo_id, COUNT(*) AS comment FROM comments GROUP BY promo_id)c ON x.id = c.promo_id
		LEFT JOIN (SELECT promo_id, COUNT(*) AS favourite FROM favourites GROUP BY promo_id)f ON x.id = f.promo_id
			RIGHT OUTER JOIN (
				SELECT company_id as cid,neighbourhood,city,country,longitude,latitude
				FROM branches
				WHERE ST_Distance_Sphere(location, ST_MakePoint(?,?)) <= 1000 * 1609.34
				GROUP BY cid,neighbourhood,city,country,longitude,latitude,location
				ORDER BY ST_Distance_Sphere(location,ST_MakePoint(?,?))
			) y
			ON x.company_id = y.cid WHERE x.weighted_tsv @@ to_tsquery(?)
			GROUP BY x.id,neighbourhood, city, country, longitude, latitude
			ORDER BY x.created_at desc LIMIT ? OFFSET ?;`
		query = tx.RawQuery(queryString, searchLongitude, searchLatitude, searchLongitude, searchLatitude, searchTerms, perPage, (page-1)*perPage)
	}
	// ORDER BY created_at desc LIMIT 2 OFFSET 2

	// sql, x := query.ToSQL(model)
	// log.Println(sql)
	// log.Printf("%#v", x)
	err = query.All(&m)
	if err != nil {
		log.Println("promo_resource error: ", err.Error())
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	// for i := range m {
	// 	err = tx.RawQuery(`SELECT (SELECT COUNT(*) FROM comments WHERE promo_id = ?) AS comment,
	// 		(SELECT COUNT(*) FROM favourites WHERE promo_id = ? ) AS favourite;`, m[i].ID, m[i].ID).First(&m[i].Count)
	// 	if err != nil {
	// 		log.Println("Count Error: ", err)
	// 	}
	// }
	// log.Println("after query")
	// log.Println("MerchantPromoSearchResult:: ", m)
	return c.Render(200, render.JSON(m))
}

// TODO PREVENT EXPIRED PROMOS FROM BEING LISTED...

func (pr *PromoResource) ListFeaturedPromos(c buffalo.Context) error {
	m := []models.MerchantPromo{}

	tx := c.Value("tx").(*pop.Connection)

	query := tx.RawQuery(`SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity, COALESCE(SUM(comment), 0) as comment,
		 COALESCE(SUM(favourite), 0) as favourite FROM merchant_promos
			LEFT JOIN (SELECT promo_id, COUNT(*) AS comment FROM comments GROUP BY promo_id)c ON merchant_promos.id = c.promo_id
			LEFT JOIN (SELECT promo_id, COUNT(*) AS favourite FROM favourites GROUP BY promo_id)f ON merchant_promos.id = f.promo_id
				GROUP BY merchant_promos.id ORDER BY merchant_promos.created_at DESC LIMIT ?`, perPage)

	err := query.All(&m)
	if err != nil {
		log.Println("feature promo error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	// for i := range m {
	// 	err = tx.RawQuery(`SELECT (SELECT COUNT(*) FROM comments WHERE promo_id = ?) AS comment,
	// 		(SELECT COUNT(*) FROM favourites WHERE promo_id = ? ) AS favourite;`, m[i].ID, m[i].ID).First(&m[i].Count)
	// }
	return c.Render(200, render.JSON(m))
}

func (pr *PromoResource) ListFeaturedPromosPage(c buffalo.Context) error {
	m := models.MerchantPromos{}

	tx := c.Value("tx").(*pop.Connection)

	query := pop.Q(tx)
	page, err := strconv.Atoi(c.Param("page"))
	if err != nil {
		log.Println("incorrect params")
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}
	if page < 1 {
		page = 1
	}
	query = tx.RawQuery(`SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity, COALESCE(SUM(comment), 0) as comment,
		 COALESCE(SUM(favourite), 0) as favourite FROM merchant_promos
			LEFT JOIN (SELECT promo_id, COUNT(*) AS comment FROM comments GROUP BY promo_id)c ON merchant_promos.id = c.promo_id
			LEFT JOIN (SELECT promo_id, COUNT(*) AS favourite FROM favourites GROUP BY promo_id)f ON merchant_promos.id = f.promo_id
				GROUP BY merchant_promos.id ORDER BY merchant_promos.created_at DESC LIMIT ? OFFSET ?`, perPage, (page-1)*perPage)
	// query = tx.Order("created_at desc").Paginate(page, perPage)

	err = query.All(&m)
	if err != nil {
		log.Println("feature promo error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	// for i := range m {
	// 	err = tx.RawQuery(`SELECT (SELECT COUNT(*) FROM comments WHERE promo_id = ?) AS comment,
	// 		(SELECT COUNT(*) FROM favourites WHERE promo_id = ? ) AS favourite;`, m[i].ID, m[i].ID).First(&m[i].Count)
	// }
	return c.Render(200, render.JSON(m))
}

func (v *PromoResource) GetPromoBySlug(c buffalo.Context) error {
	// Get the DB connection from the context
	tx := c.Value("tx").(*pop.Connection)
	// Allocate an empty MerchantPromo
	merchantPromo := models.MerchantPromo{}

	query := pop.Q(tx)
	query = tx.RawQuery(`SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos WHERE slug = ?`, c.Param("slug"))
	//.Where("slug = ?", c.Param("slug"))

	err := query.First(&merchantPromo)
	if err != nil {
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	return c.Render(200, r.JSON(merchantPromo))
}

func (v *PromoResource) GetMerchantPromos(c buffalo.Context) error {
	m := models.MerchantPromos{}

	tx := c.Value("tx").(*pop.Connection)
	companyID := c.Param("company_id")

	query := pop.Q(tx)
	query = tx.RawQuery(`SELECT id, created_at, updated_at,company_id, item_name, category, old_price, new_price, start_date,
		end_date, description, promo_images, featured_image, featured_image_b64, slug, quantity,
		 0 as comment, 0 as favourite FROM merchant_promos WHERE company_id = ?`, companyID)

	err := query.All(&m)
	if err != nil {
		log.Println("promo_resource error: ", err)
		return c.Error(http.StatusInternalServerError, errors.WithStack(err))
	}

	return c.Render(200, render.JSON(m))
}

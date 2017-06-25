package actions

import (
	"log"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/middleware"
	"github.com/gobuffalo/buffalo/middleware/i18n"

	"github.com/tonyalaribe/mybonways/models"

	"github.com/gobuffalo/envy"
	"github.com/gobuffalo/packr"
)

// ENV is used to help switch settings based on where the
// application is being run. Default is "development".
var ENV = envy.Get("GO_ENV", "development")
var app *buffalo.App
var T *i18n.Translator

// App is where all routes and middleware for buffalo
// should be defined. This is the nerve center of your
// application.
func App() *buffalo.App {
	if app == nil {
		app = buffalo.Automatic(buffalo.Options{
			Env:         ENV,
			SessionName: "_mybonways_session",
		})
		if ENV == "development" {
			app.Use(middleware.ParameterLogger)
		}

		// Protect against CSRF attacks. https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
		// Remove to disable this.
		app.Use(middleware.CSRF)

		app.Use(middleware.PopTransaction(models.DB))

		// Setup and use translations:
		var err error
		T, err = i18n.New(packr.NewBox("../locales"), "en-US")
		if err != nil {
			log.Fatal(err)
		}
		app.Use(T.Middleware())

		app.GET("/", HomeHandler)
		app.GET("/admin/{rest:.*}", AdminHandler)
		app.GET("/merchants/{rest:.*}", MerchantHandler)

		app.ServeFiles("/assets", packr.NewBox("../public/assets"))

		promoResource := &PromoResource{}
		merchantsResource := &MerchantsResource{}
		locationsResource := LocationsResource{&buffalo.BaseResource{}}

		// if this is merchants the middleware does not work, so i changed it to merchant
		merchantGroup := app.Group("/api/merchants")
		merchantGroup.Use(MerchantLoginCheckMiddleware)

		adminGroup := app.Group("/api/admins")
		adminGroup.Use(AdminLoginCheckMiddleware)

		app.GET("/api/merchants/verify/{code}", VerifyMerchant)

		app.POST("/api/merchants/login", MerchantLogin)
		app.POST("/api/admin/login", AdminLogin)

		app.GET("/api/featuredpromos", promoResource.ListFeaturedPromos)

		app.GET("/api/promo/search", promoResource.Search)

		app.GET("/api/promo/{slug}", promoResource.GetPromoBySlug)
		app.GET("/api/merchant/{company_id}", merchantsResource.GetByCompanyID)

		merchantGroup.Resource("/branch", &BranchResource{})
		merchantGroup.Resource("/promo", promoResource)

		app.Resource("/api/merchants", merchantsResource)

		app.Resource("/api/categories", CategoriesResource{&buffalo.BaseResource{}})

		// This handles adding a location by the admin...
		adminGroup.Resource("/locations/neighbourhood", locationsResource)

		// these handle queries for all locations (country, city and neighbourhood)
		// gets list of countries...
		app.GET("/api/locations/countries", locationsResource.GetCountries)
		// gets list of cities of a particular country: /api/cities?country=country_name
		app.GET("/api/locations/cities", locationsResource.GetCities)
		// gets list of neighbourhoods of a particular city in a country: /api/cities?country=country_name&city=city_name
		app.GET("/api/locations/neighbourhood", locationsResource.GetNeighbourhood)

		adminGroup.Resource("/merchants", merchantsResource)

		admin := app.Group("/admins")
		admin.Use(AdminLoginCheckMiddleware)
		admin.Resource("/", AdminsResource{&buffalo.BaseResource{}})

		app.ErrorHandlers[404] = func(status int, err error, c buffalo.Context) error {
			c.Render(200, spa.HTML("index.html"))
			return nil
		}

	}

	return app
}

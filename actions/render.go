package actions

import (
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/packr"
)

var (
	r          *render.Engine
	spa        *render.Engine
	encryption packr.Box
)

func init() {
	encryption = packr.NewBox("../encryption")

	r = render.New(render.Options{
		// HTML layout to be used for all HTML requests:
		HTMLLayout: "application.html",

		// Box containing all of the templates:
		TemplatesBox: packr.NewBox("../templates"),

		// Add template helpers here:
		Helpers: render.Helpers{},
	})

	spa = render.New(render.Options{
		// HTML layout to be used for all HTML requests:

		// Box containing all of the templates:
		TemplatesBox: packr.NewBox("../public"),

		// Add template helpers here:
		Helpers: render.Helpers{},
	})
}

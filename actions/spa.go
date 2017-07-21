package actions

import (
	"net/http"

	"github.com/gobuffalo/buffalo"
)

// HomeHandler is a default handler to serve up
// a home page.
func HomeHandler(c buffalo.Context) error {
	pusher, ok := c.Response().(http.Pusher)
	if ok {
		pusher.Push("/assets/js/index-bundle.js", nil)
		pusher.Push("/assets/css/main.min.css", nil)
	}
	return c.Render(200, spa.HTML("index.html"))
}

func AdminHandler(c buffalo.Context) error {
	pusher, ok := c.Response().(http.Pusher)
	if ok {
		pusher.Push("/assets/js/admin-bundle.js", nil)
		pusher.Push("/assets/css/main.min.css", nil)
	}
	return c.Render(200, spa.HTML("admin.html"))
}

func MerchantHandler(c buffalo.Context) error {
	pusher, ok := c.Response().(http.Pusher)
	if ok {
		pusher.Push("/assets/js/merchant-bundle.js", nil)
		pusher.Push("/assets/css/main.min.css", nil)
	}
	return c.Render(200, spa.HTML("merchant.html"))
}

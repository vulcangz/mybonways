import m from "mithril";

export var Promos = {
	itemID: {},
	AllPromos: [],
	NewPromo: {},
	CurrentPromo: { promo_images: "" },
	Categories: [],
	GetAllPromos: function() {
		return m
			.request({
				method: "GET",
				url: "/api/merchants/promo"
			})
			.then(function(response) {
				console.log("get promo Response: ", response);
				Promos.AllPromos = response;
				m.redraw();
				// if successful, add the new promo to the promo list
			});
	},
	GetPromo: function(slug) {
		return m
			.request({
				method: "GET",
				url: "/api/merchants/promo/" + slug
			})
			.then(function(response) {
				console.log("get promo Response: ", response);
				Promos.CurrentPromo = response;
				m.redraw();
			});
	},
	SaveNew: function() {
		// TODO:: Save a new promo.
		return m
			.request({
				method: "POST",
				url: "/api/merchants/promo",
				data: Promos.NewPromo
			})
			.then(function(response) {
				console.log("New promo Response: ", response);
				m.route.set("/promos/view/" + response.slug);
			});
	},
	Update: function(promo) {
		console.log("Updated promo: ", promo);
		return m
			.request({
				method: "PUT",
				url: "/api/merchants/promo/" + promo.id,
				data: promo
			})
			.then(function(response) {
				console.log(response);
			});
	},
	GetCategories: function() {
		return m
			.request({
				method: "GET",
				url: "/api/categories"
			})
			.then(function(response) {
				console.log("all cat. response: ", response);
				Promos.Categories = response;
			})
			.catch(function(error) {
				console.error(error);
			});
	}
};

import m from "mithril";
import { UserModel } from "./user.js";

export var Promos = {
	FeaturedPromos: [],
	PromoBranches: [],
	MerchantPromos: [],
	Promo: { promo_images: "", reservation: {}, favourite: {} },
	CategoriesAndPromos:[],
	PromoMerchant: {},
	Page: 1,
	GetCategoriesAndPromos:function(){
			return m
				.request({
					method: "GET",
					url: "/api/categories_with_promos"
				})
				.then(response => {
					console.log("categories and promos:", response);
					Promos.CategoriesAndPromos = response;
				})
				.catch(error => {
					console.error("featured promos error: ", error);
				});
	},
	GetFeaturedPromos: function(){
		return m
			.request({
				method: "GET",
				url: "/api/featuredpromos"
			})
			.then(response => {
				console.log("featured promos response:", response);
				Promos.FeaturedPromos = response;
				// Promos.GetBranches();
			})
			.catch(error => {
				console.error("featured promos error: ", error);
			});
	},
	LoadMore: function(){
		return m
			.request({
				method: "GET",
				url: "/api/featuredpromos/" + ++Promos.Page
			})
			.then(response => {
				console.log("more promos: ", response);
				if (response.length > 0) {
					Promos.FeaturedPromos.push.apply(Promos.FeaturedPromos, response);
					// Promos.FeaturedPromos = Promos.FeaturedPromos.concat(response);
				}
			})
			.catch(error => {
				console.error("more promos Error: ", error);
			});
	},
	GetPromo: function(slug){
		return m
			.request({
				method: "GET",
				url: "/api/promo/" + slug
			})
			.then(response => {
				console.log("Promo details response: ", response);
				Promos.GetPromoMerchant(response.company_id);
				Promos.Promo = response;
				// if user is logged in check if he has reserved this promo.
				UserModel.GetUserfromStorage()
					.then(() => {
						UserModel.isReserved(Promos.Promo.id).then(response => {
							Promos.Promo.reservation = response;
						}).catch(function(){
							console.error("Not Reserved");
						})
						Promos.isFavourite();
					})
					.catch(error => {
						console.error(error);
					});
				m.redraw();
				Promos.GetPromoMerchant(response.company_id);
				Promos.GetBranches();
			})
			.catch(error => {
				console.error("promos details error: ", error);
			});
	},
	GetPromoMerchant: function(company_id) {
		return m
			.request({
				method: "GET",
				url: "/api/merchant/" + company_id
			})
			.then(response => {
				console.log("Promo merchant response: ", response);
				Promos.PromoMerchant = response;
			})
			.catch(error => {
				console.error("Promos merchant error: ", error);
			});
	},
	GetMerchantPromos: function(company_id){
		console.log("comapny id ::: ", company_id);
		return m
			.request({
				method: "GET",
				url: "/api/promos/" + company_id
			})
			.then(response => {
				console.log("Merchant Promos response: ", response);
				Promos.MerchantPromos = response;
			})
			.catch(error => {
				console.error("Merchant Promos error: ", error);
			});
	},
	GetBranches: function(){
		return m
			.request({
				method: "GET",
				url: "/api/promo/branches/" + Promos.Promo.company_id
			})
			.then(response => {
				console.log("Promo branches response: ", response);
				Promos.PromoBranches = response;
			});
	},
	Reserve: function(id){
		console.log("Reserve this promo. UserID: ", id);
		return m
			.request({
				method: "POST",
				url: "/api/reservations",
				data: {
					user_id: id,
					promo_id: Promos.Promo.id,
					promo_slug: Promos.Promo.slug,
					company_id: Promos.Promo.company_id
				}
			})
			.then(response => {
				console.log("reserve response: ", response);
				Promos.Promo.reservation = response;
			});
	},
	unReserve: function(){
		console.log("unreserve: ");
		return m
			.request({
				method: "DELETE",
				url: "/api/reservations/" + Promos.Promo.reservation.id
				// data: Promos.Promo
			})
			.then(response => {
				console.log("delete reservation response: ", response);
				Promos.Promo.reservation = {};
				m.redraw();
			})
			.catch(error => {
				console.log("delete reservation error: ", error);
			});
	},
	AddFavourite: function(id) {
		return m.request({
			method: "POST",
			url: "/api/favourites",
			data: {
					user_id: id,
					promo_id: Promos.Promo.id,
					promo_slug: Promos.Promo.slug,
					company_id: Promos.Promo.company_id
				}
		}).then(function(response) {
			console.log("Favourite response: ", response)
			Promos.Promo.favourite = response;
		})
	},
	RemoveFavourite: function() {
		return m.request({
			method: "DELETE",
			url: "/api/favourites/" + Promos.Promo.favourite.id
		}).then(function(response) {
			console.log("Successfuly removed favourites: ",response)
			Promos.Promo.favourite = {};
		}).catch(function(error) {
			console.error("Error removing favourites");
		})
	},
	isFavourite: function() {
		return m.request({
			method: "GET",
			url: "/api/favourites/isfavourite/" + Promos.Promo.id
		}).then(function(response) {
			console.log("is favourite: ", response)
			Promos.Promo.favourite = response;
		}).catch(function(error) {
			console.error("Not Favourite: ", error);
		})
	}
};

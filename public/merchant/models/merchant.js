import m from "mithril";
import localforage from "localforage";

export function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
export function deleteCookie(name) {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export var MerchantModel = {
	Merchant: {},
	Token: "",
	Reservations: [],
	GetUserfromStorage: function() {
		if (!MerchantModel.Merchant || !MerchantModel.Merchant.merchant_email) {
			return localforage.getItem("AuthMerchant").then(function(merchant) {
				console.log(merchant);
				if (merchant != null) {
					MerchantModel.Merchant = merchant;
					m.redraw();
					return;
				}
				MerchantModel.Merchant = null;
				m.redraw();
			});
		}
	},
	Login: function(merchant) {
		console.log(merchant);
		return m
			.request({
				url: "/api/merchants/login",
				method: "POST",
				data: merchant
			})
			.then(function(response) {
				console.log("Login response#: ", response);
				var cookie = getCookie("X-MERCHANT-TOKEN");
				console.log("cookie:", cookie);
				return localforage.setItem("AuthMerchant", response.merchant);
			})
			.then(function() {
				MerchantModel.GetUserfromStorage();
				m.route.set("/");
			});
	},
	Logout: function() {
		m.route.set("/signup");
		localforage.removeItem("AuthMerchant");
		MerchantModel.Merchant = {};
		deleteCookie("X-MERCHANT-TOKEN");
	},
	Signup: function(merchant) {
		console.log("signup: ", merchant);
		return m
			.request({
				url: "/api/merchants",
				method: "POST",
				data: merchant
			})
			.then(function(response) {
				console.log("response: ", response);
			});
	},
	GetReservations: () => {
		return m
			.request({
				method: "GET",
				url: "/api/merchants/reservations"
			})
			.then(response => {
				console.log("Merchant Reservation response: ", response);
				MerchantModel.Reservations = response;
			});
	},
	ClaimReservation: id => {
		return m
			.request({
				method: "POST",
				url: "/api/merchants/reservations/claim/" + id,
				data: {}
			})
			.then(response => {
				console.log("claim reservation response: ", response);
				MerchantModel.Reservations = response;
			});
	}
};

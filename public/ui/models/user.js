import m from "mithril";
import localforage from "localforage";
import { getCookie, deleteCookie } from "../../util/cookie.js";
import { isEmptyObject } from "../../util/utils.js";

export var UserModel = {
	NewUser: {},
	User: {},
	Reservations: [],
	GetUserfromStorage: function() {
		console.log("user : ", UserModel.User);
		if (getCookie("X-USER-TOKEN") !== "") {
			console.log("No user, lets look for a user");
			return localforage.getItem("AuthUser").then(function(user) {
				console.log("Got User");
				console.log(user);
				if (!isEmptyObject(user)) {
					UserModel.User = user;
					m.redraw();
					return;
				}
				UserModel.User = {};
				m.redraw();
			});
		} else {
			return new Promise((resolve, reject) => {
				reject("Not logged in");
			});
		}
	},
	Login: loginUser => {
		return m
			.request({
				method: "POST",
				url: "/api/users/login",
				data: loginUser
			})
			.then(function(response) {
				console.log("User Login response#: ", response);
				var cookie = getCookie("X-USER-TOKEN");
				console.log("cookie:", cookie);
				return localforage.setItem("AuthUser", response.user);
			})
			.then(function() {
				UserModel.GetUserfromStorage()
					.then(() => {
						m.route.set("/dashboard/");
					})
					.catch(error => {
						console.error(error);
					});
			});
	},
	isReserved: id => {
		console.log("promo id");
		return m.request({
			method: "GET",
			url: "/api/reservations/isreserved/" + id
		});
	},
	GetReservations: () => {
		return m
			.request({
				method: "GET",
				url: "/api/reservations"
			})
			.then(response => {
				console.log("reservations response: ", response);
				UserModel.Reservations = response;
			})
			.catch(error => {
				console.log("reservations error: ", error);
			});
		// UserModel.User.id
	},
	Logout: () => {
		localforage.removeItem("AuthUser");
		UserModel.User = {};
		deleteCookie("X-USER-TOKEN");
		console.log("Cooookie deleted!");
		m.redraw();
		m.route.set("/");
	},
	Signup: () => {
		UserModel.NewUser.image = "";
		return m
			.request({
				method: "POST",
				url: "/api/users/signup",
				data: UserModel.NewUser
			})
			.then(response => {
				console.log("response: ", response);
			});
	}
};

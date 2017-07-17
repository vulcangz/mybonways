import m from "mithril";
import localforage from "localforage";
import { UserModel } from "../models/user.js";
import { getCookie } from "../../util/cookie.js";

export var UserAuth = {
	oncreate: function() {
		UserModel.GetUserfromStorage()
			.then(() => {
				UserModel.GetReservations();
			})
			.catch(error => {
				console.error(error);
			});
	},
	view: function(vnode) {
		var cookie = getCookie("X-USER-TOKEN");
		if (cookie === "") {
			m.route.set("/signup");
			return m("div");
		}
		return m("div", vnode.attrs, m.fragment(vnode.attrs, [vnode.children]));
	}
};

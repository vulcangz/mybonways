import m from "mithril";
import localforage from "localforage";
import { MerchantModel, getCookie } from "../models/merchant.js";

export var MerchantAuth = {
	oncreate: function() {
		MerchantModel.GetUserfromStorage();
	},
	view: function(vnode) {
		var cookie = getCookie("X-MERCHANT-TOKEN");
		if (cookie === "") {
			m.route.set("/signup");
			return m("div");
		}
		return m("div", vnode.attrs, m.fragment(vnode.attrs, [vnode.children]));
	}
};

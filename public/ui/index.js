import m from "mithril";

import UIShell from "./containers/uiShell.js";
import HotPromosPage from "./containers/hotPromosPage.js";
import PromoDetailPage from "./containers/promoDetailPage.js";
import OffCanvasMenu from "./components/offCanvasMenu.js";
import SearchArea from "./containers/searcharea.js";
import searchNav from "./components/searchNav.js";
import MapPromos from "./components/mappromos.js";
import DoublePromos from "./containers/doublePromos.js";
import MerchantPromos from "./containers/merchantpromos.js";
import SignupPage from "./containers/signuppage.js";
import Dashboard from "./containers/dashboard.js";
import Profile from "./containers/profile.js";
import Favourites from "./containers/favourites.js";
import { UserAuth } from "./components/auth.js";

var root = document.getElementById("appContainer");

m.route.prefix("");
m.route(root, "/", {
	"/": {
		view: function(vnode) {
			return m(
				OffCanvasMenu,
				vnode.attrs,
				m(UIShell, vnode.attrs, m(HotPromosPage, vnode.attrs))
			);
		}
	},
	"/promo/:slug": {
		view: function(vnode) {
			return m(
				OffCanvasMenu,
				vnode.attrs,
				m(UIShell, vnode.attrs, m(PromoDetailPage, vnode.attrs))
			);
		}
	},
	"/search": {
		view: function(vnode) {
			return m(
				OffCanvasMenu,
				vnode.attrs,
				m(UIShell, vnode.attrs, m(SearchArea, vnode.attrs))
			);
		}
	},
	"/map": {
		view: function(vnode) {
			return m(
				OffCanvasMenu,
				vnode.attrs,
				m(UIShell, vnode.attrs, m(MapPromos, vnode.attrs))
			);
		}
	},
	"/2in1": {
		view: vnode => {
			return m(
				OffCanvasMenu,
				vnode.attrs,
				m(UIShell, vnode.attrs, m(DoublePromos, vnode.attrs))
			);
		}
	},
	"/merchant/:id": {
		view: vnode => {
			return m(
				OffCanvasMenu,
				vnode.attrs,
				m(UIShell, vnode.attrs, m(MerchantPromos, vnode.attrs))
			);
		}
	},
	"/dashboard": {
		view: vnode => {
			return m(
				UserAuth,
				vnode.attrs,
				m(
					OffCanvasMenu,
					vnode.attrs,
					m(UIShell, vnode.attrs, m(Dashboard, vnode.attrs))
				)
			);
		}
	},
	"/dashboard/favourites": {
		view: vnode => {
			return m(
				UserAuth,
				vnode.attrs,
				m(
					OffCanvasMenu,
					vnode.attrs,
					m(UIShell, vnode.attrs, m(Favourites, vnode.attrs))
				)
			);
		}
	},
	"/signup": {
		view: vnode => {
			return m(SignupPage, vnode.attrs);
		}
	}
});

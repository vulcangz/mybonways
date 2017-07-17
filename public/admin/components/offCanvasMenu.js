import m from "mithril";
import Slideout from "slideout";
import { menus } from "../models/menus.js";
var slideout;

var OffCanvasMenu = {
	oncreate: function(vnode) {
		vnode.attrs.slideout = new Slideout({
			panel: document.getElementById("panel"),
			menu: document.getElementById("menu"),
			padding: 256,
			tolerance: 70
		});
	},
	view: function(vnode) {
		return (
			<section>
				<nav
					id="menu"
					class="white-90  shadow-inset-1 "
					style="background:#36494E"
				>
					<section class="h-100 flex flex-column justify-center align-center">
						<header class="pv4">
							<div class="pt4 ph4">
								{menus.map(function(menuItem, i) {
									return (
										<a
											class="db pv2 ph2 bt link white-90"
											oncreate={m.route.link}
											href={menuItem.href}
											key={i}
										>
											{menuItem.title}
										</a>
									);
								})}
							</div>
						</header>
					</section>
				</nav>
				<section id="panel">
					{m.fragment(vnode.attrs, vnode.children)}
				</section>
			</section>
		);
	}
};

export default OffCanvasMenu;

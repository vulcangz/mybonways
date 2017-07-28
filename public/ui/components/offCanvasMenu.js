import m from "mithril";
import Slideout from "slideout";
import { UserModel } from "../models/user.js";
import { isEmptyObject } from "../../util/utils.js";

var slideout;

var OffCanvasMenu = {
	oncreate: function(vnode) {
		vnode.attrs.slideout = new Slideout({
			panel: document.getElementById("panel"),
			menu: document.getElementById("menu"),
			padding: 256,
			tolerance: 50
		});
		console.log(vnode.attrs.slideout);
		UserModel.GetUserfromStorage().then(() => {}).catch(error => {
			console.error(error);
		});
	},
	view: function(vnode) {
		return (
			<section>
				{/*}<!-- display flex is inlined because the display block in slideout css overwrites it -->*/}
				<nav id="menu" class="white-90  shadow-inset-1 " style="background-color:#AA241F">
					<div class="bg-white ba b--light-gray black self-start ph3 pv2">
						<img src="/assets/img/logo.png" class="h2 dib v-mid"/>
						<strong class="dib v-mid pl1 ">myBonWays</strong>
					</div>
					<section class="h-90 flex  flex-column justify-center align-center">
						<section>
							{!isEmptyObject(UserModel.User)
								? <header class="pv4">
										<div class="tc">
											<img
												src="/assets/img/user.jpg"
												class="w4 h4 br-100 pa1 ba bw1 b--light-gray"
											/>
											<div>
												<span class="f4">
													{UserModel.User.full_name}
												</span>
											</div>
										</div>
										<div class="pt4 ph4">
											<a
												class="db pv2 ph2 bt b--light-gray link white-90"
												oncreate={m.route.link}
												href="/"
												onclick={() => {
													vnode.attrs.slideout.close();
												}}
											>
												Home
											</a>
											<a
												class="db pv2 ph2 bt b--light-gray link"
												oncreate={m.route.link}
												href="/dashboard"
												onclick={() => {
													vnode.attrs.slideout.close();
												}}
											>
												Dashboard
											</a>
											<a
												class="db pv2 ph2 bt b--light-gray link pointer"
												onclick={() => {
													vnode.attrs.slideout.close();
													UserModel.Logout();
												}}
											>
												Logout
											</a>
											<a
												class="db pv2 ph2 bt b--light-gray link white-90"
												href="/merchants"
											>
											Merchant area
										</a>
										</div>
									</header>
								: <div class="tc pv4">
										<div class="pa2">
											<div class="mb4 pa2">

												<h3 class="f4 fw3 pv2">
													Login to track and <br/>reserve all promos as they happen.
												</h3>
												<a
													href="/signup"
													class="bg-white gray ba b--light-gray pa3 shadow-3 br2 link"
													oncreate={m.route.link}
												>
													Signup/Login
												</a>
											</div>
											<a
												class="db pv2 ph2 bt b--light-gray link white-90"
												oncreate={m.route.link}
												href="/"
												onclick={() => {
													vnode.attrs.slideout.close();
												}}
											>
												Home
											</a>
											<a
												class="db pv2 ph2 bt b--light-gray link white-90"
												href="/merchants"
											>
												Merchant area
											</a>
										</div>
									</div>}
						</section>
					</section>
				</nav>
				<section id="panel">
					{m.fragment(vnode.attrs, [vnode.children])}
				</section>
			</section>
		);
	}
};

export default OffCanvasMenu;

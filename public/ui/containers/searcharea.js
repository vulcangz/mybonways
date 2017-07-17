import m from "mithril";
import { search } from "../models/search.js";
import Footer from "../components/footer.js";

var SearchArea = {
	initMap: function(myLatLng, i, title) {
		{
			/*var myLatLng = {lat: location.latitude, lng: location.longtitude};*/
		}

		// Create a map object and specify the DOM element for display.
		var map = new google.maps.Map(document.getElementById("map" + i), {
			center: myLatLng,
			scrollwheel: false,
			zoom: 4
		});

		// Create a marker and set its position.
		var marker = new google.maps.Marker({
			map: map,
			position: myLatLng,
			title: title
		});
	},
	oncreate: function(vnode) {
		console.log(vnode);
		let { q, lat, lng } = vnode.attrs;
		search.searchFor(q, lat, lng);
	},
	state: {
		loader: false
	},
	view: function(vnode) {
		return (
			<section>
				<section>
					{m.fragment(vnode.attrs, vnode.children)}
					<div class="cf">
						<h3 class="tc pa2">
							Search For <span class="underline">{vnode.attrs.q}</span>:
						</h3>
					</div>
					<div class="cf">
						{search.mysearch.map(function(promo, i) {
							return (
								<div class="dib w-50 pa1 fl" key={i}>
									<a
										class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100"
										href={"/promo/" + promo.slug}
										oncreate={m.route.link}
									>
										<div class="f8 pv1 tr pa1">
											<img
												src="/assets/img/svg/cart.svg"
												style="height:0.6rem;"
												class="pr1"
											/>
											<span class="red-custom">
												{promo.company_id}
											</span>
										</div>
										<div
											class="w-100 cover overflow-hidden"
											style={
												"background-image:url(" + promo.featured_image_b64 + ")"
											}
											oncreate={vnode => {
												vnode.dom.style.height =
													vnode.dom.offsetWidth / 1.5 + "px";
											}}
										>
											<img src={promo.featured_image} class="w-100 br2" />
										</div>
										<span class="f7 lh-title dib pa1 ">
											{promo.item_name}
										</span>
										<div class="f8 pa1 tr cf">
											<div class="dib w-50 fl">
												<span class=" red-custom db fw6 f5">
													{((parseInt(promo.old_price) -
														parseInt(promo.new_price)) /
														parseInt(promo.old_price) *
														100).toFixed(1)}%
												</span>
											</div>
											<div class="dib w-50 fl">
												<strong class="dark-gray db">
													{promo.new_price}CFA
												</strong>
												<span class="strike db">
													{promo.old_price}CFA
												</span>
											</div>
										</div>
										<div class="f8 pa1 pv2 ">
											<span class="pa1">
												<img
													src="/assets/img/svg/like-hollow.svg"
													class="dib pr1"
													style="height:0.5rem;"
												/>
												<span class="dib">200</span>
											</span>
											<span class="pa1">
												<img
													src="/assets/img/svg/comment.svg"
													class="pr1"
													style="height:0.5rem;"
												/>
												<span class="dib">12</span>
											</span>
										</div>
									</a>
								</div>
							);
						})}
					</div>
				</section>
				<div class="tc">
					<p
						class="dib pv2 ph3 pv3-ns ph4-ns ba b--red bg-red-custom white pointer shadow-2 hover-shadow-m3"
						onclick={() => {
							SearchArea.state.loader = true;
							search
								.loadMore(vnode.attrs.q, vnode.attrs.lat, vnode.attrs.lng)
								.then(() => {
									SearchArea.state.loader = false;
								})
								.catch(error => {
									SearchArea.state.loader = false;
								});
						}}
					>
						{SearchArea.state.loader ? m(".loader") : "Load More"}
					</p>
				</div>
			</section>
		);
	}
};

export default SearchArea;

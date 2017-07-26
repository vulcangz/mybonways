import m from "mithril";
import { search } from "../models/search.js";
import Footer from "../components/footer.js";
import PromoItem from "../components/promoItem.js";

var SearchArea = {
	initMap: function(myLatLng, i, title) {
		// {
		// 	/*var myLatLng = {lat: location.latitude, lng: location.longtitude};*/
		// }

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
		let { q, lat, lng,cat } = vnode.attrs;
		search.searchFor(q, lat, lng, cat);
	},
	state: {
		loader: false
	},
	view: function(vnode) {
		let { q, lat, lng,cat } = vnode.attrs;
		console.log((cat?cat!=="":false))
		return (
			<section style="min-height:100vh;">
				<section>
					{m.fragment(vnode.attrs, vnode.children)}
					<div class="cf">
						{
							(cat?cat!=="":false)?
							<div class="tc pa2 pv4 f4 light-gray ">
								category: <span class="black f2">{cat}</span>
							</div>
							:<div class="tc pa2 pv4 f4 light-gray">
								showing results for <span class="black f2">"{q}"</span>
							</div>
						}
					</div>
					<div class="cf">
						{search.mysearch.map(function(promo, i) {
							return (
								<PromoItem promo={promo} key={i} />
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
								.loadMore(q, lat, lng, cat)
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

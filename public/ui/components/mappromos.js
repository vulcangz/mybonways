import m from "mithril";
import { search } from "../models/search.js";

var MapPromos = {
	onbeforeremove: vnode => {
		vnode.dom.classList.add("fadeOut");
		return new Promise(function(resolve) {
			setTimeout(resolve, 1000);
		});
	},
	oncreate: vnode => {
		vnode.dom.classList.add("fadeIn");
		MapPromos.getLocation();
	},
	getLocation: () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				MapPromos.showPosition,
				error => {
					console.log("Error Occured getting the position: ", error);
				},
				{ enableHighAccuracy: true }
			);
		} else {
			//x.innerHTML = "Geolocation is not supported by this browser.";
		}
	},
	Locations: [],
	showPosition: position => {
		MapPromos.Position = position;
		// The nearby locations of all available branches...
		console.log("POSITION: ", position);
		// TODO:: ANOTHER SEARCH QUERY FOR MAPS
		search
			.searchFor("*", position.coords.latitude, position.coords.longitude)
			.then(() => {
				// Omit duplicate branches.
				search.mysearch.map(promo => {
					for (var j = 0; j < MapPromos.Locations.length; j++) {
						if (
							MapPromos.Locations[j].lng == promo.longitude &&
							MapPromos.Locations[j].lat == promo.latitude
						) {
							return;
						}
					}
					MapPromos.Locations.push({
						lng: promo.longitude,
						lat: promo.latitude,
						id: promo.company_id
					});
				});
				// ommit duplicate
				search.mysearch.forEach(promo => {
					for (var i = 0; i < MapPromos.Promos.length; i++) {
						if (MapPromos.Promos[i].slug == promo.slug) {
							return;
						}
					}
					MapPromos.Promos.push(promo);
				});

				m.redraw();
				MapPromos.DrawMap(position);
			})
			.catch(error => {
				MapPromos.NoPromos = "No promos found around this location.";
				console.log("error no promos found...");

				MapPromos.DrawMap(position);
			});
	},
	DrawMap: position => {
		var mylocation = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		console.log("mylocation::=> ", mylocation);
		var map = new google.maps.Map(document.getElementById("map"), {
			zoom: 16,
			center: mylocation
		});

		// get all locations near this user...

		// Create an array of alphabetical characters used to label the markers.
		var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		// Add some markers to the map.
		// Note: The code uses the JavaScript Array.prototype.map() method to
		// create an array of markers based on a given "locations" array.
		// The map() method here has nothing to do with the Google Maps API.
		var markers = MapPromos.Locations.map(function(location, i) {
			return new google.maps.Marker({
				position: location,
				label: labels[i % labels.length],
				title: location.id,
				map: map,
				infoWindow: new google.maps.InfoWindow({
					content:
						'<div id="content">' +
						'<strong id="firstHeading" class="firstHeading f5"><a href="/merchant/' +
						location.id +
						'">' +
						location.id +
						"</a> </strong>" +
						'<div id="bodyContent">' +
						MapPromos.Promos
							.map(promo => {
								if (location.id !== promo.company_id) {
									return;
								}
								return (
									`
									<a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100 mv2" href=${ "/promo/" + promo.slug}>
									    <div class="f8 pv1 tl pv1 ph1">
									        <div class="dib w-50 overflow-x-hidden">
									            <img src="/assets/img/svg/grid.svg" style="height:0.55rem;" class="di v-mid" />
									            <span class="red-custom di pl1 v-mid">
																						${promo.category}
																					</span>
									        </div>
									        <div class="dib w-50 overflow-x-hidden">
									            <img src="/assets/img/svg/cart.svg" style="height:0.55rem;" class="di v-mid" />
									            <span class="red-custom di pl1 v-mid">
																						${promo.company_id}
																					</span>
									        </div>
									    </div>
									    <div class="w-100 cover overflow-hidden">
									        <img src=${promo.featured_image} class="w-100 br2" />
									    </div>
									    <span class="f7 lh-title dib pa1 ">
																				${promo.item_name}
																			</span>
									    <div class="f8 pa1 tr cf">
									        <div class="dib w-50 fl">
									            <span class=" red-custom db fw6 f5">
																						${((parseInt(promo.old_price) -
																							parseInt(promo.new_price)) /
																							parseInt(promo.old_price) *
																							100).toFixed(1)}%
																					</span>
									        </div>
									        <div class="dib w-50 fl">
									            <strong class="dark-gray db">
																						${promo.new_price}F CFA
																					</strong>
									            <span class="strike db">
																						${promo.old_price}F CFA
																					</span>
									        </div>
									    </div>
									</a>
									`
								);
							})
							.join("") +
						"</div>" +
						"</div>",
					maxWidth: 350
				})
			});
		});
		// var infowindow = new google.maps.InfoWindow({
		//       content: contentString
		//     });
		// [].
		markers.forEach(marker => {
			marker.addListener("click", () => {
				marker.infoWindow.open(map, marker);
				console.log("Marker clicked: ", marker.title);
				// m.route.set("/merchant/" + marker.title)
			});
		});
		// ADD THE USERS LOCATION TO THE MARKERS...
		markers.push(
			new google.maps.Marker({
				position: mylocation,
				label: "Me",
				map: map,
				title: "My Location"
			})
		);

		// Add a marker clusterer to manage the markers.
		// var markerCluster = new MarkerClusterer(map, markers,
		//   { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
	},
	Position: {},
	NoPromos: "",
	Promos: [],
	view: vnode => {
		return (
			<section class="animated">
				{m.fragment(vnode.attrs, vnode.children)}
				<div class="cf shadow-4 pa2">
					{/*<div class="fl w-100 w-50-ns">
            <div class="cf">
              <p class="mv0 pa2 tc white bg-red-custom">{ MapPromos.NoPromos ? MapPromos.NoPromos : "List Of all branches..."}</p>
              {MapPromos.Promos.length? MapPromos.Promos.map(function(promo, i) {
                  return (
                    <div class="dib w-50 pa1 fl" key={i}>
                      <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100" href={"/promo/"+promo.slug} oncreate={m.route.link}>
                        <div class="f8 pv1 tr pa1">
                          <img src="/assets/img/svg/cart.svg" style="height:0.6rem;" class="pr1"/>
                          <span class="red-custom">
                            {promo.company_id}
                          </span>
                        </div>
                        <div class="w-100 cover overflow-hidden" style={"background-image:url("+promo.featured_image_b64+")"} oncreate={(vnode)=>{
                            vnode.dom.style.height = (vnode.dom.offsetWidth/1.5)+"px"
                          }}>
                          <img src={promo.featured_image} class="w-100 br2" />
                        </div>
                        <span class="f7 lh-title dib pa1 ">{promo.item_name}</span>
                        <div class="f8 pa1 tr cf">
                          <div class="dib w-50 fl">
                            <span class=" red-custom db fw6 f5">{(((parseInt(promo.old_price) - parseInt(promo.new_price))/parseInt(promo.old_price)) * 100).toFixed(1) }%</span>
                          </div>
                          <div class="dib w-50 fl">
                            <strong class="dark-gray db">{promo.new_price}F CFA</strong>
                            <span class="strike db">{promo.old_price}F CFA</span>
                          </div>
                        </div>
                        <div class="f8 pa1 pv2 ">
                          <span class="pa1">
                            <img src="/assets/img/svg/like-hollow.svg" class="dib pr1" style="height:0.5rem;"/>
                            <span class="dib">200</span>
                          </span>
                          <span class="pa1">
                            <img src="/assets/img/svg/comment.svg" class="pr1" style="height:0.5rem;"/>
                            <span class="dib">12</span>
                          </span>
                        </div>
                      </a>
                    </div>
                )
                }) : (<div class=""><div class="loader" style="color: red !important;"></div></div>)}
            </div>
            <div class="tc pv3">
              <button class="ba b--red-custom bg-transparent pv2 ph3 pointer" onclick={() => {
                }}>Load More</button>
            </div>
          </div>*/}
					<div class="ph1">
						<div class="shadow-4">
							<p class="bg-red-custom tc white br--top mv0 pv1 f8">
								Branches near you. <br />
								<small>(Click on marker to view details)</small>
							</p>
							<div id="map" class="vh-75 w-100 bg-gray" />
						</div>
					</div>
				</div>
			</section>
		);
	}
};

export default MapPromos;

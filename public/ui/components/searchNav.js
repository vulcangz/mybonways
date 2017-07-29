import m from "mithril";
import { search } from "../models/search.js";
import { UserModel } from "../models/user.js";
import { getCookie } from "../../util/cookie.js";
import tingle from "tingle.js";
import { settings } from "../../merchant/models/settings.js";
import { isEmptyObject } from "../../util/utils.js";
import iziToast from 'iziToast';

window.setLocation = function() {
	var loader = document.getElementById("location_loader");
	loader.style.display = "block";
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			position => {
				console.log(position);
				search.searchData.lat = position.coords.latitude;
				search.searchData.lng = position.coords.longitude;
				document.getElementById("areaInput").value =
					position.coords.latitude + "," + position.coords.longitude;
					loader.style.display = "none";
			},
			error => {
				iziToast.error({
					position: "topCenter",
					title: "Error",
					message: "An error occured trying to get your location: " + error.message
				});
				console.log("Location search error: ", error.message);
				loader.style.display = "none";
			},
			{
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000
			}
		);
	} else {
		iziToast.error({
			position: "topCenter",
			title: "Error",
			message: "No GeoLocation Support"
		});
		console.log("no geolocation support");
		loader.style.display = "none";
	}
};

// instanciate new modal
var modal = new tingle.modal({
	footer: true,
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["custom-class-2"],
	onOpen: function() {
		console.log("modal open");
	},
	onClose: function() {
		console.log("modal closed");
	},
	beforeClose: function() {
		// here's goes some logic
		// e.g. save content before closing the modal
		return true; // close the modal
		// return false; // nothing happens
	}
});
modal.setContent(`
  <div class="">
      <div class="db relative mv2" >
        <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
            <img src="/assets/img/svg/search.svg" class="" style="height:0.7rem;" />
        </span>
        <input type="search" class=" b--transparent w-100 pa2 ba input-reset searchinput bg-light-gray-custom" placeholder="search term eg. cars, home deals, etc" id="searchQuery"/>
      </div>
      <br/>
      <div class="pv2">
        <div class="tc ">
          <button class="pa2 dib ba b--light-gray" onclick="window.setLocation()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h1" viewBox="0 0 561 561"><path d="M280.5 178.5c-56.1 0-102 45.9-102 102 0 56.1 45.9 102 102 102 56.1 0 102-45.9 102-102C382.5 224.4 336.6 178.5 280.5 178.5zM507.5 255C494.7 147.9 410.6 63.8 306 53.6V0h-51v53.6C147.9 63.8 63.8 147.9 53.6 255H0v51h53.6C66.3 413.1 150.5 497.3 255 507.5V561h51v-53.5C413.1 494.7 497.3 410.6 507.5 306H561v-51H507.5zM280.5 459C181.1 459 102 380 102 280.5S181.1 102 280.5 102 459 181.1 459 280.5 380 459 280.5 459z"/></svg>
			<span>search around current location</span>
          </button>
        </div>
      </div>
      <div class="tc ">
		<div class="loader" id="location_loader" style="color: red; display: none"></div>
        <strong>or</strong>
      </div>
      <div class="db relative mv2" >
        <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
            <img src="/assets/img/svg/location.svg" class="" style="height:0.7rem;" />
        </span>
        <input type="search" class="w-100 pa2 input-reset searchinput bg-light-gray-custom  b--transparent" placeholder="select location" id="areaInput" />
      </div>
  </div>
  `);

// add another button
modal.addFooterBtn("cancel", "tingle-btn tingle-btn--danger", function() {
	// here goes some logic
	modal.close();
});

modal.addFooterBtn(
	"search",
	"tingle-btn tingle-btn--primary tingle-btn--pull-right",
	function() {
		// here goes some logic
		search.searchData.item = document.getElementById("searchQuery").value;

		let { lat, lng } = search.searchData;
		console.log("lat : ", lat, " lng : ", lng);
		if (!search.searchData.item) {
			iziToast.error({
				position: "topCenter",
				title: "Error",
				message: "Empty search item! (Specify item to search for)"
			});
			return;
		}
		if (!lat || !lng) {
			iziToast.error({
				position: "topCenter",
				title: "Error",
				message: "Location is not specified"
			});
			return;
		}
		var querystring = m.buildQueryString({
			q: search.searchData.item,
			lat: lat,
			lng: lng
		});
		searchNav.searchError = "";
		search.searchFor(search.searchData.item, lat, lng);
		console.log(querystring);
		modal.close();
		m.route.set("/search?" + querystring);
	}
);

var searchNav = {
	fixNav: false,
	searchError: "",
	loader: "noshow",
	oncreate: function(vnode) {
		if ("geolocation" in navigator) {
			/* geolocation is available */
			console.log("geolocation is available--");
		} else {
			/* geolocation IS NOT available */
			console.log("geolocation IS NOT available--");
		}
		UserModel.GetUserfromStorage().then(() => {}).catch(error => {
			console.error(error);
		});
		vnode.attrs.slideout.close();

		let input = document.getElementById("areaInput");
		var autocomplete = new google.maps.places.Autocomplete(input, {
			types: ["geocode"],
			componentRestrictions: { country: settings.countryCode }
		});
		autocomplete.addListener("place_changed", function() {
			var place = autocomplete.getPlace();
			console.log(place.geometry.location);
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				console.log("No details available for input: '" + place.name + "'");
				return;
			}
			// do the search here
			var lat = place.geometry.location.lat();
			var lng = place.geometry.location.lng();
			search.searchData.lat = lat;
			search.searchData.lng = lng;
			m.redraw();
		});

		var navBar = document.getElementById("fixedNav");
		var navBarOffset = navBar.offsetTop;
		var last_known_scroll_position = 0;
		var ticking = false;
		function CheckPostionAndUpdateNavClass(scroll_pos) {
			// do something with the scroll position
			if (scroll_pos > navBarOffset) {
				vnode.state.fixNav = true;
				m.redraw();
			} else {
				vnode.state.fixNav = false;
				m.redraw();
			}
		}

		window.addEventListener("scroll", function(e) {
			last_known_scroll_position = window.scrollY;
			if (!ticking) {
				window.requestAnimationFrame(function() {
					CheckPostionAndUpdateNavClass(last_known_scroll_position);
					ticking = false;
				});
			}
			ticking = true;
		});
	},
	launchSearchModal: function() {
		// open modal
		modal.open();
	},
	// Loggedin: false,
	view: vnode => {
		// console.log(UserModel);
		return (
			<section>
				<section class="pb1 dn-ns ">
					<div
						class={
							"flex flex-row pv1 ph2  w-100 z-2 fixed-header w-100 bg-white " +
							(vnode.state.fixNav === true
								? "fixed top-0 left-0 bb b--light-gray"
								: "relative-ns")
						}
						id="fixedNav"
					>
						<div class="flex pa1 pr3">
							<a
								class="red-custom f3 pointer"
								onclick={() => vnode.attrs.slideout.toggle()}
							>
								☰
							</a>
						</div>
						<div class="flex flex-row flex-auto">
							<div class="flex flex-auto  justify-center pa1 tc">
								<a
									href="/map"
									class={
										(m.route.get() == "/map"
											? "bg-red-custom white "
											: " red-custom ") + " pa1 dib w-100 br-pill no-underline"
									}
									oncreate={m.route.link}
								>
									Map
								</a>
							</div>
							<div class="flex flex-auto justify-center pa1 tc">
								<a
									href="/"
									class={
										(m.route.get() == "/"
											? "bg-red-custom white "
											: " red-custom ") + " pa1 dib w-100 br-pill no-underline"
									}
									oncreate={m.route.link}
								>
									Hot
								</a>
							</div>
							<div class="flex flex-auto justify-center pa1 tc">
								<a
									href="/categories"
									class={
										(m.route.get() == "/categories"
											? "bg-red-custom white "
											: " red-custom ") + " pa1 dib w-100 br-pill no-underline"
									}
									oncreate={m.route.link}
								>
									Categories
								</a>
							</div>
						</div>
					</div>
					<div
						class={"ph2 flex " + (vnode.state.fixNav === true ? "pt45" : "")}
					>
						<button
							class="bg-transparent b--transparent ma0 pa0 dib w-100"
							onclick={searchNav.launchSearchModal}
						>
							<div class=" cf flex justify-between relative">
								<div class="dib   flex relative tl" style="flex:7">
									<span
										class={
											(searchNav.searchError
												? " b--red "
												: " b--transparent ") +
											" w-100  ba bg-light-gray-custom ph2 pv2"
										}
									>
										<img
											src="/assets/img/svg/search.svg"
											class="pr2"
											style="height:0.7rem;"
										/>
										search
									</span>
								</div>
								<div class="dib ml2 flex relative tl" style="flex:3">
									<span
										class="w-100  bg-light-gray-custom bw2 b--transparent ph2 pv2"
										id="areaInput"
									>
										<img
											src="/assets/img/svg/location.svg"
											class="pr2"
											style="height:0.7rem;"
										/>
										area
									</span>
								</div>
							</div>
						</button>
					</div>
				</section>
				<section class="dn db-ns">
					<section class="pa2 bb b--light-gray cf fixed w-100 bg-white z-2">
						<div class="dib">
							<img src="/assets/img/logo.png" class="h2 dib v-mid" />
							<strong class="dib v-mid pl1">myBonWays</strong>
						</div>
						<div class=" dib v-top ml3">
							<div class="">
								<div class=" pa1 tc dib">
									<a
										href="/map"
										class={
											(m.route.get() == "/map"
												? "bg-red-custom white "
												: " red-custom ") +
											" pa1 ph3 dib w-100 br-pill no-underline"
										}
										oncreate={m.route.link}
									>
										Map
									</a>
								</div>
								<div class=" pa1 tc dib">
									<a
										href="/"
										class={
											(m.route.get() == "/"
												? "bg-red-custom white "
												: " red-custom ") +
											" pa1 ph3 dib w-100 br-pill no-underline"
										}
										oncreate={m.route.link}
									>
										Hot
									</a>
								</div>
								<div class=" pa1 tc dib">
									<a
										href="/categories"
										class={
											(m.route.get() == "/categories"
												? "bg-red-custom white "
												: " red-custom ") +
											" pa1 ph3 dib w-100 br-pill no-underline"
										}
										oncreate={m.route.link}
									>
										Categories
									</a>
								</div>
							</div>
						</div>
						<div class="fr ml3 relative">
							{!isEmptyObject(UserModel.User)
								? <div class="">
										<button
											class="bg-transparent b--transparent ma0 pa0 dib "
											onclick={() =>
												(vnode.state.showNav = !vnode.state.showNav)}
										>
											<img
												src="/assets/img/user.jpg"
												class="h2 w2 br-100 dib v-mid ba b--light-gray"
											/>
											<span class="dib v-mid pa1 ph2">
												{UserModel.User.full_name} &nbsp;▾
											</span>
										</button>
										<div
											class={
												" right-0 buttom-0 absolute bg-white shadow-m2 pa3 br1 w5 " +
												(vnode.state.showNav ? "db" : "dn")
											}
										>
											<a
												class="db pa2 bb b--light-gray"
												oncreate={m.route.link}
												href="/dashboard"
											>
												Dasboard
											</a>
											<a
												class="db pa2 bb b--light-gray"
												onclick={() => {
													UserModel.Logout();
												}}
											>
												Logout
											</a>
										</div>
									</div>
								: <div>
										<a
											href="/signup"
											class="navy  link grow pv2 ph3 dib v-mid"
											oncreate={m.route.link}
										>
											Signup or Login
										</a>
									</div>}
						</div>
						<div class="w-40 inline-flex v-top fr">
							<button
								class="bg-transparent b--transparent ma0 pa0 dib w-100"
								onclick={searchNav.launchSearchModal}
							>
								<div class=" cf flex justify-between relative">
									<div class="dib   flex relative tl" style="flex:6">
										<span
											class={
												(searchNav.searchError
													? " b--red "
													: " b--transparent ") +
												" w-100  ba bg-light-gray-custom ph2 pv2"
											}
										>
											<img
												src="/assets/img/svg/search.svg"
												class="pr2"
												style="height:0.7rem;"
											/>
											search
										</span>
									</div>
									<div class="dib ml2 flex relative tl" style="flex:4">
										<span
											class="w-100  bg-light-gray-custom bw2 b--transparent ph2 pv2"
											id="areaInput"
										>
											<img
												src="/assets/img/svg/location.svg"
												class="pr2"
												style="height:0.7rem;"
											/>
											area
										</span>
									</div>
								</div>
							</button>
						</div>
					</section>
					<div class="pb5 " />
				</section>
			</section>
		);
	}
};

export default searchNav;

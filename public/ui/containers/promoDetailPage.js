import m from "mithril";
import { Promos } from "../models/promos.js";
import { UserModel } from "../models/user.js";
import { isEmptyObject } from "../../util/utils.js";
import Footer from "../components/footer.js";
import format from "date-fns/format";
// import baguetteBox from "baguettebox.js";
import Comments from '../components/comments.js';
import iziToast from 'iziToast';

var Details = {
	onbeforeremove: vnode => {
		vnode.dom.classList.add("fadeOut");
		return new Promise(function(resolve) {
			setTimeout(resolve, 500);
		});
	},
	oncreate: vnode => {
		vnode.dom.classList.add("fadeIn");
		// console.log(baguetteBox)
		// baguetteBox.run('#gallery');
	},
	view: () => {
		var promo_images = Promos.Promo.promo_images
			.split(",")
			.map(function(pi, i) {
				if (pi === "" || pi === " ") {
					return;
				}
				return (
					<a class="dib w-50 w-33-ns br b--transparent" href={pi}>
						<img src={pi} class="w-100  b--light-gray-custom" />
					</a>
				);
			});
		return (
			<div class="animated">
				<p>{Promos.Promo.description}</p>
				<div id="gallery">
					{promo_images}
				</div>
			</div>
		);
	}
};

var Locations = {
	onbeforeremove: vnode => {
		vnode.dom.classList.add("fadeOut");
		return new Promise(function(resolve) {
			setTimeout(resolve, 1000);
		});
	},
	oncreate: vnode => {
		console.log("Oncreate locations...");
		vnode.dom.classList.add("fadeIn");
		// Promos.GetBranches().then(() => {
		//   console.log("GOT BRANCHES...");
		// }).catch((error) => {
		//   console.log("BRANCHES ERROR: ", error)
		// })
	},
	view: vnode => {
		console.log("Promos.Promo: ", Promos.Promo);
		return (
			<div class="animated">
				<p>All branches you can find this promo (click to load map).</p>
				{Promos.PromoBranches.length
					? Promos.PromoBranches.map((branch, i) => {
							return (
								<div class="pa2 db">
									<a
										target="_blank" class="link"
										href={
											"https://www.google.com/maps/dir/?api=1&destination=" +
											branch.latitude +
											"," +
											branch.longitude
										}
									>
										<div class="shadow-4 pa2">
											<p class="">
												{branch.address} <br /> {branch.country}
											</p>
										</div>
									</a>
								</div>
							);
						})
					: ""}
			</div>
		);
	}
};

var PromoDetailPage = {
	oncreate: function(vnode) {
		console.log("vnode");
		// UserModel.GetUserfromStorage();
		Promos.GetPromo(vnode.attrs.slug);
	},
	ReserveStatus: false,
	tab: "Details",
	view: function(vnode) {
		return (
			<section>
				<section>
					{m.fragment(vnode.attrs, vnode.children)}
					<section class="cf">
						<section class="bg-white ">
							<div
								class="w-100 cover overflow-hidden"
								id="featured_image"
								style={
									"background-image:url(" +
									Promos.Promo.featured_image_b64 +
									");min-height:150px"
								}
								oncreate={vnode => {
									vnode.dom.style.height = vnode.dom.offsetWidth / 1.5 + "px";
								}}
							>
								<img src={Promos.Promo.featured_image} class="w-100 " />
							</div>
						</section>
						<section class="pv3 f6 ph2 gray">
							<section class="pb3">
								<div class="dib fr">
									<a
										class={
											(!isEmptyObject(Promos.Promo.reservation)
												? " red-custom "
												: " gray ") +
											" pa1 b--light-gray bw1 ba mh1 br2 dib pointer grow"
										}
										onclick={function () {
											if (!isEmptyObject(UserModel.User) && Promos.Promo.quantity) {
												if (isEmptyObject(Promos.Promo.reservation)) {
													Promos.Reserve(UserModel.User.id)
														.then(function () {
															iziToast.success({
																title: 'Successs',
																message: "You have Reserved this item.",
																position: 'topRight',
															});
														})
														.catch(error => {
															iziToast.error({
																title: 'Error',
																message: "Could not reserve this promo",
																position: 'topRight',
																color: "red"
															});
															console.log("Reserve error: ", error);
															Promos.Promo.reservation = {};
														});
												} else {
													Promos.unReserve().then(response => {
														iziToast.info({
															title: 'Info',
															message: "You have unreserved this item.",
															position: 'topRight',
														});
														Promos.Promo.reservation = {};
													});
												}
											} else {
												// TODO:: DISPLAY THE ERROR ON THE PAGE
												iziToast.error({
													title: 'Error',
													message: "You are not logged in",
													position: 'topRight',
													color: "red"
												});
												console.error("You are not logged in.");
											}
										}}
									>
										<img
											src="/assets/img/svg/star.svg"
											class="dib v-mid"
											style="height:0.8rem;"
										/>
										<small class="dib v-mid ph1">reserve</small>
									</a>
									<a class={
									(!isEmptyObject(Promos.Promo.favourite)
												? " red-custom "
												: " gray ") +
											" pa1 b--light-gray bw1 ba mh1 br2 dib pointer grow"}
										onclick={function() {
											if (!isEmptyObject(UserModel.User)) {
												if (isEmptyObject(Promos.Promo.favourite)) {
													Promos.AddFavourite(UserModel.User.id)
													.then(function() {
														iziToast.success({
															title: 'Success',
															message: "Successfully added to favourites",
															position: 'topRight'
														});
													})
													.catch(function() {
														iziToast.error({
															title: 'Error',
															message: "Could not add this promo to favourite",
															position: 'topRight',
															color: "red"
														});
													})
												} else {
													Promos.RemoveFavourite()
													.then(function() {
														iziToast.info({
															title: 'Info',
															message: "Removed as favourite",
															position: 'topRight'
														});
													})
													.catch(function() {
														iziToast.error({
															title: 'Error',
															message: "Could not remove as favourite",
															position: 'topRight',
															color: "red"
														});
													})
												}
											} else {
												if (isEmptyObject(UserModel.User)) {
													// TODO:: DISPLAY THE ERROR ON THE PAGE
													iziToast.error({
														title: 'Error',
														message: "You are not logged in",
														position: 'topRight',
														color: "red"
													});
													console.error("You are not logged in.");
												}
											}
										}}>
										<img
											src="/assets/img/svg/like-hollow.svg"
											class="dib v-mid"
											style="height:0.8rem;"
										/>
										<small class="dib v-mid ph1">favorite</small>
									</a>
								</div>
								<div class="ph2">
									<span class="dib red-custom pv1 f4 f6-ns">
										{Promos.Promo.item_name}
									</span>
									{!isEmptyObject(Promos.Promo.reservation)
										? <div class="pt1 fr">
												<span>Reservation Code: </span>
												<span class="red">
													{Promos.Promo.reservation.code}
												</span>
											</div>
										: ""}

									<div class="pv2">
										<div class="pt1">
											<span class="f7">Merchant: </span>
											<span>
												{Promos.PromoMerchant.company_name}
											</span>
										</div>
									</div>
									{Promos.Promo.quantity?
									<div class="pv2">
										<div class="pt1">
											<span class="f7">Reservation Quantity: </span>
											<span>
												{Promos.Promo.quantity}
											</span>
										</div>
									</div>:""}
									<div class="pv2 ">
										<div class="pt1">
											<span class="f7">Original Price: </span>
											<span>
												{Promos.Promo.old_price ? Promos.Promo.old_price : "0"}FCFA
											</span>
										</div>
										<div class="pt1">
											<span class="f7">Current Price: </span>
											<span>
												{Promos.Promo.old_price ? Promos.Promo.new_price : "0"}FCFA
											</span>
										</div>
									</div>

									<div class="pv2 ">
										<div class="pt1">
											<span class="f7">Promo starts: </span>
											<span>
												{format(Promos.Promo.start_date, "DD-MM-YYYY h:mm a")}
											</span>
										</div>
										<div class="pt1">
											<span class="f7">Promo ends: </span>
											<span>
												{format(Promos.Promo.end_date, "DD-MM-YYYY h:mm a")}
											</span>
										</div>
									</div>

								</div>
							</section>
							<section class="pv2">
								<div class="flex flex-row flex-auto bt bb b--red-custom">
									<div class="flex flex-auto  justify-center tc">
										<button
											class={
												(PromoDetailPage.tab == "Details"
													? "bg-red-custom white"
													: "bg-white ") +
												" pa1 dib w-100 ba b--transparent pointer"
											}
											onclick={() => {
												PromoDetailPage.tab = "Details";
											}}
										>
											Details
										</button>
									</div>
									{/*<div class="flex flex-auto  justify-center tc">
                    <button class={(PromoDetailPage.tab == "Map" ? "bg-red-custom white" : "bg-white ") + " pa1 dib w-100 ba b--transparent pointer mh1"}
                      onclick={() => {
                        PromoDetailPage.tab = "Map";
                      }}>Map</button>
                  </div>*/}
									<div class="flex flex-auto  justify-center tc">
										<button
											class={
												(PromoDetailPage.tab == "Locations"
													? "bg-red-custom white"
													: "bg-white ") +
												" pa1 dib w-100 ba b--transparent pointer"
											}
											onclick={() => {
												PromoDetailPage.tab = "Locations";
											}}
										>
											Locations
										</button>
									</div>
									<div class="flex flex-auto  justify-center tc">
										<button
											class={
												(PromoDetailPage.tab == "Comments"
													? "bg-red-custom white "
													: "bg-white ") +
												" pa1 dib w-100 ba b--transparent pointer"
											}
											onclick={function() {
												PromoDetailPage.tab = "Comments";
											}}
										>
											Comments
										</button>
									</div>
								</div>
								<div class="pa1">
									{PromoDetailPage.tab == "Details" ? m(Details) : ""}
									{PromoDetailPage.tab == "Comments" ? m(Comments) : ""}
									{PromoDetailPage.tab == "Locations"
										? m(Locations, vnode)
										: ""}
								</div>
							</section>
						</section>
					</section>
				</section>
			</section>
		);
	}
};

export default PromoDetailPage;

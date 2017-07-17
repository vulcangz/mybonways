import m from "mithril";
import { Promos } from "../models/promos.js";
import { UserModel } from "../models/user.js";
import { isEmptyObject } from "../../util/utils.js";
import Footer from "../components/footer.js";

var Details = {
	onbeforeremove: vnode => {
		vnode.dom.classList.add("fadeOut");
		return new Promise(function(resolve) {
			setTimeout(resolve, 500);
		});
	},
	oncreate: vnode => {
		vnode.dom.classList.add("fadeIn");
	},
	view: () => {
		var promo_images = Promos.Promo.promo_images
			.split(",")
			.map(function(pi, i) {
				if (pi === "" || pi === " ") {
					return;
				}
				return (
					<div class="dib w-50 br b--transparent">
						<img src={pi} class="w-100  b--light-gray-custom" />
					</div>
				);
			});
		return (
			<div class="animated">
				<p>{Promos.Promo.description}</p>
				<div class=""> {promo_images} </div>{" "}
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
			<div class="red animated">
				<p>All branches you can find this promo.</p>
				{Promos.PromoBranches.length
					? Promos.PromoBranches.map((branch, i) => {
							return (
								<div class="pa2 dib">
									<a
										target="_blank"
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
											" pa1 b--light-gray bw1 ba mh1  br2 dib pointer grow"
										}
										onclick={() => {
											if (!isEmptyObject(UserModel.User)) {
												if (isEmptyObject(Promos.Promo.reservation)) {
													Promos.Reserve(UserModel.User.id)
														.then(() => {
															{
																/*Promos.Promo.reservation = {}*/
															}
														})
														.catch(error => {
															console.log("Reserve error: ", error);
															Promos.Promo.reservation = {};
														});
												} else {
													Promos.unReserve().then(response => {
														Promos.Promo.reservation = {};
													});
												}
											} else {
												console.error("Cannot reserve this promo.");
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
									<a class="pa1 bg-transparent b--light-gray bw1 ba mh1 gray br2 grow pointer dib">
										<img
											src="/assets/img/svg/like-hollow.svg"
											class="dib v-mid"
											style="height:0.8rem;"
										/>
										<small class="dib v-mid ph1">favorite</small>
									</a>
								</div>
								<div class="ph2">
									<span class="dib red-custom pv1">
										{Promos.Promo.old_price ? Promos.Promo.item_name : ""}
									</span>
									{!isEmptyObject(Promos.Promo.reservation)
										? <div class="pt1 fr">
												<span>Reservation Code: </span>
												<span class="red">
													{Promos.Promo.reservation.code}
												</span>
											</div>
										: ""}
									<div class="pt1">
										<span>Original Price: </span>
										<span>
											{Promos.Promo.old_price ? Promos.Promo.old_price : ""}CFA
										</span>
									</div>
									<div class="pt1">
										<span>Current Price: </span>
										<span>
											{Promos.Promo.old_price ? Promos.Promo.new_price : ""}CFA
										</span>
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
								</div>
								<div class="pa1">
									{PromoDetailPage.tab == "Details" ? m(Details) : ""}
									{/*{PromoDetailPage.tab == "Map" ? m(Map) : ""}*/}
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

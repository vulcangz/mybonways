import m from "mithril";
import { search } from "../models/search.js";
import { Promos } from "../models/promos.js";
import { Slides } from "../models/slides.js";
import { lory } from "lory.js";
import Footer from "../components/footer.js";
import searchNav from "../components/searchNav.js";

var HotPromosPage = {
	slideIndex: 1,
	Slides: [],
	oncreate: function(vnode) {
		Slides.GetAllSlides().then(() => {
			console.log("then called ");
			m.redraw();
			// document.addEventListener('DOMContentLoaded', function () {
			console.log("then called 2");
			var simple = document.querySelector(".js_slider");
			console.log("then called ", simple);
			var loryInstance = lory(simple, {
				rewind: true
			});
			setInterval(() => {
				loryInstance.next();
			}, 4000);
			// });
		});
		console.log(vnode);
		Promos.GetFeaturedPromos();
	},
	view: function(vnode) {
		return (
			<section class="tc">
				<section class="animated">
					<section class="bg-white pa2">
						<div
							class="slider overflow-hidden js_slider relative"
							oncreate={vnode => {
								vnode.dom.style.height = vnode.dom.offsetWidth / 2 + "px";
							}}
						>
							<div class="frame js_frame">
								<ul class="slides js_slides pa0 ma0 w-100">
									{Slides.AllSlides.length
										? Slides.AllSlides.map(slide => {
												return (
													<li class="js_slide w-100">
														<a
															href={slide.url}
															class="w-100 dib v-top"
															oncreate={m.route.link}
														>
															<img src={slide.image} class="w-100 br3" />
														</a>
													</li>
												);
											})
										: ""}
								</ul>
							</div>
							<span class="js_prev prev pa4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="50"
									height="50"
									viewBox="0 0 501.5 501.5"
								>
									<g>
										<path
											fill="#2E435A"
											d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"
										/>
									</g>
								</svg>
							</span>
							<span class="js_next next pa4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="50"
									height="50"
									viewBox="0 0 501.5 501.5"
								>
									<g>
										<path
											fill="#2E435A"
											d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"
										/>
									</g>
								</svg>
							</span>
						</div>

						{/*<a href="/promo/laptop-thyos" oncreate={m.route.link}><img src="/assets/img/ad/5.jpg" class="w-100 br3" /></a>*/}
					</section>
					<section class="bg-light-gray-customx pv2">
						<div class="">
							<div class="pv1 cf">
								{Promos.FeaturedPromos.map((promo, i) => {
									return (
										<div class="dib w-50 w-33-m w-25-l pa1 fl" key={i}>
											<a
												class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100"
												href={"/promo/" + promo.slug}
												oncreate={m.route.link}
											>
												<div class="f8 pv1 tl pv1 ph1">
													<div class="dib w-50 overflow-x-hidden">
														<img
															src="/assets/img/svg/grid.svg"
															style="height:0.55rem;" class="di v-mid"
														/>
													<span class="red-custom di pl1 v-mid">
															{promo.category}
														</span>
													</div><div class="dib w-50 overflow-x-hidden">
														<img
															src="/assets/img/svg/cart.svg"
															style="height:0.55rem;" class="di v-mid"
														/>
													<span class="red-custom di pl1 v-mid">
															{promo.company_id}
														</span>
													</div>
												</div>
												<div
													class="w-100 cover overflow-hidden"
													style={
														"background-image:url(" +
														promo.featured_image_b64 +
														")"
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
						</div>
						<div class="tc pv3">
							<button
								class="ba b--red-custom bg-transparent pv2 ph3"
								onclick={() => {
									Promos.LoadMore();
								}}
							>
								Load More
							</button>
						</div>
					</section>
				</section>
			</section>
		);
	}
};

export default HotPromosPage;

import m from "mithril";
import { search } from "../models/search.js";
import { Promos } from "../models/promos.js";
import { Slides } from "../models/slides.js";
import { lory } from "lory.js";
import Footer from "../components/footer.js";
import searchNav from "../components/searchNav.js";
import PromoItem from "../components/promoItem.js";

var HotPromosPage = {
	slideIndex: 1,
	Slides: [],
	oncreate: function(vnode) {
		// console.error("TESTING THE MICROPHONE:::")
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
	onremove: function () {
		// console.error("TESTING THE MICROPHONE:::");
		Promos.Page = 0;
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
							<div class="frame js_frame h-100">
								<ul class="slides js_slides pa0 ma0 w-100 h-100">
									{Slides.AllSlides.length
										? Slides.AllSlides.map(slide => {
												return (
													<li class="js_slide w-100 h-100">
														<a
															href={slide.url}
															class="w-100 dib v-top h-100 "
															oncreate={m.route.link}
														>
															<img src={slide.image} class="w-100 br3 h-100 cover" />
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
										<PromoItem promo={promo} key={i}/>
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

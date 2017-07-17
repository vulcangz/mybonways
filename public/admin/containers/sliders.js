import m from "mithril";
import { Slides } from "../models/slides.js";

var Slider = {
	oncreate: () => {
		Slides.GetAllSlides();
	},
	loader: false,
	view: vnode => {
		return (
			<section>
				<div class="ph4 pv4 bg-white shadow-m2 ">
					<div class="">
						<span class="fw6 f3">All Sliders </span>
						<a
							href="/slider/new"
							class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4"
							oncreate={m.route.link}
						>
							New Slider
						</a>
					</div>
				</div>
				<div class="pa3 bg-white shadow-m2 mt3 cf">
					{Slides.AllSlides.map(slide => {
						return (
							<div class="shadow-4 mv1 ba b--light-gray">
								<div
									class="w-100 overflow-hidden"
									oncreate={vnode => {
										vnode.dom.style.height = vnode.dom.offsetWidth / 1.5 + "px";
									}}
								>
									<p class="bg-navy white mv0 pa2">
										URL: &nbsp; <span class="gray underline">{slide.url}</span>
									</p>
									<img src={slide.image} alt="image" />
								</div>
								<div class="pa2 tr">
									<a
										href={"/slider/edit/" + slide.id}
										class="bg-navy dib v-mid white pv1 ph2 w3 tc ba b--transparent no-underline mh2 pointer"
										oncreate={m.route.link}
									>
										Edit
									</a>
									<button
										class="bg-navy white dib v-mid w3 pv1 ph2 ba b--transparent mh2 pointer"
										onclick={() => {
											Slider.loader = true;
											Slides.DeleteSlide(slide.id)
												.then(() => {
													Slider.loader = false;
												})
												.catch(() => {
													Slider.loader = false;
												});
										}}
									>
										{Slider.loader ? m(".loader") : "Delete"}
									</button>
								</div>
							</div>
						);
					})}
					{/*<div class="shadow-4 mv1 pv2">
                        <p class="mv0 pa2">http://mybonways.com/promos/some-promo-HjsTy</p>
                        <img src="/assets/img/ad/5.jpg" alt="image" />
                        <div class="">
                            <a href="" class="bg-navy white pa2 ba b--transparent no-underline mh2 pointer">Edit</a>
                            <button class="bg-navy white pa2 ba b--transparent mh2 pointer">Delete</button>
                        </div>
                    </div>*/}
				</div>
			</section>
		);
	}
};

export default Slider;

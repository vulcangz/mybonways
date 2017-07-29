import m from "mithril";
import {Promos} from '../models/promos.js';
import PromoItem from '../components/promoItem.js';

var MerchantPromos = {
	oncreate: (vnode) => {
		Promos.GetMerchantPromos(vnode.attrs.id);
	},
	view: vnode => {
		return (
			<section>
				<section>
					{m.fragment(vnode.attrs, vnode.children)}
				</section>
				<section>
					<div class="pa1">
						<p class="mv0 pa2 bg-red-custom white">Promos provided by {vnode.attrs.id}:</p>
						{Promos.MerchantPromos.length?
						Promos.MerchantPromos.map((promo, i)=>{
							return (
										<PromoItem promo={promo} key={i}/>
									);
							{/* return (<div class="dib w-50 w-33-m w-25-l pa1 fl" key={i}>
								<a
									class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100"
									href={"/promo/" + promo.slug}
									oncreate={m.route.link}
								>
									<div class="f8 pv1 tr pa1">
										<img
											src="/assets/img/svg/cart.svg"
											style="height:0.6rem;"
										/>
										<span class="red-custom dib pl1">
											{promo.company_id}
										</span>
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
												{promo.new_price}F CFA
											</strong>
											<span class="strike db">
												{promo.old_price}F CFA
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
							</div>) */}
						}):""}
					</div>
				</section>
			</section>
		);
	}
};

export default MerchantPromos;

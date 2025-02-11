import m from "mithril";
import Footer from "../components/footer.js";
import PromoItem from "../components/promoItem.js";
import {Promos} from "../models/promos.js";

var CategoriesPage = {
	onbeforeremove: vnode => {
		vnode.dom.classList.add("fadeOut");
		return new Promise(function(resolve) {
			setTimeout(resolve, 1000);
		});
	},
	oncreate: vnode => {
		vnode.dom.classList.add("fadeIn");
		Promos.GetCategoriesAndPromos()
	},
	view: function(vnode){
		return (
			<section class="animated"	>
				{m.fragment(vnode.attrs, vnode.children)}
				<section class="pv3">
					{Promos.CategoriesAndPromos.length?
					Promos.CategoriesAndPromos.map(function(catnpromo){
							{/* console.log(catnpromo) */}
							if (catnpromo.promos.length!==0){
								return (
									<div class="pv4">
										<div class="pa2">
											<strong class="fw6 f5">{catnpromo.category.name}</strong>
											<a class="fr f6 light-gray link" href={"/search?cat="+catnpromo.category.name} oncreate={m.route.link}>See all ➔ </a>
										</div>
										<div class="overflow-hidden truncate pv2">
											{catnpromo.promos.map(function(promo,i){
												return (<PromoItem promo={promo} key={i}/>)
											})}
										</div>
									</div>
								)
							}
					})
				:<div class="loader" style="color: red"></div>}
				</section>
			</section>
		);
	}
};

export default CategoriesPage;

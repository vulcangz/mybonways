import m from "mithril";
import { CategoriesModel } from "../models/categories.js";

var Categories = {
	SubmitNew: function() {
		var category = document.getElementById("categoryInput").value;
		console.log(category);
		CategoriesModel.AddCategory().then(function() {
			document.getElementById("categoryInput").value = "";
		});
	},
	oncreate: function() {
		CategoriesModel.GetCategories();
	},
	view: function() {
		var categories = CategoriesModel.Categories.map(function(category, key) {
			return (
				<div class="pa2 dib bg-gray navy br2 mh1 v-mid mv2" key={key}>
					<span class="white f4 dib v-mid">
						{category.name}
					</span>
					<span
						class="red ml3 f4 dib v-mid pa1 pointer"
						id={key}
						onclick={CategoriesModel.Delete}
					>
						x
					</span>
				</div>
			);
		});

		return (
			<section>
				<div class="pa3 bg-white shadow-m2 tc">
					<h3>Categories</h3>
				</div>
				<div class="pa3 bg-white shadow-m2 mt3 cf">
					<input
						class="pa3 w-100 db border-box mb1"
						id="categoryInput"
						oninput={m.withAttr("value", function(value) {
							CategoriesModel.NewCategory.name = value;
						})}
					/>
					<button
						class="bg-navy white-80 shadow-xs hover-shadow-m1 pv3 ph4 fr ba b--navy pointer"
						onclick={Categories.SubmitNew}
					>
						ADD
					</button>
				</div>
				<section class="pa3 bg-white shadow-m2 mt3 cf">
					{categories}
				</section>
			</section>
		);
	}
};

export default Categories;

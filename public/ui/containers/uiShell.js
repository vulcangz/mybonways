import m from "mithril";
import SearchNav from "../components/searchNav.js";
// import SearchNavLarge from '../components/SearchNavLarge.js';
import Footer from "../components/footer.js";

var UIShell = {
	view: function(vnode) {
		return (
			<section>
				{m(SearchNav, vnode.attrs)}
				<section class="tc">
					<section class="tl dib w-100 w-80-m w-70-l">
						{m.fragment(vnode.attrs, [vnode.children])}
					</section>
				</section>
				<Footer />
			</section>
		);
	}
};

export default UIShell;

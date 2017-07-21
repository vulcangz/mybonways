import m from "mithril";

var Footer = {
	oncreate: function() {},
	// Loggedin: false,
	view: vnode => {
		return (
			<section class="bg-dark-gray  cf f7">
				<div class="tc pv3 white-80 bg-black">
					<span >Copyright {new Date().getFullYear()} MyBonWays</span>
						<small class=" fr-ns db dib-ns pr2 pv2 pv0-ns"  >  made with
			      	<span class="red ph1" > ❤ </span>  by
			      	<a href="http://past3.com.ng/" class="link light-gray fw1 tracked ph1"> Past 3 Technology Studio</a>
			      </small>
				</div>
			</section>
		);
	}
};

export default Footer;

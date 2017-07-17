import m from "mithril";
import { MerchantsModel } from "../models/merchants.js";

var Merchants = {
	oncreate: function() {
		MerchantsModel.GetAllMerchants();
	},
	view: function() {
		var AllMerchants = MerchantsModel.AllMerchants.map(function(merchant, key) {
			return (
				<tr>
					<td class="pv3 pr3 bb b--black-20 tc">
						{key + 1}
					</td>
					<td class="pv3 pr3 bb b--black-20 tc">
						{merchant.company_id}
					</td>
					<td class="pv3 pr3 bb b--black-20 tc">
						{merchant.merchant_email}
					</td>
					<td class="pv3 pr3 bb b--black-20 tc">
						<a
							href={"/merchants/view/" + merchant.id}
							class="ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4"
							oncreate={m.route.link}
						>
							View
						</a>
					</td>
					<td class="pv3 pr3 bb b--black-20 tc">
						<button
							class="ba b--navy ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4"
							onclick={function() {
								MerchantsModel.DeleteMerchant(merchant.id);
							}}
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});
		// var AllMerchants = MerchantsModel.AllMerchants
		return (
			<section>
				<div class="pa3 bg-white shadow-m2 tc">
					<h3>All Merchants</h3>
				</div>
				<div class="pa3 bg-white shadow-m2 mt3 cf">
					<div class="" style="overflow: auto">
						<table class="f6 w-100 mw8 center" cellspacing="0">
							<thead class="pa2 ">
								<th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
								<th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">
									Company ID
								</th>
								<th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Email</th>
								<th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">View</th>
								<th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">
									Delete
								</th>
							</thead>
							<tbody class="lh-copy">
								{AllMerchants}
							</tbody>
						</table>
						<div>
							<div class="mt4 cf pa2 pv3">
								<a
									href="#!"
									class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline mh1 shadow-4"
									oncreate={m.route.link}
								>
									Previous
								</a>
								<a
									href="#!"
									class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline mh1 shadow-4"
									oncreate={m.route.link}
								>
									Next
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
};

export default Merchants;

import m from "mithril";
import { MerchantsModel } from "../models/merchants.js";
import format from "date-fns/format";

var ViewMerchant = {
	oncreate: function(vnode) {
		MerchantsModel.GetMerchant(vnode.attrs.id);
	},
	view: function(vnode) {
		return (
			<section>
				<div class="pa3 bg-white shadow-m2 tc">
					<h3>View Merchant</h3>
				</div>
				<div class="pa3 bg-white shadow-m2 mt3 cf">
					<div class="">
						<div class="pa2  cf">
							<strong>Company ID:</strong>{" "}
							<span class="fr">{MerchantsModel.Merchant.company_id}</span>
						</div>
						<div class="pa2  cf">
							<strong>Company Name:</strong>{" "}
							<span class="fr">{MerchantsModel.Merchant.company_name}</span>
						</div>
						<div class="pa2  cf">
							<strong>Email:</strong>{" "}
							<span class="fr underline">
								{MerchantsModel.Merchant.merchant_email}
							</span>
						</div>
						<div class="pa2  cf">
							<strong>Number of promos:</strong> <span class="fr">-</span>
						</div>
						<div class="pa2  cf">
							<strong>Number of Reservations:</strong> <span class="fr">-</span>
						</div>
						<div class="pa2  cf">
							<strong>Registeration Date:</strong>{" "}
							<span class="fr">{format(MerchantsModel.Merchant.created_at, "YYYY-MM-DD h:mm a")}</span>
						</div>
					</div>
				</div>
			</section>
		);
	}
};

export default ViewMerchant;

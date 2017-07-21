import m from "mithril";
import { UserModel } from "../models/user.js";
import { isEmptyObject } from "../../util/utils.js";
import Profile from "./profile.js";
import Footer from "../components/footer.js";

var Dashboard = {
	oncreate: () => {
		UserModel.GetReservations();
	},
	view: vnode => {
		return (
			<section >
				{m.fragment(vnode.attrs, vnode.children)}
				<div class="">
					<Profile />
				</div>
				<section class="ph2 ph5-ns pv3 pb4 cf">
					<div class="dib w-100 w-50-ns fl shadow-4 pv2">
						<div class="pa2 cf">
							<h2 class="red-custom tc fw4 ">Reserved Promos.</h2>
							{/*Reserved promos goes here.*/}
							{UserModel.Reservations.length
								? UserModel.Reservations.map((reservation, i) => {
										console.log(reservation);
										return (
											<a
												href={"/promo/" + reservation.slug}
												oncreate={m.route.link}
												class="w-100 db bb bt b--light-gray  mv1 link"
											>
												<div class=" pa2 cf">
													<p class="">
														<strong>Item: </strong>
														{reservation.item_name}
													</p>
													<p class="">
														<div class="dib w-100 w-50-ns  fl ">
															<strong>Code: </strong>
															<span class="">
																{reservation.code}
															</span>
														</div>
														<div class="dib w-100 w-50-ns fl">
															<strong>Merchant: </strong>
															<span class="">
																{reservation.cid}
															</span>
														</div>
													</p>
												</div>
											</a>
										);
									})
								: <p class="tc">You have made no Reservations yet.</p>}
						</div>
						{UserModel.Reservations.length?
						<div class="tc pv3">
							<button
								class="ba b--red-custom bg-transparent pv2 ph3"
								onclick={() => {
									{
										/*Promos.LoadMore();*/
									}
								}}
							>
								Load More
							</button>
						</div>:""}
					</div>
				</section>
			</section>
		);
	}
};

export default Dashboard;

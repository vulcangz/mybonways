import m from "mithril";
import {PromosModel} from '../models/promos.js';
import format from "date-fns/format";

var Promos = {
    oncreate: function() {
        Promos.state.loader = true;
        PromosModel.GetAll().then(function() {
            Promos.state.loader = false;
        }).catch(function() {
            Promos.state.loader = false;
        })
    },
    state: {
        loader : true
    },
    view: function() {
        return (
            <section>
				<div class="ph4 pv4 bg-white shadow-m2 ">
					<div class="">
						<span class="fw6 f3">All Promos </span>
						{/* <a
							href="/slider/new"
							class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4"
							oncreate={m.route.link}
						>
							New Slider
						</a> */}
					</div>
				</div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
                    <div class="" style="overflow: auto">
                        <table class="f6 w-100 mw8 center" cellspacing="0">
                            <thead class="pa2 ">
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Name</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">
                                    Category
                                </th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Price</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">
                                    Duration
                                </th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">
                                    Quantity
                                </th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">
                                    Actions
                                </th>
                            </thead>
                            <tbody class="lh-copy">
                            {PromosModel.AllPromos.length ?
                                PromosModel.AllPromos.map(function(promo, i) {
                                    return (
                                        <tr class="">
                                            <td class="pv3 pr3 bb b--black-20 tc">
                                                {i + 1}
                                            </td>
                                            <td class="pv3 pr3 bb b--black-20 tc">
                                                {promo.item_name}
                                            </td>
                                            <td class="pv3 pr3 bb b--black-20 tc">
                                                {promo.category}
                                            </td>
                                            <td class="pv3 pr3 bb b--black-20 tc">
                                                <span class="db">
                                                    {promo.new_price}
                                                </span>
                                                <span class="db">-</span>
                                                <span class="db strike">
                                                    {promo.old_price}
                                                </span>
                                            </td>
                                            <td class="pv3 pr3 bb b--black-20 tc">
                                                <span class="db">
                                                    {format(promo.start_date, "YYYY-MM-DD h:mm a")}
                                                </span>
                                                <span class="db">to</span>
                                                <span class="db ">
                                                    {format(promo.end_date, "YYYY-MM-DD h:mm a")}
                                                </span>
                                            </td>
                                            <td class="pv3 pr3 bb b--black-20 tc">
                                                {promo.quantity}
                                            </td>
                                            <td class="pv3 pr3 bb b--black-20 tc">
                                                <a
                                                    href={"/promos/view/" + promo.slug}
                                                    class="ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4"
                                                    oncreate={m.route.link}
                                                >
                                                    View
                                                </a>

                                                <a
                                                    href="#!"
                                                    class="ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4"
                                                    oncreate={m.route.link}
                                                >
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>);
                                    })
                                : ""}
                            </tbody>
                        </table>
                        <div class="tc">
                            {Promos.state.loader?<div class="loader" style="color: red"></div>:""}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Promos;
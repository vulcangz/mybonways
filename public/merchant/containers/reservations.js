import m from 'mithril';
import {MerchantModel} from '../models/merchant.js';
import format from 'date-fns/format';
import {Promos} from '../models/promos.js';

var Reservations = {
    oncreate: () => {
        MerchantModel.GetReservations().then(()=> {

        }).catch((error) => {
            console.log("Merchants Reservation error: ", error);
        })
    },
    view: () => {
        return (
            <section class="">
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">Promo Reservations </span>
                    </div>
                </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="" style="overflow: auto">
                        <table class="f6 w-100 mw8 center" cellspacing="0">
                            <thead class="pa2 ">
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Code</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Date</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Item Name</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Customer Email</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Edit</th>
                            </thead>
                            <tbody>
                            {MerchantModel.Reservations.length?
                            MerchantModel.Reservations.map((reservation, i) => {
                                return (
                                    <tr>
                                        <td class="pv3 pr3 bb b--black-20 tc">{i+1}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{reservation.code}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{format(reservation.created_at,"YYYY-MM-DD")}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{reservation.item_name}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{reservation.email}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">
                                            {reservation.status == "claimed"?<span class="pa1 bg-green white">claimed</span>
                                            :<button class="pa2 bg-navy white ba b--transparent br1 grow shadow-4 pointer"
                                            onclick={()=>{
                                                MerchantModel.ClaimReservation(reservation.id);
                                            }}>Claim</button>}
                                        </td>
                                    </tr>
                                )
                            })
                            :""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}

export default Reservations;

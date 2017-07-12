import m from 'mithril';
import {UserModel} from '../models/user.js';
import {isEmptyObject} from '../../util/utils.js';
import Profile from './profile.js'

var Dashboard = {
    oncreate: () => {
        UserModel.GetReservations();
    },
    view: (vnode) => {
        return (
            <section>
                {m.fragment(vnode.attrs, vnode.children)}
                <div class="fl-ns w-40-ns">
                    <Profile/>
                </div>
                <div class="pa2 fl-ns w-60-ns cf">
                    <h2 class="red-custom tc underline">Reserved Promos.</h2>
                    {/*Reserved promos goes here.*/}
                    {UserModel.Reservations.length?UserModel.Reservations.map((reservation, i) => {
                        return (
                        <a href={"/promo/" + reservation.slug} oncreate={m.route.link}>
                            <div class="fl w-30 br1 shadow-4 pa2 tc red">
                                <p class="">{reservation.item_name}</p>
                                <p class="">Code: <span class="underline">{reservation.code}</span></p>
                            </div>
                        </a>
                        )
                    }) : <p class="tc">You have no Reservation</p>}
                </div>
                <div class="tc pv3">
                    <button class="ba b--red-custom bg-transparent pv2 ph3" onclick={() => {
                            {/*Promos.LoadMore();*/}
                        }}>Load More</button>
                </div>
            </section>
        )
    }
}

export default Dashboard;
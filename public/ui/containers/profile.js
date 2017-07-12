import m from 'mithril';
import {UserModel} from '../models/user.js';
import {isEmptyObject} from '../../util/utils.js';

var Profile = {
    oncreate: () => {
        // UserModel.GetUserfromStorage();
    },
    view: (vnode) => {
        return (
            <section class="">
                {/*{m.fragment(vnode.attrs, vnode.children)}*/}
                <div class="pa2">
                    {!isEmptyObject(UserModel.User)?
                    <section class="tc">
                        <h2 class="red-custom">Profile</h2>
                        <div class="ba b--light-gray shadow-4 pv2 ph5 dib">
                            <div class="">
                                <div class="dib br-100 pa1 ba b--red shadow-2">
                                    <img src="/assets/img/user.jpg" class="w4 h4 br-100 pa1 ba bw1 b--white"/>
                                </div>
                                <div>
                                    <p class="f4">{UserModel.User.full_name}</p>
                                    <p class="underline">{UserModel.User.email}</p>
                                </div>
                                <div class="cf">
                                    <span class="">Reservations: <span class="underline">{UserModel.Reservations?UserModel.Reservations.length : "0"}</span></span>
                                </div>
                            </div>
                        </div>
                    </section> : ""}
                </div>
            </section>
        )
    }
}

export default Profile;
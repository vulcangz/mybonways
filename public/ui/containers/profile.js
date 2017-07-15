import m from 'mithril';
import {UserModel} from '../models/user.js';
import {isEmptyObject} from '../../util/utils.js';


var Profile = {
    oncreate: () => {
        // UserModel.GetUserfromStorage();
    },
    view: (vnode) => {
        return (
            <section class=" pv5">
                <div class="pa2">
                    {!isEmptyObject(UserModel.User)?
                    <section class="tc">
                        <div class="pv2  dib">
                            <div class="">
                              <div>
                                  <div class="dib br-100 pa1 ba b--red ">
                                      <img src="/assets/img/user.jpg" class="w4  h4   br-100 pa1 ba bw1 b--white"/>
                                  </div>
                                  <div>
                                      <h2 class="f2 fw6 mv2">
                                        {UserModel.User.full_name}
                                      </h2>
                                      <span class="f4 db">
                                        {UserModel.User.email}
                                      </span>
                                      <span class="db mv2 f5">
                                        Reservations:
                                        <span class="">
                                          {
                                            UserModel.Reservations?UserModel.Reservations.length : "0"
                                          }
                                        </span>
                                      </span>
                                  </div>
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

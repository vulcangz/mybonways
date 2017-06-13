import m from 'mithril';
import {UserModel} from '../models/user.js';

var SignupPage = {
  oncreate:function(vnode){
    console.log(vnode)
  },
  view: function(vnode) {
    return (
      <section>
        <section>
            <nav class="db pa2 shadow-4 fixed w-100" style="background-color:#F3F3F1">
              <div>
                <div class="dib">
                  <img src="/assets/img/logo_xs.png" class="h2 dib v-mid"/>
          			  <span class="f3 dib v-mid pl2">my<strong>Bonways</strong></span>
                </div>
                <div class="v-mid dib fr ">
                  <div class="dib ">
                    <input type="email" placeholder="email" class="input-reset ba b--black-20 db w-100 pv2 ph3"/>
                  </div>
                  <div class="dib ph1">
                    <input type="password" placeholder="password" class="input-reset ba b--black-20 db w-100 pv2 ph3"/>
                  </div>
                  <button class="pv2 ph3 bg-navy bw0 shadow grow white-80">login</button>
                </div>
              </div>
            </nav>
            <section style="background-image:url(/assets/img/merchant_login_bg.jpg)" class="vh-100 cover" >
              <section class="w-100 h-100 bg-black-60 flex flex-column justify-center items-center" >
                <section>
                  <section  class=" pa3 pa2-ns  br2 dib w-100 w-60-ns white-90 ">
                    <div>
                      <h2 class="f2 fw3">Show your deals and promos to the world. <br/> Become a merchant</h2>
                    </div>
                  </section>
                  <section class=" pa3 pa4-ns bg-white br2 dib w-100 w-40-ns ">
                    <div class="">
                      <div class="pv2">
                        <input class="input-reset ba b--black-20 db w-100 pv3 ph3" type="text" placeholder="Store Name"
                        oninput={m.withAttr("value", function(value) {
                          UserModel.signupData.company_name = value;
                        })} />
                      </div>
                      <div class="pv2">
                        <input class="input-reset ba b--black-20 db w-100 pv3 ph3" type="text" placeholder="Store ID"
                        oninput={m.withAttr("value", function(value) {
                          UserModel.signupData.company_id = value;
                        })}
                        />
                      </div>
                      <div class="pv2">
                        <input class="input-reset ba b--black-20 db w-100 pv3 ph3" type="email" placeholder="Merchant Email"
                        oninput={m.withAttr("value", function(value) {
                          UserModel.signupData.merchant_email = value;
                        })}
                        />
                      </div>
                      <div class="pv2">
                        <input class="input-reset ba b--black-20 db w-100 pv3 ph3" type="password" placeholder="Merchant Password"
                        oninput={m.withAttr("value", function(value) {
                          UserModel.signupData.merchant_password = value;
                        })}
                        />
                      </div>
                      <div class="tr pv2">
                        <button class="pv3 ph4 bg-navy white-90 bw0 shadow-4 grow" onclick={() => {
                            UserModel.Signup();
                          }}>signup</button>
                      </div>
                    </div>
                  </section>
                </section>
              </section>
            </section>
        </section>
      </section>
    );
  },
};

export default SignupPage;

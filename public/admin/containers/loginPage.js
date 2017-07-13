import m from 'mithril';
import {AdminModel} from '../models/admin.js';

var LoginPage = {
  LoginAdmin:{},
  oncreate:function(vnode){
    console.log(vnode)
  },
  state : {
    loader : false,
    LoginError: "",
  },
  ValidateLogin : () => {
    if(!LoginPage.LoginAdmin.email || !LoginPage.LoginAdmin.password) {
      LoginPage.state.LoginError = "Please all fields are required.";
      return;
    }
	LoginPage.state.loader = true;
    AdminModel.Login(LoginPage.LoginAdmin).then(() => {
		LoginPage.state.LoginError = "";
		LoginPage.state.loader = false;
		m.route.set("/")
	}).catch((error) => {
		LoginPage.state.loader = false;
		console.log("Admin Login Error: ", error);
		LoginPage.state.LoginError = "Email or password is incorrect.";
	})
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
                <div class="v-mid dib fr">
                  <div class="dib relative">
                    <a href="#" class="dib  black link v-mid mr3  pa2  relative" onclick={()=>vnode.state.showNav=!vnode.state.showNav}>login</a>
                    <div class={" right-0 buttom-0 absolute bg-white shadow-m2 pa3 br1 w5 "+(vnode.state.showNav?"db":"dn")}>
						{LoginPage.state.LoginError? m("p.bg-red-custom.white.tc.mv0.pa1", LoginPage.state.LoginError) : ""}
                        <div class="db pv1">
                          <input type="email" placeholder="email" class="input-reset ba b--black-20 db w-100 pv2 ph3"
                          oninput={m.withAttr("value", function(value) {
                            LoginPage.LoginAdmin.email = value.trim();
                          })}/>
                        </div>
                        <div class="db pv1">
                          <input type="password" placeholder="password" class="input-reset ba b--black-20 db w-100 pv2 ph3"
                          oninput={m.withAttr("value", function(value) {
                            LoginPage.LoginAdmin.password = value.trim();
                          })}/>
                        </div>
                        <div class="db tr">
                          <button class="pv2 ph3 bg-navy bw0 shadow grow white-80 pointer w4"
						  	  onclick={function(){
									{/*console.log("login clicked");*/}
									LoginPage.ValidateLogin();
                          }}>{ LoginPage.state.loader? m(".loader") : "Login"}</button>
                        </div>
                      </div>
                  </div>
                </div>

              </div>
            </nav>
            <section style="background-image:url(/assets/img/merchant_login_bg.jpg)" class="vh-100 cover" >
              <section class="w-100 h-100 bg-black-60 flex flex-column justify-center items-center" >
                <section>
                  <section  class=" pa3 pa2-ns  br2 dib w-100 w-60-ns white-90 ">
                    <div>
                      <h2 class="f2 fw3">Log into the admin dashboard</h2>
                    </div>
                  </section>
                  <section class=" pa3 pa4-ns bg-white br2 dib w-100 w-40-ns ">
                    <div class="">
						{LoginPage.state.LoginError? m("p.bg-red-custom.white.tc.mv0.pa1", LoginPage.state.LoginError) : ""}
                      <div class="pv2">
                        <input class="input-reset ba b--black-20 db w-100 pv3 ph3" type="email" placeholder="Admin Email"
                        oninput={m.withAttr("value", function(value) {
                          LoginPage.LoginAdmin.email = value.trim();
                        })}
                        />
                      </div>
                      <div class="pv2">
                        <input class="input-reset ba b--black-20 db w-100 pv3 ph3" type="password" placeholder="Admin Password"
                        oninput={m.withAttr("value", function(value) {
                          LoginPage.LoginAdmin.password = value.trim();
                        })}
                        />
                      </div>
                      <div class="tr pv2">
                        <button class="pv3 ph4 bg-navy white-90 bw0 shadow-4 grow pointer w4"
                          onclick={function(){
							  {/*console.log("login clicked");*/}
                            LoginPage.ValidateLogin();
                          }}>{ LoginPage.state.loader? m(".loader") : "Login"}</button>
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

export default LoginPage;

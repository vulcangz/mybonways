import m from "mithril";
import { MerchantModel } from "../models/merchant.js";

var SignupPage = {
	SignupMerchant: {},
	LoginMerchant: {},
	oncreate: function(vnode) {
		console.log(vnode);
	},
	state: {
		signupLoader: false,
		loginLoader: false,
		loginError: "",
		signupError: "",
		signupMessage: ""
	},
	validateLogin: function() {
		// validate input
		console.log("login: ", SignupPage.LoginMerchant);
		if (
			!SignupPage.LoginMerchant.company_id ||
			!SignupPage.LoginMerchant.merchant_email ||
			!SignupPage.LoginMerchant.merchant_password
		) {
			SignupPage.state.loginError = "Please all fields are required";
			return;
		}
		SignupPage.state.loginLoader = true;
		MerchantModel.Login(SignupPage.LoginMerchant)
			.then(function() {
				// clear the forms
				// house keeping...
				SignupPage.LoginMerchant = {};
				SignupPage.state.loginError = "";
				SignupPage.state.loginLoader = false;
			})
			.catch(function(error) {
				SignupPage.state.loginError =
					error.Error || "Username or Password is incorrect.";
				SignupPage.state.loginLoader = false;
			});
	},
	validateSignup: () => {
		if (
			!SignupPage.SignupMerchant.company_name ||
			!SignupPage.SignupMerchant.company_id ||
			!SignupPage.SignupMerchant.merchant_email ||
			!SignupPage.SignupMerchant.merchant_password
		) {
			SignupPage.state.signupMessage = "";
			SignupPage.state.signupError = "All required fields must be provided.";
			return;
		}
		SignupPage.state.signupLoader = true;
		MerchantModel.Signup(SignupPage.SignupMerchant)
			.then(function() {
				SignupPage.state.signupError = "";
				SignupPage.state.signupMessage =
					"Login to your email to verify your account.";
				SignupPage.state.signupLoader = false;
				// clear the forms
				SignupPage.SignupMerchant = {};
			})
			.catch(function(error) {
				SignupPage.state.signupMessage = "";
				SignupPage.state.signupError =
					error.Error ||
					"Could not sign you up at this moment please try again.";
				SignupPage.state.signupLoader = false;
			});
	},
	view: function(vnode) {
		return (
			<section>
				<section>
					<nav
						class="db pa2 shadow-4 fixed w-100"
						style="background-color:#F3F3F1"
					>
						<div>
							<div class="dib">
								<img src="/assets/img/logo_xs.png" class="h2 dib v-mid" />
								<span class="f3 dib v-mid pl2">
									my<strong>Bonways</strong>
								</span>
							</div>
							<div class="v-mid dib fr">
								<div class="dib relative">
									<a
										href="#"
										class="dib  black link v-mid mr3  pa2  relative"
										onclick={() => (vnode.state.showNav = !vnode.state.showNav)}
									>
										login
									</a>
									<div
										class={
											" right-0 buttom-0 absolute bg-white shadow-m2 pa3 br1 w5 " +
											(vnode.state.showNav ? "db" : "dn")
										}
									>
										{SignupPage.state.loginError
											? m(
													"p.bg-red-custom.white.pv1.w-100.mv0.tc.br2",
													SignupPage.state.loginError
												)
											: ""}
										<div class="db pv1">
											<input
												type="text"
												placeholder="company id"
												class="input-reset ba b--black-20 db w-100 pv2 ph3"
												oninput={m.withAttr("value", function(value) {
													SignupPage.LoginMerchant.company_id = value.trim();
												})}
												value={SignupPage.LoginMerchant.company_id}
											/>
										</div>
										<div class="db pv1">
											<input
												type="email"
												placeholder="email"
												class="input-reset ba b--black-20 db w-100 pv2 ph3"
												oninput={m.withAttr("value", function(value) {
													SignupPage.LoginMerchant.merchant_email = value.trim();
												})}
												value={SignupPage.LoginMerchant.merchant_email}
											/>
										</div>
										<div class="db pv1">
											<input
												type="password"
												placeholder="password"
												class="input-reset ba b--black-20 db w-100 pv2 ph3"
												oninput={m.withAttr("value", function(value) {
													SignupPage.LoginMerchant.merchant_password = value.trim();
												})}
												value={SignupPage.LoginMerchant.merchant_password}
											/>
										</div>
										<div class="db tr">
											<button
												class="pv2 ph4 bg-navy bw0 shadow grow white-80"
												onclick={function() {
													SignupPage.validateLogin();
												}}
											>
												{SignupPage.state.loginLoader ? m(".loader") : "Login"}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</nav>
					<section
						style="background-image:url(/assets/img/merchant_login_bg.jpg)"
						class="vh-100 cover"
					>
						<section class="w-100 h-100 bg-black-60 flex flex-column justify-center items-center">
							<section>
								<section class=" pa3 pa2-ns  br2 dib w-100 w-60-ns white-90 ">
									<div>
										<h2 class="f2 fw3">
											Show your deals and promos to the world. <br /> Become a
											merchant
										</h2>
									</div>
								</section>
								<section class=" pa3 pa4-ns bg-white br2 dib w-100 w-40-ns ">
									<div class="">
										{SignupPage.state.signupError
											? m(
													"p.bg-red-custom.white.pv1.w-100.mv0.tc.br2",
													SignupPage.state.signupError
												)
											: ""}
										{SignupPage.state.signupMessage
											? m(
													"p.bg-navy.white.pv1.w-100.mv0.tc.br2",
													SignupPage.state.signupMessage
												)
											: ""}
										<div class="pv2">
											<input
												class="input-reset ba b--black-20 db w-100 pv3 ph3"
												type="text"
												placeholder="Company Name"
												oninput={m.withAttr("value", function(value) {
													SignupPage.SignupMerchant.company_name = value;
												})}
												value={SignupPage.SignupMerchant.company_name}
											/>
										</div>
										<div class="pv2">
											<input
												class="input-reset ba b--black-20 db w-100 pv3 ph3"
												type="text"
												placeholder="Company ID"
												oninput={m.withAttr("value", function(value) {
													SignupPage.SignupMerchant.company_id = value.trim();
												})}
												value={SignupPage.SignupMerchant.company_id}
											/>
										</div>
										<div class="pv2">
											<input
												class="input-reset ba b--black-20 db w-100 pv3 ph3"
												type="email"
												placeholder="Merchant Email"
												oninput={m.withAttr("value", function(value) {
													SignupPage.SignupMerchant.merchant_email = value.trim();
												})}
												value={SignupPage.SignupMerchant.merchant_email}
											/>
										</div>
										<div class="pv2">
											<input
												class="input-reset ba b--black-20 db w-100 pv3 ph3"
												type="password"
												placeholder="Merchant Password"
												oninput={m.withAttr("value", function(value) {
													SignupPage.SignupMerchant.merchant_password = value.trim();
												})}
												value={SignupPage.SignupMerchant.merchant_password}
											/>
										</div>
										<div class="tr pv2">
											<button
												class="pv2 ph4 bg-navy white-90 bw0 shadow-4 grow"
												onclick={function() {
													SignupPage.validateSignup();
												}}
											>
												{SignupPage.state.signupLoader
													? m(".loader")
													: "Signup"}
											</button>
										</div>
									</div>
								</section>
							</section>
						</section>
					</section>
				</section>
			</section>
		);
	}
};

export default SignupPage;

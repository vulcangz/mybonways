import m from 'mithril';
import {search} from '../models/search.js';

var HotPromosPage = {
  oncreate:function(vnode){
    console.log(vnode)
  },
  view: function(vnode) {
    return (
      <section>
        <section>
          <div class="flex flex-row pv1 ph2">
            <div class="flex pa1 pr3">
              <a class="red-custom f3" onclick={()=>vnode.attrs.slideout.toggle()}>☰</a>
            </div>
            <div class="flex flex-row flex-auto">
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100  red-custom ">map</a>
              </div>
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100  br-pill bg-red-custom white">hot</a>
              </div>
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100 red-custom ">2 in 1</a>
              </div>
            </div>
          </div>
          <div class="pa2">
            <div class=" cf flex justify-between relative">
              <div class="dib   flex relative " style="flex:7">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                  <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;"/>
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent "  placeholder="search"/>
              </div>
              <div class="dib ml2 flex relative" style="flex:3">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                  <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;"/>
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent"  placeholder="area"
                oninput={m.withAttr("value", function(value) {
                  search.searchData = value;
                })}/>
                <span class="dib z-3 pv1 ph3 pointer bg-light-gray hover-bg-navy" style="padding-top:0.60rem" onclick={function() {
                  m.route.set("/search/"+ search.searchData);
                }}>
                  <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;"/>
                </span>
              </div>
            </div>
          </div>
          <section class="bg-white ">
            <div class="w-100 pa1">
              <img src="/assets/img/ad/5.jpg" class="w-100 br3"/>
            </div>
            <div class="pa2 ">
              <div class="dib w-50 br b--transparent">
                <img src="/assets/img/ad/1.png" class="w-100 br3 b--light-gray-custom" />
              </div><div class="dib w-50 bl b--transparent">
                <img src="/assets/img/ad/2.png" class="w-100 br3 b--light-gray-custom" />
              </div>
            </div>
          </section>
          <section class="bg-light-gray-custom pv3">
              <div class="pa2">
                <span class="dib ph2">
                  <img src="/assets/img/svg/star.svg" class="dib " style="height:0.8rem;"/>
                </span>
                <span class="red-custom dib pt1">Popular</span>
              </div>
              <div class="">
                <div class="pv1 cf">
                  <div class="dib w-50 pa1 fl" >
                    <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link" href="/promo/s" oncreate={m.route.link}>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom">
                          super mercado
                        </span>
                      </div>
                      <div class="w-100">
                        <img src="/assets/img/ad/3.png" class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1 ">Ticket to Cruise</span>
                      <div class="f8 pa1 tr cf">
                        <div class="dib w-50 fl">
                          <span class=" red-custom db fw6 f5">50%</span>
                        </div>
                        <div class="dib w-50 fl">
                          <strong class="dark-gray db">20000CFA</strong>
                          <span class="strike db">10000CFA</span>
                        </div>
                      </div>
                      <div class="f8 pa1 pv2 ">
                        <span class="pa1">
                          <img src="/assets/img/svg/like-hollow.svg" class="dib pr1" style="height:0.5rem;"/>
                          <span class="dib">200</span>
                        </span>
                        <span class="pa1">
                          <img src="/assets/img/svg/comment.svg" class="pr1" style="height:0.5rem;"/>
                          <span class="dib">12</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div class="dib w-50 pa1 fl" >
                    <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link" href="/promo/s" oncreate={m.route.link}>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom">
                          super mercado
                        </span>
                      </div>
                      <div class="w-100">
                        <img src="/assets/img/ad/3.png" class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1 ">Ticket to Cruise</span>
                      <div class="f8 pa1 tr cf">
                        <div class="dib w-50 fl">
                          <span class=" red-custom db fw6 f5">50%</span>
                        </div>
                        <div class="dib w-50 fl">
                          <strong class="dark-gray db">20000CFA</strong>
                          <span class="strike db">10000CFA</span>
                        </div>
                      </div>
                      <div class="f8 pa1 pv2 ">
                        <span class="pa1">
                          <img src="/assets/img/svg/like-hollow.svg" class="dib pr1" style="height:0.5rem;"/>
                          <span class="dib">200</span>
                        </span>
                        <span class="pa1">
                          <img src="/assets/img/svg/comment.svg" class="pr1" style="height:0.5rem;"/>
                          <span class="dib">12</span>
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="pv1 cf">
                  <div class="dib w-50 pa1 fl">
                      <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link" href="/promo/s" oncreate={m.route.link}>
                        <div class="f8 pv1 tr pa1">
                          <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                          <span class="red-custom">
                            super mercado
                          </span>
                        </div>
                        <div class="w-100">
                          <img src="/assets/img/ad/3.png" class="w-100 br2" />
                        </div>
                        <span class="f7 lh-title dib pa1 ">Ticket to Cruise</span>
                        <div class="f8 pa1 tr cf">
                          <div class="dib w-50 fl">
                            <span class=" red-custom db fw6 f5">50%</span>
                          </div>
                          <div class="dib w-50 fl">
                            <strong class="dark-gray db">20000CFA</strong>
                            <span class="strike db">10000CFA</span>
                          </div>
                        </div>
                        <div class="f8 pa1 pv2 ">
                          <span class="pa1">
                            <img src="/assets/img/svg/like-hollow.svg" class="dib pr1" style="height:0.5rem;"/>
                            <span class="dib">200</span>
                          </span>
                          <span class="pa1">
                            <img src="/assets/img/svg/comment.svg" class="pr1" style="height:0.5rem;"/>
                            <span class="dib">12</span>
                          </span>
                        </div>
                      </a>
                  </div>
                  <div class="dib w-50 pa1 fl">
                      <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link" href="/promo/s" oncreate={m.route.link}>
                        <div class="f8 pv1 tr pa1">
                          <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                          <span class="red-custom">
                            super mercado
                          </span>
                        </div>
                        <div class="w-100">
                          <img src="/assets/img/ad/3.png" class="w-100 br2" />
                        </div>
                        <span class="f7 lh-title dib pa1 ">Ticket to Cruise</span>
                        <div class="f8 pa1 tr cf">
                          <div class="dib w-50 fl">
                            <span class=" red-custom db fw6 f5">50%</span>
                          </div>
                          <div class="dib w-50 fl">
                            <strong class="dark-gray db">20000CFA</strong>
                            <span class="strike db">10000CFA</span>
                          </div>
                        </div>
                        <div class="f8 pa1 pv2 ">
                          <span class="pa1">
                            <img src="/assets/img/svg/like-hollow.svg" class="dib pr1" style="height:0.5rem;"/>
                            <span class="dib">200</span>
                          </span>
                          <span class="pa1">
                            <img src="/assets/img/svg/comment.svg" class="pr1" style="height:0.5rem;"/>
                            <span class="dib">12</span>
                          </span>
                        </div>
                      </a>
                  </div>
                </div>

              </div>
              <div class="tc pv3">
                <button class="ba b--red-custom bg-transparent pv2 ph3">load more</button>
              </div>
          </section>
        </section>
        <section class="bg-dark-gray  cf f5">
          <div class="tc pv3 white-80 bg-black">
            <span>copyright Bonways 2017</span>
          </div>
        </section>
      </section>
    );
  },
};

export default HotPromosPage;

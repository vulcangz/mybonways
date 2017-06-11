import m from 'mithril';

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
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent "  placeholder="area"/>
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
                <span>
                  <img src="/assets/img/svg/star.svg" class="dib pt1" style="height:0.8rem;"/>
                </span>
                <span class="red-custom dib pt1">Popular</span>
              </div>
              <div class="">
                <div class="pv1 cf">
                  <div class="dib w-50 pa1 fl">
                    <div class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray">
                      <div class="w-100">
                        <img src="/assets/img/ad/3.png" class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1">Ticket to Cruise and Chillz Boat Cruise</span>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom">
                          super mercado
                        </span>
                      </div>
                      <div class="f8 pa1">
                        <strong class="dark-gray">20000CFA</strong>
                        <span class="strike">10000CFA</span>
                      </div>
                      <div class="f8 pa1 pv2">
                        <span class="pa1">
                          <img src="/assets/img/svg/like-hollow.svg" class="" style="height:0.6rem;"/>
                          <span>200</span>
                        </span>
                        <span class="pa1">
                          <img src="/assets/img/svg/comment.svg" class="" style="height:0.6rem;"/>
                          <span>12</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="dib w-50 pa1 fl">
                    <div class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray">
                      <div class="w-100">
                        <img src="/assets/img/ad/2.png" class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1">Ticket to Cruise and Chillz Boat Cruise</span>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom">
                          super mercado
                        </span>
                      </div>
                      <div class="f8 pa1">
                        <strong class="dark-gray">20000CFA</strong>
                        <span class="strike">10000CFA</span>
                      </div>
                      <div class="f8 pa1 pv2">
                        <span class="pa1">
                          <img src="/assets/img/svg/like-hollow.svg" class="" style="height:0.6rem;"/>
                          <span>200</span>
                        </span>
                        <span class="pa1">
                          <img src="/assets/img/svg/comment.svg" class="" style="height:0.6rem;"/>
                          <span>12</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pv1 cf">
                  <div class="dib w-50 pa1 fl">
                    <div class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray">
                      <div class="w-100">
                        <img src="/assets/img/ad/4.jpg" class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1">Ticket to Cruise and Chillz Boat Cruise</span>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom">
                          super mercado
                        </span>
                      </div>
                      <div class="f8 pa1">
                        <strong class="dark-gray">20000CFA</strong>
                        <span class="strike">10000CFA</span>
                      </div>
                      <div class="f8 pa1 pv2">
                        <span class="pa1">
                          <img src="/assets/img/svg/like-hollow.svg" class="" style="height:0.6rem;"/>
                          <span>200</span>
                        </span>
                        <span class="pa1">
                          <img src="/assets/img/svg/comment.svg" class="" style="height:0.6rem;"/>
                          <span>12</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="dib w-50 pa1 fl">
                    <div class="br2 b--transparent gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 b--light-gray-custom">
                      <div class="w-100">
                        <img src="/assets/img/ad/5.jpg" class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1">Ticket to Cruise and Chillz Boat Cruise</span>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom">
                          super mercado
                        </span>
                      </div>
                      <div class="f8 pa1">
                        <strong class="dark-gray">20000CFA</strong>
                        <span class="strike">10000CFA</span>
                      </div>
                      <div class="f8 pa1 pv2">
                        <span class="pa1">
                          <img src="/assets/img/svg/like-hollow.svg" class="" style="height:0.6rem;"/>
                          <span>200</span>
                        </span>
                        <span class="pa1">
                          <img src="/assets/img/svg/comment.svg" class="" style="height:0.6rem;"/>
                          <span>12</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="tc pv3">
                <button class="ba b--red-custom bg-transparent pv2 ph3">load more</button>
              </div>
          </section>
        </section>
        <section class="bg-dark-gray  cf f5">
          <div class="white-80 cf pa3">
            <div class="dib w-50 fl pv3">
              <h3 class="mv1 fw6 red-custom">Company</h3>
              <a href="#" class="white-80 db link">About Us</a>
              <a href="#" class="white-80 db link">Contact Us</a>
              <a href="#" class="white-80 db link">FAQ</a>
              <a href="#" class="white-80 db link">How It Works</a>
              <a href="#" class="white-80 db link">Careers</a>
            </div>
            <div class="dib w-50 fl pv3">
              <h3 class="mv1 fw6 red-custom">Explore</h3>
              <a href="#" class="white-80 db link">About Us</a>
              <a href="#" class="white-80 db link">Contact Us</a>
              <a href="#" class="white-80 db link">FAQ</a>
              <a href="#" class="white-80 db link">How It Works</a>
              <a href="#" class="white-80 db link">Careers</a>
            </div>
            <div class="dib w-50 fl pv3" >
              <h3 class="mv1 fw6 red-custom">Contact Us</h3>
              <a href="#" class="white-80 db link">About Us</a>
              <a href="#" class="white-80 db link">Contact Us</a>
              <a href="#" class="white-80 db link">FAQ</a>
              <a href="#" class="white-80 db link">How It Works</a>
              <a href="#" class="white-80 db link">Careers</a>
            </div>
          </div>
          <div class="tc pv3 white-80 bg-black">
            <span>copyright Bonways 2017</span>
          </div>
        </section>
      </section>
    );
  },
};

export default HotPromosPage;

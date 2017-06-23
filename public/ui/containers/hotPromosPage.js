import m from 'mithril';
import {search} from '../models/search.js';
import {Promos} from '../models/promos.js';

var HotPromosPage = {
  oncreate:function(vnode){
    console.log(vnode)
    Promos.GetFeaturedPromos();
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
          </section>
          <section class="bg-light-gray-custom pv2">
              <div class="">
                <div class="pv1 cf">
                {// loop through the result here
                  Promos.FeaturedPromos.map((promo, index) => {
                    return (
                  <div class="dib w-50 pa1 fl" >
                    <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link" href={"/promo/" + promo.slug} oncreate={m.route.link}>
                      <div class="f5 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom"> Add To Cart </span>
                      </div>
                      <div class="w-100 overflow-hidden" style="max-height: 25rem;">
                        <img src={promo.featured_image || "/assets/img/ad/3.png"} class="w-100 br2" />
                      </div>
                      <span class="f3 lh-title dib pa1 ">{promo.item_name}</span>
                      <div class="f8 pa1 tr cf">
                        <div class="dib w-50 fl">
                          <span class=" red-custom db fw6 f5">
                            {(((parseInt(promo.old_price) - parseInt(promo.new_price))/parseInt(promo.old_price)) * 100).toFixed(1) }
                            % off
                          </span>
                        </div>
                        <div class="dib w-50 fl">
                          <strong class="dark-gray db">{promo.new_price}CFA</strong>
                          <span class="strike db">{promo.old_price}CFA</span>
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
                  )
                  })
                }
                </div>
              </div>
              <div class="tc pv3">
                <button class="ba b--red-custom bg-transparent pv2 ph3" onclick={() => {
                    Promos.LoadMore();
                  }}>Load More</button>
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

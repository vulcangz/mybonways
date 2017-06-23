import m from 'mithril';
import {Promos} from '../models/promos.js';

var PromoDetailPage = {
  oncreate:function(vnode){
    console.log("vnode")
    Promos.GetPromo(vnode.attrs.slug);
  },
  view: function(vnode) {
    let CurrentPromo = Promos.Promo;

    var promo_images = CurrentPromo.promo_images.split(",").map(function(pi, i){
      if (pi===""||pi===" "){
        return
      }
      return (
        <div class="dib w-50 br b--transparent">
          <img src={pi} class="w-100  b--light-gray-custom" />
        </div>
      )
    })
    return (
      <section>
        <section>
          <div class="flex flex-row pv1 ph2">
            <div class="flex pa1 pr3">
              <a class="red-custom f3" onclick={()=>vnode.attrs.slideout.toggle()}>☰</a>
            </div>
            <div class="flex flex-row flex-auto">
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100  red-custom link" href="/" oncreate={m.route.link}>map</a>
              </div>
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100  br-pill bg-red-custom white link" href="/" oncreate={m.route.link}>hot</a>
              </div>
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100 red-custom link" href="/" oncreate={m.route.link}>2 in 1</a>
              </div>
            </div>
          </div>
          <div class="pa2">
            <div class=" cf flex justify-between relative">
              <div class="dib   flex relative " style="flex:7">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                  <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;"/>
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent"  placeholder="search"/>
              </div>
              <div class="dib ml2 flex relative" style="flex:3">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                  <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;"/>
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent"  placeholder="area"/>
              </div>
            </div>
          </div>
          <section class="bg-white  dib-ns v-mid">
            <div class="dib v-mid  w-100">
              <img src={Promos.Promo.featured_image} class="w-100 "/>
            </div>
          </section>
          <section class="pv3 dib-ns f6 ph2 gray">
            <section class="pb3">
              <div class="dib fr">
                <a class="pa1 bg-transparent b--light-gray bw1 ba mh1 red-custom br2">
                  <img src="/assets/img/svg/like-block.svg" class="" style="height:0.8rem;"/>
                </a>
                <a class="pa1 bg-transparent b--light-gray bw1 ba mh1 red-custom br2">
                  <img src="/assets/img/svg/call.svg" class="" style="height:0.8rem;"/>
                </a>
                <a class="pa1 bg-transparent b--light-gray bw1 ba mh1 red-custom br2">
                  <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;"/>
                </a>
              </div>
              <div class="ph2">
                <span class="dib red-custom pv1">{Promos.Promo.item_name}</span>
                <div class="pt1">
                  <span>Original Price: </span>
                  <span>{Promos.Promo.old_price}CFA</span>
                </div>
                <div class="pt1">
                  <span>Current Price: </span>
                  <span>{Promos.Promo.new_price}CFA</span>
                </div>
              </div>
            </section>
            <section class="pv2">
              <div class="flex flex-row flex-auto bt bb b--red-custom">
                <div class="flex flex-auto  justify-center tc">
                  <a class="pa1 dib w-100  bg-red-custom white">details</a>
                </div>
                <div class="flex flex-auto  justify-center tc">
                  <a class="pa1 dib w-100  red-custom">map</a>
                </div>
                <div class="flex flex-auto  justify-center tc">
                  <a class="pa1 dib w-100 red-custom ">locations</a>
                </div>
              </div>
              <div class="pa1">
                <p> {Promos.Promo.description} </p>
                <div class=" ">
                  {promo_images}
                  {/*<div class="dib w-50 br b--transparent">
                    <img src="/assets/img/ad/1.png" class="w-100  b--light-gray-custom" />
                  </div>
                  <div class="dib w-50 bl b--transparent">
                    <img src="/assets/img/ad/2.png" class="w-100  b--light-gray-custom" />
                  </div>*/}
                </div>
              </div>
            </section>

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

export default PromoDetailPage;

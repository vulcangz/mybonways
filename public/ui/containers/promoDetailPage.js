import m from 'mithril';
import { Promos } from '../models/promos.js';

var Details = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("slideOutLeft")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => { vnode.dom.classList.add("slideInRight") },
  view: () => {
    var promo_images = Promos.Promo.promo_images.split(",").map(function (pi, i) {
      if (pi === "" || pi === " ") { return }
      return (<div class="dib w-50 br b--transparent"><img src={pi} class="w-100  b--light-gray-custom" />
      </div>)
    })
    return (<div class="animated"><p>{Promos.Promo.description}</p>
      <div class=""> {promo_images} </div> </div>)
  }
}

var Map = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("slideOutLeft")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => { vnode.dom.classList.add("slideInRight") },
  view: () => {
    return (<div class="red animated"> <p>Maps Goes Here with GPS coordinate of the branches...</p> </div>)
  }
}
var Locations = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("slideOutLeft")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => { vnode.dom.classList.add("slideInRight") },
  view: () => {
    return (<div class="red animated"> <p>Locations Goes here!</p> </div>)
  }
}

var PromoDetailPage = {
  oncreate: function (vnode) {
    console.log("vnode")
    Promos.GetPromo(vnode.attrs.slug);
  },
  tab: "Details",
  view: function (vnode) {
    let CurrentPromo = Promos.Promo;
    return (
      <section>
        <section>
          <div class="flex flex-row pv1 ph2">
            <div class="flex pa1 pr3">
              <a class="red-custom f3" onclick={() => vnode.attrs.slideout.toggle()}>☰</a>
            </div>
            <div class="flex flex-row flex-auto">
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100 br-pill red-custom link" href="/" oncreate={m.route.link}>map</a>
              </div>
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100  br-pill bg-red-custom white link" href="/" oncreate={m.route.link}>hot</a>
              </div>
              <div class="flex flex-auto  justify-center pa1 tc">
                <a class="pa1 dib w-100 br-pill red-custom link" href="/" oncreate={m.route.link}>2 in 1</a>
              </div>
            </div>
          </div>
          <div class="pa2">
            <div class=" cf flex justify-between relative">
              <div class="dib   flex relative " style="flex:7">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                  <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;" />
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent" placeholder="search" />
              </div>
              <div class="dib ml2 flex relative" style="flex:3">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                  <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;" />
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent" placeholder="area" />
              </div>
            </div>
          </div>
          <section class="cf">
            <section class="bg-white ">
              <div class="w-100 cover overflow-hidden" id="featured_image" style={"background-image:url(" + Promos.Promo.featured_image_b64 + ");min-height:150px"} oncreate={(vnode) => {

                vnode.dom.style.height = (vnode.dom.offsetWidth / 1.5) + "px"
              }}>
                <img src={Promos.Promo.featured_image} class="w-100 " />
              </div>
            </section>
            <section class="pv3 f6 ph2 gray">
              <section class="pb3">
                <div class="dib fr">
                  <a class="pa1 bg-transparent b--light-gray bw1 ba mh1 red-custom br2">
                    <img src="/assets/img/svg/like-block.svg" class="" style="height:0.8rem;" />
                  </a>
                  <a class="pa1 bg-transparent b--light-gray bw1 ba mh1 red-custom br2">
                    <img src="/assets/img/svg/call.svg" class="" style="height:0.8rem;" />
                  </a>
                  <a class="pa1 bg-transparent b--light-gray bw1 ba mh1 red-custom br2">
                    <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;" />
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
                    <button class={(PromoDetailPage.tab == "Details" ? "bg-red-custom white" : "bg-white ") + " pa1 dib w-100 ba b--transparent pointer"}
                      onclick={() => {
                        PromoDetailPage.tab = "Details";
                      }}>Details</button>
                  </div>
                  <div class="flex flex-auto  justify-center tc">
                    <button class={(PromoDetailPage.tab == "Map" ? "bg-red-custom white" : "bg-white ") + " pa1 dib w-100 ba b--transparent pointer mh1"}
                      onclick={() => {
                        PromoDetailPage.tab = "Map";
                      }}>Map</button>
                  </div>
                  <div class="flex flex-auto  justify-center tc">
                    <button class={(PromoDetailPage.tab == "Locations" ? "bg-red-custom white" : "bg-white ") + " pa1 dib w-100 ba b--transparent pointer"}
                      onclick={() => {
                        PromoDetailPage.tab = "Locations";
                      }}>Locations</button>
                  </div>
                </div>
                <div class="pa1">
                  {PromoDetailPage.tab == "Details" ? m(Details) : ""}
                  {PromoDetailPage.tab == "Map" ? m(Map) : ""}
                  {PromoDetailPage.tab == "Locations" ? m(Locations) : ""}
                  {/*<Details/>*/}
                </div>
              </section>
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

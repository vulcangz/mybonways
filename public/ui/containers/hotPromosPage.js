import m from 'mithril';
import { search } from '../models/search.js';
import { Promos } from '../models/promos.js';
import MapPromos from './mappromos.js';

var hotPromos = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("fadeOut")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => { vnode.dom.classList.add("fadeIn") },
  view: () => {
    return (
      <section class="animated">
        <section class="bg-white ">
          <div class="w-100 pa1">
            <a href="/promo/laptop-thyos" oncreate={m.route.link}><img src="/assets/img/ad/5.jpg" class="w-100 br3" /></a>
          </div>
        </section>
        <section class="bg-light-gray-custom pv2">
          <div class="">
            <div class="pv1 cf">
              {Promos.FeaturedPromos.map((promo, i) => {
                return (
                  <div class="dib w-50 pa1 fl" key={i}>
                    <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100" href={"/promo/" + promo.slug} oncreate={m.route.link}>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;" />
                        <span class="red-custom">
                          {promo.company_id}
                        </span>
                      </div>
                      <div class="w-100 cover overflow-hidden" style={"background-image:url(" + promo.featured_image_b64 + ")"} oncreate={(vnode) => {
                        vnode.dom.style.height = (vnode.dom.offsetWidth / 1.5) + "px"
                      }}>
                        <img src={promo.featured_image} class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1 ">{promo.item_name}</span>
                      <div class="f8 pa1 tr cf">
                        <div class="dib w-50 fl">
                          <span class=" red-custom db fw6 f5">{(((parseInt(promo.old_price) - parseInt(promo.new_price)) / parseInt(promo.old_price)) * 100).toFixed(1)}%</span>
                        </div>
                        <div class="dib w-50 fl">
                          <strong class="dark-gray db">{promo.new_price}CFA</strong>
                          <span class="strike db">{promo.old_price}CFA</span>
                        </div>
                      </div>
                      <div class="f8 pa1 pv2 ">
                        <span class="pa1">
                          <img src="/assets/img/svg/like-hollow.svg" class="dib pr1" style="height:0.5rem;" />
                          <span class="dib">200</span>
                        </span>
                        <span class="pa1">
                          <img src="/assets/img/svg/comment.svg" class="pr1" style="height:0.5rem;" />
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
            <button class="ba b--red-custom bg-transparent pv2 ph3">Load More</button>
          </div>
        </section>
      </section>
    )
  }
}

var HotPromosPage = {
  oncreate: function (vnode) {
    console.log(vnode)
    Promos.GetFeaturedPromos();
    let input = document.getElementById("areaInput")
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      console.log(place)

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      m.redraw()
    });
  },
  tab: "Map",
  view: function (vnode) {
    return (
      <section>
        <section>
          {m.fragment(vnode.attrs, vnode.children)}
          {m(hotPromos)}
          {/*{HotPromosPage.tab == "Map" ? m(MapPromos) : ""}
          {HotPromosPage.tab == "2in1" ? m(DoublePromos) : ""}*/}
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

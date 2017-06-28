import m from 'mithril';
import {search} from '../models/search.js';
import {Promos} from '../models/promos.js';
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
          <img src="/assets/img/ad/5.jpg" class="w-100 br3"/>
        </div>
      </section>
      <section class="bg-light-gray-custom pv2">
          <div class="">
            <div class="pv1 cf">
            {Promos.FeaturedPromos.map((promo, i) => {
                return (
                  <div class="dib w-50 pa1 fl" key={i}>
                    <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100" href={"/promo/"+promo.slug} oncreate={m.route.link}>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;"/>
                        <span class="red-custom">
                          {promo.company_id}
                        </span>
                      </div>
                      <div class="w-100 cover overflow-hidden" style={"background-image:url("+promo.featured_image_b64+")"} oncreate={(vnode)=>{
                          vnode.dom.style.height = (vnode.dom.offsetWidth/1.5)+"px"
                        }}>
                        <img src={promo.featured_image} class="w-100 br2" />
                      </div>
                      <span class="f7 lh-title dib pa1 ">{promo.item_name}</span>
                      <div class="f8 pa1 tr cf">
                        <div class="dib w-50 fl">
                          <span class=" red-custom db fw6 f5">{(((parseInt(promo.old_price) - parseInt(promo.new_price))/parseInt(promo.old_price)) * 100).toFixed(1) }%</span>
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
            <button class="ba b--red-custom bg-transparent pv2 ph3">Load More</button>
          </div>
      </section>
    </section>
    )
  }
}


var DoublePromos = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("fadeOut")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => { vnode.dom.classList.add("fadeIn") },
  view: () => {
    return (
      <section class="animated">
        <div class="red bg-gray">2 in 1 PROMOS...</div>
      </section>
    )
  }
}

var HotPromosPage = {
  oncreate:function(vnode){
    console.log(vnode)
    Promos.GetFeaturedPromos();
    let input = document.getElementById("areaInput")
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
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
  tab: "Hot",
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
                <a class={(HotPromosPage.tab == "Map" ? "bg-red-custom white" : "bg-white red-custom")+ " pa1 dib w-100 br-pill"}
                onclick={()=>{
                  console.log("clicked button: ", HotPromosPage.tab)
                  HotPromosPage.tab = "Map";
                }}>Map</a>
              </div>
              <div class="flex flex-auto justify-center pa1 tc">
                <a class={(HotPromosPage.tab == "Hot" ? "bg-red-custom white" : "bg-white red-custom")+ " pa1 dib w-100  br-pill "}
                onclick={()=>{
                  console.log("clicked button: ", HotPromosPage.tab)
                  HotPromosPage.tab = "Hot";
                }}>Hot</a>
              </div>
              <div class="flex flex-auto justify-center pa1 tc">
                <a class={(HotPromosPage.tab == "2in1" ? "bg-red-custom white" : "bg-white red-custom")+ " pa1 dib w-100 br-pill"}
                onclick={()=>{
                  console.log("clicked button: ", HotPromosPage.tab)
                  HotPromosPage.tab = "2in1";
                }}>2 in 1</a>
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
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent"  placeholder="area" id="areaInput"
                oninput={m.withAttr("value", function(value) {
                  search.searchData = value;
                })}/>
              </div>
            </div>
          </div>
          {HotPromosPage.tab == "Hot"? m(hotPromos) : ""}
          {HotPromosPage.tab == "Map"? m(MapPromos) : ""}
          {HotPromosPage.tab == "2in1"? m(DoublePromos) : ""}
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

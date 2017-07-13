import m from 'mithril';
import {search} from '../models/search.js';
import {UserModel} from '../models/user.js';
import {getCookie} from '../../util/cookie.js';
import tingle from 'tingle.js';

// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: [],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
    	return false; // nothing happens
    }
});
modal.setContent(`<div id="searcharea"></div>`);
// add another button
modal.addFooterBtn('go back', 'tingle-btn tingle-btn--danger', function() {
    // here goes some logic
    modal.close();
});
// add a button
modal.addFooterBtn('continue', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
    // here goes some logic

});
var searchbox = {
  view:function(){
    return (<div class=" cf flex justify-between relative">
        <div class="dib   flex relative " style="flex:7">
          <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
              <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;" />
          </span>
          <input type="search" class={(searchNav.searchError? " b--red " : " b--transparent ") + " w-100 pa1 ba input-reset searchinput bg-light-gray-custom"} placeholder="search"oninput={m.withAttr("value", function (value) {
                search.searchData.item = value;
              })}/>
        </div>
        <div class="dib ml2 flex relative" style="flex:3">
          <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
              <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;" />
          </span>
          <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent" placeholder="area" id="areaInput"
              oninput={m.withAttr("value", function (value) {
                search.searchData.area = value;
              })} />
        </div>
    </div>)
  }
}

var searchNav = {
  searchError: "",
  oncreate: (vnode) => {
    let input = document.getElementById("areaInput")
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      console.log(place.geometry.location)

      // check if itemname is set...
      if (!search.searchData.item) {
        // give the user instructions here...
        searchNav.searchError = "Specify an item.";
        m.redraw();
        console.log("no items name...")
        return;
      }
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log("No details available for input: '" + place.name + "'");
        return;
      }
      // do the search here
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      console.log("lat : ", lat, " lng : ", lng);
      var querystring = m.buildQueryString({q: search.searchData.item, lat: lat, lng: lng})
      searchNav.searchError = "";
      search.searchFor(search.searchData.item, lat, lng);
      m.route.set("/search?" + querystring);
      m.redraw()
    });
    // var cookie = getCookie("X-USER-TOKEN");
    // if (cookie === ""){
    //   console.log("X-USER-TOKEN: ", cookie, " user:", UserModel.User);
    // } else {
    //   console.log(cookie)
    // }
  },
  launchSearchModal:function(){
    // set content

    // open modal
    modal.open();
    m.mount(document.getElementById("SearchArea"), searchbox)
  },
  // Loggedin: false,
  view: (vnode) => {
    return (
    <section>
      <div class="flex flex-row pv1 ph2">
        <div class="flex pa1 pr3">
          <a class="red-custom f3 pointer" onclick={() => vnode.attrs.slideout.toggle()}>☰</a>
        </div>
        <div class="flex flex-row flex-auto">
          <div class="flex flex-auto  justify-center pa1 tc">
              <a href="/map" class={(m.route.get() == "/map" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>Map</a>
          </div>
          <div class="flex flex-auto justify-center pa1 tc">
              <a href="/" class={(m.route.get() == "/" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>Hot</a>
          </div>
          <div class="flex flex-auto justify-center pa1 tc">
              <a href="/2in1" class={(m.route.get() == "/2in1" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>2 in 1</a>
          </div>
        </div>
      </div>
      <div class="ph2 flex">
        <button class="bg-transparent b--transparent ma0 pa0 dib w-100" onclick={searchNav.launchSearchModal}>
            <div class=" cf flex justify-between relative">
                <div class="dib   flex relative tl" style="flex:7">
                  <span class={(searchNav.searchError? " b--red " : " b--transparent ") + " w-100  ba bg-light-gray-custom ph2 pv2" } >
                      <img src="/assets/img/svg/search.svg" class="pr2" style="height:0.7rem;" />
                    search
                  </span>
                </div>
                <div class="dib ml2 flex relative tl" style="flex:3">
                  <span class="w-100  bg-light-gray-custom bw2 b--transparent ph2 pv2" id="areaInput"
                    >
                    <img src="/assets/img/svg/location.svg" class="pr2" style="height:0.7rem;" />
                    area
                  </span>
                </div>
            </div>
          </button>
        </div>
    </section>
    )
  }
}

export default searchNav;

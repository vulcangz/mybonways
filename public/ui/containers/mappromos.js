import m from 'mithril';
import {search} from '../models/search.js';

var MapPromos = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("fadeOut")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => {
    vnode.dom.classList.add("fadeIn");
    MapPromos.getLocation();
  },
  getLocation: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(MapPromos.showPosition, (error) =>{ console.log("Error getting the position: ", error); },
      {enableHighAccuracy: true});
    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
    }
  },
  Locations: [],
  showPosition: (position) => {
    console.log(position)
    MapPromos.Position = position;
    // The nearby locations of all available branches...
    console.log("POSITION: ", position);
    // TODO:: I NEED A WILD CARD FOR THIS SEARCH...
    search.searchFor("laptop", position.coords.latitude, position.coords.longitude).then(()=>{
      MapPromos.Locations = search.mysearch.map((promo)=>{
        return {lng: promo.longitude, lat: promo.latitude}
      })
      m.redraw();
      MapPromos.DrawMap(position);
    }).catch((error) => {
      console.log("error no promos found...");
      MapPromos.DrawMap(position);
    })
  },
  DrawMap: (position) => {
    var mylocation = { lat: position.coords.latitude, lng: position.coords.longitude };
    console.log("mylocation::=> ", mylocation);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: mylocation
    });

    // get all locations near this user...
    //define locations here...
    // USING MOCK LOCATIONS TO TEST
    // var locations = [
    //   { lat: position.coords.latitude, lng: position.coords.longitude },
    //   { lat: position.coords.latitude + 0.1, lng: position.coords.longitude - 0.2 },
    //   { lat: position.coords.latitude + 0.14, lng: position.coords.longitude + 0.23 }
    // ]

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // console.log("labels check:::=> ", labels[0 % 26], ";; modulus: ", 0 % 26)
    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = MapPromos.Locations.map(function (location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });
    // ADD THE USERS LOCATION TO THE MARKERS...
    markers.push(new google.maps.Marker({
        position: mylocation,
        label: "Me"
      }))
    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    // var placeService = new google.maps.places.PlacesService(map);
    // var marker = new google.maps.Marker({
    //   map: map,
    //   position: mylocation
    // });
  },
  Position: {},
  view: () => {
    return (
      <section class="animated">
        <div class="cf shadow-4 pa2">
          <div class="fl w-100 w-50-ns cf">
            <p class="mv0 pa2 tc white bg-red">List Of all branches...</p>
            {search.mysearch.map(function(promo, i) {
                return (
                  <div class="dib w-50 pa1 fl" key={i}>
                    <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100" href={"/promo/"+promo.slug} oncreate={m.route.link}>
                      <div class="f8 pv1 tr pa1">
                        <img src="/assets/img/svg/cart.svg" style="height:0.6rem;" class="pr1"/>
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
              })}
          </div>
          <div class="fl w-50 db-ns dn ph3">
            <div class="shadow-4">
              <p class="bg-red tc white br--top mv0 pv2">Maps of nearby branches...</p>
              <div id="map" class="vh-50 w-100 bg-gray"></div>
            </div>
          </div>
        </div>
        <div class="fixed top-0 dn">
          <button class="ba b--red br--left bg-red white pa1" onclick={()=>{
            // set either the branches view or map view to show...
          }}>Map</button>
          <button class="ba b--red br--right bg-red white pa1" onclick={()=>{
            // set either the branches view or map view to show...
          }}>Promos</button>
        </div>
      </section>
    )
  }
}

export default MapPromos;
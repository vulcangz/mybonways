import m from 'mithril';

var MapPromos = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("slideOutUp")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => {
    vnode.dom.classList.add("slideInUp");
    MapPromos.getLocation();
  },
  getLocation: () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(MapPromos.showPosition);
      } else {
          //x.innerHTML = "Geolocation is not supported by this browser.";
      }
  },
  showPosition: (position) => {
      console.log(position)
      MapPromos.Position = position;
      m.redraw()
      var mylocation = {lat: position.coords.latitude, lng: position.coords.longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: mylocation
      });
      var placeService = new google.maps.places.PlacesService(map);
  },
  Position:{},
  view: () => {
    return (
      <section class="animated pa2">
        <div class="red cf shadow-4">
          <div class="fl w-50">
            <p>Map Of all branches...</p>
          </div>
          <div class="fl w-50">
            Google maps goes here...
            <div id="map" class="vh-50 w-100 bg-gray"></div>
          </div>
        </div>
      </section>
    )
  }
}

export default MapPromos;
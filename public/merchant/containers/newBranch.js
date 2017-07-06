import m from "mithril";
import {branch} from "../models/branches.js";
import {MerchantModel} from '../models/merchant.js';
import {Locations} from '../models/locations.js';

var NewBranch = {
    state:{
      place:{},
      loader : false,
      NewBranchError : "",
      NewBranchMessage: ""
    },
    oncreate:function(){
      // get the available locations
      Locations.GetCountries();

      let card = document.getElementById("map-controls")
      let input = document.getElementById("mapsAutocomplete")

      var uluru = {lat: 4.023368, lng: 9.700488};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
      });

      var placeService = new google.maps.places.PlacesService(map);

      // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });

      map.addListener('click', function(e) {
        marker.setPosition(e.latLng);
        marker.setVisible(true);
        map.panTo(e.latLng);
        placeService
      });

      autocomplete.addListener('place_changed', function() {
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          NewBranch.state.place = place;

          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            console.log("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          console.log(place)
          m.redraw()
        });

    },
    AddBranch: () => {
      if (!branch.NewBranch.address || !branch.NewBranch.country || !branch.NewBranch.city
      || !branch.NewBranch.neighbourhood || !branch.NewBranch.longitude || !branch.NewBranch.latitude) {
        NewBranch.state.NewBranchMessage = "";
        NewBranch.state.NewBranchError = "All field must be filled correctly.";
		    window.scrollTo(0, 100);
        return;
      }
      NewBranch.state.loader = true;
      branch.SaveNewBranch().then(() => {
			NewBranch.state.loader = false;
			NewBranch.state.NewBranchError = "";
			NewBranch.state.NewBranchMessage = "New Branch Added.";
			window.scrollTo(0, 100);
		}).catch((error) => {
			NewBranch.state.loader = false;
        	console.log("New Branch Error: ", error);
        	NewBranch.state.NewBranchError = "Could not add this branch. Please try again.";
			window.scrollTo(0, 100);
		})
    },
    view: function() {
      let {place} = NewBranch.state;
      place.address = '';
      if (place.address_components) {
        place.address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      branch.NewBranch.latitude = 0.00
      branch.NewBranch.longitude = 0.00
      if (place.geometry){
        branch.NewBranch.latitude = place.geometry.location.lat()
        branch.NewBranch.longitude = place.geometry.location.lng()

      }
      return (
          <section class="">
              <div class="ph4 pv4 bg-white shadow-m2 ">
                  <div class="">
                      <span  class="fw6 f3">New Branch </span>
                  </div>
              </div>
              <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">

                <div>
                  {NewBranch.state.NewBranchError ? m('p.white.bg-red.pa1.mv0.tc', NewBranch.state.NewBranchError):""}
                  {NewBranch.state.NewBranchMessage ? m('p.white.bg-navy.pa1.mv0.tc', NewBranch.state.NewBranchMessage):""}
                  <div id="map-controls">
                    <input  type="text" placeholder="Enter a location" id="mapsAutocomplete" class="ph3 pv2 w-100"/>
                  </div>
                  <div id="map" class="vh-50 w-100 bg-gray"></div>
                </div>
                <div>
                  <h4>Selected Location</h4>
                  <div>
                    <strong>Name: </strong>
                    <span>{place.name}</span>
                  </div>
                  <div>
                    <strong>Latitute: </strong>
                    <span>{branch.NewBranch.latitude}</span>
                  </div>
                  <div>
                    <strong>Longitude: </strong>
                    <span>{branch.NewBranch.longitude}</span>
                  </div>
                </div>
                <div class="pa2">
                    <label class="f4 gray pv2 dib">Address:</label><br></br>
                    <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                    oninput={m.withAttr("value", function(value) {
                        branch.NewBranch.address = value;
                    })} />
                </div>
                <div class="pa2">
                    <label class="f4 gray pv2 dib">Country:</label><br></br>
                    <select class="pa2 ba b--gray bg-white"
                    onchange={(e) => {
                      console.log("E: ", e.target.value)
                      branch.NewBranch.country = e.target.value;
                      // go and retrieve the cities for this country:
                      Locations.GetCities(e.target.value)
                    }}>
                      <option disabled selected>-- Select Country --</option>
                      {Locations.AllCountries.map((location) => {
                        return (
                          <option value={location.country}>{location.country}</option>
                        )
                      })}
                    </select>
                </div>
                <div class="pa2">
                    <label class="f4 gray pv2 dib">City:</label><br></br>
                    <select class="pa2 ba b--gray bg-white"
                    onchange={(e)=>{
                      console.log("E:",e);
                      branch.NewBranch.city = e.target.value;
                      // go and retrieve the neighbourhoods for this city and country
                      Locations.GetNeighbourhoods();
                    }}>
                      <option disabled selected>{Locations.AllCities.length?"-- Select City --":"Select country first"}</option>
                      {Locations.AllCities.map((city)=>{
                        return (<option value={city.city}>{city.city}</option>)
                      })}
                    </select>
                </div>
                <div class="pa2">
                    <label class="f4 gray pv2 dib">Neighbourhood:</label><br></br>
                    <select class="pa2 ba b--gray bg-white"
                    onchange={(e)=>{
                      branch.NewBranch.neighbourhood = e.target.value;
                    }}>
                      <option disabled selected>{Locations.AllNeighbourhoods.length?"-- Select Neighbourhood --":"select a city first"}</option>
                      {Locations.AllNeighbourhoods.map((neighbourhood)=>{
                        return (<option value={neighbourhood.neighbourhood}>{neighbourhood.neighbourhood}</option>)
                      })}
                    </select>
                </div>

                <div class="pa2  pv3 mt2 tr">
                    <button  class=" pa2 bg-navy white-90 grow pointer no-underline shadow-4 bw0 w4 " onclick={function() {
                        // set company id before submission
                        branch.NewBranch.company_id = MerchantModel.Merchant.company_id;
                        branch.NewBranch.location.company_id = MerchantModel.Merchant.company_id;
                        NewBranch.AddBranch();
                    }}>{ NewBranch.state.loader ? m(".loader") : "Submit Branch"}</button>
                </div>
              </div>
          </section>
      )
    }
}

export default NewBranch;

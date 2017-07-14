import m from 'mithril';
import {LocationModel} from '../models/locationmodel.js';

var Locations = {
    VerifyNewLocation:() => {
        if(!LocationModel.NewLocation.country || !LocationModel.NewLocation.city || !LocationModel.NewLocation.neighbourhood) {
            Locations.state.NewLocationMessage = "";
            Locations.state.NewLocationError = "Please fill out all required fields.";
            return;
        }
        Locations.state.Loader = true;
        LocationModel.AddLocation().then(()=>{
            Locations.state.NewLocationError = "";
            Locations.state.NewLocationMessage = "New Location Added.";
            Locations.state.Loader = false;
            LocationModel.NewLocation = {};
            m.redraw();
        }).catch((error) => {
            console.error("Add location error: ", error);
            Locations.state.NewLocationMessage = "";
            Locations.state.NewLocationError = "Could not add this location. Maybe it already exists.";
            Locations.state.Loader = false;
        })
    },
    state: {
        Loader: false,
        NewLocationError: "",
        NewLocationMessage: ""
    },
    oncreate: () => {
        LocationModel.GetCountries();
    },
    view: (vnode) => {
        return (
            <section>
                <div class="pa3 bg-white shadow-m2 tc">
                    <h3>Add Locations</h3>
                </div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
                    {Locations.state.NewLocationError?m("p.pa1.bg-red-custom.mv0.white.w5.br1.tc", Locations.state.NewLocationError):""}
                    {Locations.state.NewLocationMessage?m("p.pa1.bg-navy.mv0.white.w5.br1.tc", Locations.state.NewLocationMessage):""}
                    <div class="">
                        <input type="text" placeholder="Country" class="pa2 ba b--gray w5 bw1 mv1"
                        oninput={m.withAttr("value", function(value){
                                LocationModel.NewLocation.country = value;
                            })}
                            value={LocationModel.NewLocation.country}/><br/>
                        <input class="pa2 ba b--gray w5 bw1 mv1" placeholder="City"
                        oninput={m.withAttr("value", function(value){
                                LocationModel.NewLocation.city = value;
                            })}
                            value={LocationModel.NewLocation.city}/><br/>
                        <input class="pa2 ba b--gray w5 bw1 mv1" placeholder="Neigbourhood"
                        oninput={m.withAttr("value", function(value){
                                LocationModel.NewLocation.neighbourhood = value;
                            })}
                            value={LocationModel.NewLocation.neighbourhood} /><br/>
                        <button type="button" class="ba b--navy bg-navy pv2 ph4 white shadow-3 pointer mv1" onclick={() => {
                                console.log("Add Location clicked");
                                Locations.VerifyNewLocation();
                            }}>{Locations.state.Loader?m(".loader.mv0"):"Add Location"}</button>
                    </div>
                </div>
                <section class="pa3 bg-white shadow-m2 mt3 cf" >
                    <h2 class="mv1 bb b--light-gray tc pb1">All Locations</h2>
                    <div class="bb b--light-gray pv2">
                        <div class="w-third-ns pa1 dib-ns">
                            <select class="pa2 ba w-100"
                            onchange={(e) => {
                                console.log("E: ", e.target.value)
                                LocationModel.LocationUpdate.country = e.target.value;
                                document.getElementById("new_country").value = e.target.value;
                                // go and retrieve the cities for this country:
                                LocationModel.GetCities(e.target.value)
                            }}>
                                <option disabled selected>- All Countries -</option>
                                {LocationModel.AllCountries.length?LocationModel.AllCountries.map((location, i) => {
                                    return (
                                        <option value={location.country}>{location.country}</option>
                                    )
                                }):""}
                            </select>
                        </div>
                        <div class="w-third-ns pa1 dib-ns">
                            <select class="pa2 ba w-100"
                            onchange={(e) => {
                                console.log("E: ", e.target.value)
                                LocationModel.LocationUpdate.city = e.target.value;
                                document.getElementById("new_city").value = e.target.value;
                                // go and retrieve the Neighbourhood for this city:
                                LocationModel.GetNeighbourhoods()
                            }}>
                                <option disabled selected>- Cities -</option>
                                {LocationModel.AllCities.length?LocationModel.AllCities.map((location, i) => {
                                    return (
                                        <option value={location.city}>{location.city}</option>
                                    )
                                }):""}
                            </select>
                        </div>
                        <div class="w-third-ns pa1 dib-ns">
                            <select class="pa2 ba w-100"
                            onchange={(e) => {
                                LocationModel.LocationUpdate.neighbourhood = e.target.value;
                                document.getElementById("new_neighbourhood").value = e.target.value;
                            }}>
                                <option disabled selected>- Neighbourhoods -</option>
                                {LocationModel.AllNeighbourhoods.length?LocationModel.AllNeighbourhoods.map((location, i) => {
                                    return (
                                        <option value={location.neighbourhood}>{location.neighbourhood}</option>
                                    )
                                }):""}
                            </select>
                        </div>
                    </div>
                    <div class="">
                        <div class="w-third-ns pa1 dib-ns">
                            <input type="text" id="new_country" class="pa2 ba b--light-silver w-100" placeholder=""
                            oninput={m.withAttr("value", (value) =>{
                                LocationModel.NewLocationUpdate.country = value;
                                console.log("country: ", LocationModel.NewLocationUpdate.country);
                            })}/>
                            <div class="tc pv2">
                                <button class="bg-navy white ba b--transparent br1 shadow-4 pa2 pointer"
                                onclick={() => {
                                    console.log("Update location.");
                                    LocationModel.UpdateCountry();
                                }}>Update Country</button>
                            </div>
                        </div>
                        <div class="w-third-ns pa1 dib-ns">
                            <input type="text" id="new_city" class="pa2 ba b--light-silver w-100" placeholder=""
                            oninput={m.withAttr("value", (value) =>{
                                LocationModel.NewLocationUpdate.city = value;
                                console.log("city: ", LocationModel.NewLocationUpdate.city);
                            })}/>
                            <div class="tc pv2">
                                <button class="bg-navy white ba b--transparent br1 shadow-4 pa2 pointer"
                                onclick={() => {
                                    console.log("Update location.");
                                    LocationModel.UpdateCity().then(() => {
                                        console.log("city updated")
                                    }).catch((error) => {
                                        console.log("update city error: ", error);
                                    })
                                }}>Update City</button>
                            </div>
                        </div>
                        <div class="w-third-ns pa1 dib-ns">
                            <input type="text" id="new_neighbourhood" class="pa2 ba b--light-silver w-100" placeholder=""
                            oninput={m.withAttr("value", (value) =>{
                                LocationModel.NewLocationUpdate.neighbourhood = value;
                                console.log("neighbourhood: ", LocationModel.NewLocationUpdate.neighbourhood);
                            })}/>
                            <div class="tc pv2">
                                <button class="bg-navy white ba b--transparent br1 shadow-4 pa2 pointer"
                                onclick={() => {
                                    console.log("Update location.");
                                    LocationModel.UpdateNeighbourhood();
                                }}>Update Neighbourhood</button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

export default Locations;

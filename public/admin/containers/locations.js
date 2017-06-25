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
    view: (vnode) => {
        return (
            <section>
                <div class="pa3 bg-white shadow-m2 tc">
                    <h3>Add Locations</h3>
                </div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
                    {Locations.state.NewLocationError?m("p.pa1.bg-red.mv0.white.w5.br1.tc", Locations.state.NewLocationError):""}
                    {Locations.state.NewLocationMessage?m("p.pa1.bg-navy.mv0.white.w5.br1.tc", Locations.state.NewLocationMessage):""}
                    <div class="">
                        {/*<label class="f4 mv2">Country: </label><br/>*/}
                        <input type="text" placeholder="Country" class="pa2 ba b--gray w5 bw1 mv1"
                        oninput={m.withAttr("value", function(value){
                                LocationModel.NewLocation.country = value;
                            })}/><br/>
                        {/*<label class="f4 mv2">City: </label><br/>*/}
                        <input class="pa2 ba b--gray w5 bw1 mv1" placeholder="City"
                        oninput={m.withAttr("value", function(value){
                                LocationModel.NewLocation.city = value;
                            })}/><br/>
                        {/*<label class="f4 mv2">Neighbourhood: </label><br/>*/}
                        <input class="pa2 ba b--gray w5 bw1 mv1" placeholder="Neigbourhood"
                        oninput={m.withAttr("value", function(value){
                                LocationModel.NewLocation.neighbourhood = value;
                            })} /><br/>
                        <button type="button" class="ba b--navy bg-navy pv2 ph4 white shadow-3 pointer mv1" onclick={() => {
                                console.log("Add Location clicked");
                                Locations.VerifyNewLocation();
                            }}>{Locations.state.Loader?m(".loader.mv0"):"Add Location"}</button>
                    </div>
                </div>
                <section class="pa3 bg-white shadow-m2 mt3 cf" >
                    {}
                </section>
            </section>
        )
    }
}

export default Locations;
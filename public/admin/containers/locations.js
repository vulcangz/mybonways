import m from 'mithril';
import {LocationModel} from '../models/locationmodel.js';

var Locations = {
    view: (vnode) => {
        return (
            <section>
                <div class="pa3 bg-white shadow-m2 tc">
                    <h3>Add Locations</h3>
                </div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
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
                        <button type="button" class="ba b--navy bg-navy pa2 white shadow-3 pointer mv1" onclick={() => {
                                console.log("Add Location clicked");
                                LocationModel.AddLocation();
                            }}>Add Location</button>
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
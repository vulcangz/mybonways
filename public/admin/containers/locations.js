import m from 'mithril';
import LocationModel from '../models/locationmodel.js';

var Locations = {
    view: (vnode) => {
        return (
            <section>
                <div class="pa3 bg-white shadow-m2 tc">
                    <h3>Add Locations</h3>
                </div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
                    <div class="">
                        <label class="f4">Country: </label><br/>
                        <input type="text" placeholder="Country" class="pa2 ba b--gray w5 bw1 mr2-ns mv1 mv0-ns"
                        oninput={m.withAttr("value", function(value){
                                LocationModel.NewCountry.name = value;
                            })}/>
                        <button type="button" class="ba b--navy bg-navy pa2 white shadow-3 ml2-ns pointer mv1 mv0-ns" onclick={() => {
                                console.log("Add Country clicked");
                                LocationModel.AddCountry();
                            }}>Add Country:</button>
                    </div><br/>
                    <hr class="light"/>
                    <br/>
                    <div class="">
                        <select class="pa2 bg-white ba b--gray mr2-ns mb1">
                            <option disabled selected>-- Select Country --</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Nigeria">Nigeria</option>
                        </select><br/>
                        <input class="pa2 ba b--gray w5 bw1" placeholder="City" />
                        <button type="button" class="ba b--navy bg-navy pa2 white shadow-3 ml2-ns pointer mv1 mv0-ns" onclick={() => {
                                console.log("Add City clicked");
                                {/*LocationModel.AddCity();*/}
                            }}>Add City:</button>
                    </div><br/>
                    <hr class="light"/>
                    <br/>
                    <div class="">
                        <select class="pa2 bg-white ba b--gray mr2-ns mv1">
                            <option disabled selected>-- Select Country --</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Nigeria">Nigeria</option>
                        </select>
                        <select class="pa2 bg-white ba b--gray mr2-ns mv1">
                            <option disabled selected>-- Select City --</option>
                            <option value="Cameroon">City one</option>
                            <option value="Nigeria">City two</option>
                        </select><br/>
                        <input class="pa2 ba b--gray w5 bw1" placeholder="Neigbourhood" />
                        <button type="button" class="ba b--navy bg-navy pa2 white shadow-3 ml2-ns pointer mv1 mv0-ns" onclick={() => {
                                console.log("Add neigbour hood clicked");
                                {/*LocationModel.AddNeighbourhood();*/}
                            }}>Add Neighbourhood:</button>
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
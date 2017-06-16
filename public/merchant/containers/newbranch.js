import m from "mithril";
import {br} from "../models/branches.js";
import {MerchantModel} from '../models/merchant.js';

var NewBranch = {
    view: function() {
        return (
            <section class="">
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">New Branch </span>
                    </div>
                </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Address:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.NewBranch.address = value;
                        })} />
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">City:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.NewBranch.city = value;
                        })} />
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">State:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.NewBranch.state = value;
                        })} />
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Country:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.NewBranch.country = value;
                        })} />
                    </div>
                    <h4>Location Area</h4>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Area:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.NewBranch.location.area = value;
                        })} />
                    </div>

                    <div class="pa2  pv3 mt2 tr">
                        <button  class=" ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4 bw0 " onclick={function() {
                            // set company id before submission
                            br.NewBranch.company_id = MerchantModel.Merchant.company_id;
                            br.NewBranch.location.company_id = MerchantModel.Merchant.company_id;
                            br.SaveNewBranch();
                        }}>Submit Branch</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default NewBranch;
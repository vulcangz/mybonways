import m from 'mithril';
import {br} from "../models/branches.js";

var EditBranch = {
    oninit: function(vnode) {
        br.GetBranch(vnode.attrs.id);
        console.log("oninit callled")
    },
    view: function(vnode) {
        return (
            <section class="">
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">Edit This Branch </span>
                    </div>
                </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Address:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.editBranch.address = value;
                        })}
                        value={br.editBranch.address} />
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">City:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.editBranch.city = value;
                        })}
                        value={br.editBranch.city} />
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">State:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.editBranch.state = value;
                        })}
                        value={br.editBranch.state} />
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Country:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.editBranch.country = value;
                        })}
                        value={br.editBranch.country} />
                    </div>
                    <h4>Location Area</h4>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Area:</label><br></br>
                        <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                        oninput={m.withAttr("value", function(value) {
                            br.editBranch.location.area = value;
                        })}
                        value={br.editBranch.area} />
                    </div>

                    <div class="pa2  pv3 mt2 tr">
                        <button  class=" ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4 bw0 " onclick={function() {
                            br.UpdateBranch();
                        }}>Update Branch</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default EditBranch;
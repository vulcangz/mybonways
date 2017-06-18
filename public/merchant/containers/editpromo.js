import m from 'mithril';
import {Promos} from "../models/promos.js";

var EditPromo = {
    oninit: function(vnode) {
        EditPromo.p = Promos.AllPromos[vnode.attrs.id]
        // redirect if there is no value...
    },
    updatebutton: true,
    AddPreview: function(e) {
        EditPromo.updatebutton = false;
        var image = document.getElementById("feature_image").files[0];
        // var preview = document.getElementById("preview");

        function readAndPreview() {
            // Make sure `file.name` matches our extensions criteria
            if ( /\.(jpe?g|png|gif)$/i.test(image.name) ) {
                var reader = new FileReader();

                reader.addEventListener("load", function (f) {
                    // preview.src = this.result;
                    EditPromo.p.feature_image = this.result;
                    console.log(EditPromo.p);
                }, false);

                reader.readAsDataURL(image);
            }
        }

        if(image) {
            readAndPreview();
        }
    },
    view: function(vnode) {
        // var p = Promos.AllPromos[vnode.attrs.id];
        return (
            <section>
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">Edit Promo </span>
                    </div>
                </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="">
                        <img class=""  id="preview" width="100%" src={EditPromo.p.feature_image?EditPromo.p.feature_image:"/assets/img/800x450.png"} alt=""/>
                    </div>
                    <div class="w-100 tc mv3">
                        <label for="feature_image" class="mv3 ba b--navy white pointer bg-navy pv2 ph3 w-100">
                            Add A feature Image
                            <input type="file" id="feature_image" class="dn"
                            onchange={m.withAttr("files",EditPromo.AddPreview)}/>
                        </label>
                    </div>

                    <div class="">
                        <p class="pa2 bt b--gray cf">Item Name: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.Name}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.item_name = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Category: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.Category}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.category = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">New Price: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.NewPrice}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.new_price = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Old Price: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.OldPrice}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.old_price = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Start Date: <input type="date" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.StartDate}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.start_date = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">End Date: <input type="date" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.EndDate}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.end_date = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Description: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.EndDate}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.description = val;
                        })}/></p>
                    </div>
                    <button class={EditPromo.updatebutton?"dn":" ba b--navy white pointer bg-navy pv2 ph3 w-100"}
                    onclick={function() {
                        Promos.Update(EditPromo.p);
                    }}> UPDATE</button>
                </div>
            </section>
        )
    }
}

export default EditPromo;
import m from 'mithril';
import {Promos} from "../models/promos.js";

import format from 'date-fns/format';

var EditPromo = {
    oninit: function(vnode) {
        console.log("init editpromo")
        if(Promos.AllPromos.length < 1) {
            console.log("No promos");
            m.route.set("/promos/");
            return;
        }
        for (var j = 0; j < Promos.AllPromos.length; j++){
            if (Promos.AllPromos[j].slug == vnode.attrs.slug){
                EditPromo.p = Promos.AllPromos[j];
                return;
            }
        }
        // if none of the return is called then there is no promo to edit...
        m.route.set("/promos/");
    },
    updatebutton: true,
    AddPreview: function(e) {
        EditPromo.updatebutton = false;
        var image = document.getElementById("feature_image").files[0];
        var preview = document.getElementById("preview");

        function readAndPreview() {
            // Make sure `file.name` matches our extensions criteria
            if ( /\.(jpe?g|png|gif)$/i.test(image.name) ) {
                var reader = new FileReader();

                reader.addEventListener("load", function (f) {
                    // preview.src = this.result;
                    EditPromo.p.featured_image = this.result;
                    preview.src = this.result;
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
        // var p = Promos.AllPromos[vnode.attrs.id];\
        if (typeof EditPromo.p == 'undefined') {
            return
        }
        return (
            <section>
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">Edit Promo </span>
                    </div>
                </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="">
                        <img class="" id="preview" width="100%" src={!EditPromo.p.featured_image_b64 || EditPromo.p.featured_image_b64 == 'null'?"/assets/img/800x450.png":EditPromo.p.featured_image_b64} alt=""/>
                    </div>
                    <div class="w-100 tc mv3">
                        <label for="feature_image" class="mv3 ba b--navy white pointer bg-navy pv2 ph3 w-100">
                            Add A feature Image
                            <input type="file" id="feature_image" class="dn"
                            onchange={m.withAttr("files",EditPromo.AddPreview)}/>
                        </label>
                    </div>

                    <div class="">
                        <p class="pa2 bt b--gray cf">Item Name: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.item_name}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.item_name = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Category: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.category}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.category = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">New Price: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.new_price}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.new_price = parseInt(val, 10);
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Old Price: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.old_price}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            EditPromo.p.old_price = parseInt(val, 10);
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Start Date: <input type="date" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.start_date}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            console.log(format(val, "YYYY-MM-DD"))
                            EditPromo.p.start_date = format(val, "YYYY-MM-DD");
                        })}/></p>
                        <p class="pa2 bt b--gray cf">End Date: <input type="date" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.end_date}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.updatebutton = false;
                            console.log(format(val, "YYYY-MM-DD"))
                            EditPromo.p.end_date = format(val, "YYYY-MM-DD");
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Description: <input type="text" class="pa2 ba b--gray ml2 fr" value={EditPromo.p.description}
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

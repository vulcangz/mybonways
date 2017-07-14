import m from 'mithril';
import {Promos} from "../models/promos.js";
import format from 'date-fns/format';
import Flatpickr from 'flatpickr';
import confirmDatePlugin from 'flatpickr/src/plugins/confirmDate/confirmDate.js'

var EditPromo = {
    state: {
        updatebutton: true,
        startDate: {},
        endDate: {},
        loader: false
    },
    AddPreview: function(e) {
        EditPromo.state.updatebutton = false;
        var image = document.getElementById("feature_image").files[0];
        var preview = document.getElementById("preview");

        function readAndPreview() {
            // Make sure `file.name` matches our extensions criteria
            if ( /\.(jpe?g|png|gif)$/i.test(image.name) ) {
                var reader = new FileReader();

                reader.addEventListener("load", function (f) {
                    // preview.src = this.result;
                    Promos.CurrentPromo.featured_image = this.result;
                    preview.src = this.result;
                    console.log(Promos.CurrentPromo);
                }, false);

                reader.readAsDataURL(image);
            }
        }

        if(image) {
            readAndPreview();
        }
    },
    oncreate: (vnode) => {
        Promos.GetPromo(vnode.attrs.slug).then(() => {
            console.log("current promo: ", Promos.CurrentPromo)
            const datePickerBeginInput = document.getElementById("beginDate");
            const datePickerEndInput = document.getElementById("endDate");

            EditPromo.state.startDate = new Flatpickr(datePickerBeginInput, {
                "enableTime": true,
                defaultDate: [format(Promos.CurrentPromo.start_date, "YYYY-MM-DD h:mm a")],
                "plugins": [new confirmDatePlugin({})]
            });  // Flatpickr
            EditPromo.state.endDate = new Flatpickr(datePickerEndInput, {
                "enableTime": true,
                defaultDate: [format(Promos.CurrentPromo.end_date, "YYYY-MM-DD h:mm a")],
                "plugins": [new confirmDatePlugin({})]
            });
            document.getElementById("beginDate").value = format(Promos.CurrentPromo.start_date, "YYYY-MM-DD h:mm a");
            document.getElementById("endDate").value = format(Promos.CurrentPromo.end_date, "YYYY-MM-DD h:mm a");
        })
    },
    view: function(vnode) {
        // var p = Promos.AllPromos[vnode.attrs.id];\
        // if (typeof EditPromo.p == 'undefined') {
        //     return
        // }
        return (
            <section>
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">Edit Promo </span>
                    </div>
                </div>
                {Promos.CurrentPromo?
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="">
                        <img class="" id="preview" width="100%" src={!Promos.CurrentPromo.featured_image_b64 || Promos.CurrentPromo.featured_image_b64 == 'null'?"/assets/img/800x450.png":Promos.CurrentPromo.featured_image_b64} alt=""/>
                    </div>
                    <div class="w-100 tc mv3">
                        <label for="feature_image" class="mv3 ba b--navy white pointer bg-navy pv2 ph3 w-100">
                            Add A feature Image
                            <input type="file" id="feature_image" class="dn"
                            onchange={m.withAttr("files",EditPromo.AddPreview)}/>
                        </label>
                    </div>

                    <div class="">
                        <p class="pa2 bt b--gray cf">Item Name: <input type="text" class="pa2 ba b--gray ml2 fr" value={Promos.CurrentPromo.item_name}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.state.updatebutton = false;
                            Promos.CurrentPromo.item_name = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Category: <input type="text" class="pa2 ba b--gray ml2 fr" value={Promos.CurrentPromo.category}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.state.updatebutton = false;
                            Promos.CurrentPromo.category = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">New Price: <input type="text" class="pa2 ba b--gray ml2 fr" value={Promos.CurrentPromo.new_price}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.state.updatebutton = false;
                            Promos.CurrentPromo.new_price = parseInt(val, 10);
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Old Price: <input type="text" class="pa2 ba b--gray ml2 fr" value={Promos.CurrentPromo.old_price}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.state.updatebutton = false;
                            Promos.CurrentPromo.old_price = parseInt(val, 10);
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Start Date: <input type="text" id="beginDate" class="pa2 ba b--gray ml2 fr"
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.state.updatebutton = false;
                            console.log(format(val, "YYYY-MM-DD"))
                            Promos.CurrentPromo.start_date = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">End Date: <input type="text" id="endDate" class="pa2 ba b--gray ml2 fr"
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.state.updatebutton = false;
                            console.log(val)
                            Promos.CurrentPromo.end_date = val;
                        })}/></p>
                        <p class="pa2 bt b--gray cf">Description: <input type="text" class="pa2 ba b--gray ml2 fr" value={Promos.CurrentPromo.description}
                        oninput={m.withAttr("value", function(val) {
                            EditPromo.state.updatebutton = false;
                            Promos.CurrentPromo.description = val;
                        })}/></p>
                    </div>
                    <button class={EditPromo.state.updatebutton?"dn":" ba b--navy white pointer bg-navy pv2 ph3 w-100"}
                    onclick={function() {
                        Promos.CurrentPromo.start_date = EditPromo.state.startDate.selectedDates[0];
                        Promos.CurrentPromo.end_date = EditPromo.state.endDate.selectedDates[0];
                        console.log("Current Promo: ", Promos.CurrentPromo)
                        EditPromo.state.loader = true;
                        Promos.Update(Promos.CurrentPromo).then(() => {
                            EditPromo.state.loader = false;
                        }).catch((error) => {
                            EditPromo.state.loader = false;
                        })

                    }}>{EditPromo.state.loader? <div class="loader"></div> : "UPDATE"}</button>
                </div>:""}
            </section>
        )
    }
}

export default EditPromo;

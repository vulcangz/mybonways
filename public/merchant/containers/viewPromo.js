import m from 'mithril';
import {Promos} from "../models/promos.js";
import moment from 'moment';

var ViewPromo = {
    oninit: function(vnode) {
        console.log("init viewpromo")
        if(Promos.AllPromos.length < 1) {
            console.log("No promos");
            m.route.set("/promos/");
            return;
        }
        for (var j = 0; j < Promos.AllPromos.length; j++){
            if (Promos.AllPromos[j].slug == vnode.attrs.slug){
                console.log("promo found: ", vnode.attrs.slug);
                ViewPromo.p = Promos.AllPromos[j];
                return;
            }
        }
        // if none of the return is called then there is no promo to edit...
        m.route.set("/promos/");
        // if(typeof Promos.AllPromos[vnode.attrs.id] == 'undefined'){
        //     // redirect if there is no value...
        //     console.log("undefined here")
        //     m.route.set("/promos/");
        // } else {
        //    ViewPromo.p = Promos.AllPromos[vnode.attrs.id]
        // }
    },
    updatebutton: true,
    AddPreview: function(e) {
       ViewPromo.updatebutton = false;
        var image = document.getElementById("feature_image").files[0];
        // var preview = document.getElementById("preview");

        function readAndPreview() {
            // Make sure `file.name` matches our extensions criteria
            if ( /\.(jpe?g|png|gif)$/i.test(image.name) ) {
                var reader = new FileReader();

                reader.addEventListener("load", function (f) {
                    // preview.src = this.result;
                   ViewPromo.p.featured_image = this.result;
                    image.src = this.result;
                    console.log(ViewPromo.p);
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

        let promo_images = ViewPromo.p.promo_images.split(",").map(function(pi, i){
          if (pi===""||pi===" "){
            return
          }
          return (
            <div>
              <img src={pi} class="h4 bg-light-gray-custom1 min-w4"/>
            </div>
          )
        })
        return (
            <section>
              <div class="ph4 pv4 bg-white shadow-m2 ">
                <div class="">
                  <span  class="fw6 f3"> {ViewPromo.p.item_name} </span>
                  <a href={"/promos/edit/"+ViewPromo.p.slug} class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4" oncreate={m.route.link}>Edit Promo</a>
                  </div>
              </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="">
                      <div class="pa2  cf">
                        <strong>Category:</strong> <span>{ViewPromo.p.category}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>New Price:</strong> <span>{ViewPromo.p.new_price}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>Old Price:</strong> <span>ViewPromo.p.old_price}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>Start Date:</strong> <span>{ViewPromo.p.start_date}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>End Date:</strong>
                        <span>{ViewPromo.p.end_date}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>Description:</strong>
                        <p> {ViewPromo.p.description}</p>
                      </div>
                      {ViewPromo.p.feature_image!==""&&ViewPromo.p.feature_image!==" "?
                      <div class="pa2  cf">
                        <strong class="db">Featured Image:</strong>
                        <img src={ViewPromo.p.feature_image} class="h4 bg-light-gray-custom1 min-w4"/>
                      </div>
                      :""
                    }

                    {promo_images}
                    </div>
                    <button class= {ViewPromo.updatebutton?"dn":" ba b--navy white pointer bg-navy pv2 ph3 w-100"}
                    onclick={function() {
                        Promos.Update(ViewPromo.p);
                    }}> UPDATE</button>
                </div>
            </section>
        )
    }
}

export default ViewPromo;

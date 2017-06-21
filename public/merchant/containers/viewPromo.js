import m from 'mithril';
import {Promos} from "../models/promos.js";
import moment from 'moment';

var ViewPromo = {
    oncreate:function(vnode){
      var slug = m.route.param("slug")
      Promos.GetPromo(slug)
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
                   CurrentPromo.featured_image = this.result;
                    image.src = this.result;
                    console.log(CurrentPromo);
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
      let {CurrentPromo} = Promos;

        let promo_images = CurrentPromo.promo_images.split(",").map(function(pi, i){
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
                  <span  class="fw6 f3"> {CurrentPromo.item_name} </span>
                  <a href={"/promos/edit/"+CurrentPromo.slug} class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4" oncreate={m.route.link}>Edit Promo</a>
                  </div>
              </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="">
                      <div class="pa2  cf">
                        <strong>Category:</strong> <span>{CurrentPromo.category}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>New Price:</strong> <span>{CurrentPromo.new_price}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>Old Price:</strong> <span>{CurrentPromo.old_price}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>Start Date:</strong> <span>{CurrentPromo.start_date}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>End Date:</strong>
                        <span>{CurrentPromo.end_date}</span>
                      </div>
                      <div class="pa2  cf">
                        <strong>Description:</strong>
                        <p> {CurrentPromo.description}</p>
                      </div>
                      {CurrentPromo.feature_image!==""&&CurrentPromo.feature_image!==" "?
                      <div class="pa2  cf">
                        <strong class="db">Featured Image:</strong>
                        <img src={CurrentPromo.feature_image} class="h4 bg-light-gray-custom1 min-w4"/>
                      </div>
                      :""
                    }
                    {promo_images}
                    </div>
                    <button class= {ViewPromo.updatebutton?"dn":" ba b--navy white pointer bg-navy pv2 ph3 w-100"}
                    onclick={function() {
                        Promos.Update(CurrentPromo);
                    }}> UPDATE</button>
                </div>
            </section>
        )
    }
}

export default ViewPromo;

import m from 'mithril';
import {Promos} from '../models/promos.js';
import {MerchantModel} from '../models/merchant.js';
import {downscaleImage} from '../utils';
import moment from 'moment';

var NewPromo = {
  featuredImageChange:function(files){

      if ( /\.(jpe?g|png|gif)$/i.test(files[0].name) ) {
        let reader  = new FileReader();
        reader.addEventListener("load", (e)=> {

            //  downscaleImage(e.target.result,1200,"image/jpeg",0.7,(compressed)=>{ Promos.NewPromo.images.push(compressed)
            //  console.log(Promos.NewPromo)
            // })

            Promos.NewPromo.featured_image_b64 = e.target.result
            m.redraw()
            console.log(Promos.NewPromo)

        }, false);

        reader.readAsDataURL(files[0]);
      }
  },
    promoImagesChange:function(files){
      console.log(files)
      for(let i in files){
        if ( /\.(jpe?g|png|gif)$/i.test(files[i].name) ) {
          let reader  = new FileReader();
          reader.addEventListener("load", (e)=> {

              //  downscaleImage(e.target.result,1200,"image/jpeg",0.7,(compressed)=>{ Promos.NewPromo.images.push(compressed)
              //  console.log(Promos.NewPromo)
              // })

              Promos.NewPromo.images.push(e.target.result)
              console.log(Promos.NewPromo)
              m.redraw()

          }, false);

          reader.readAsDataURL(files[i]);
        }
      }
    },

  oncreate: function() {
      // initialize the images arrays...
      Promos.NewPromo.images = [];
      Promos.GetCategories()
  },
  view: function(vnode) {
    console.log(Promos.Categories)
    return (
      <section class="">
        <div class="ph4 pv4 bg-white shadow-m2 ">
          <div class="">
            <span  class="fw6 f3">New Promo </span>
            </div>
        </div>
        <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
            <div class="pa2">
                <label class="f4 gray pv2 dib">Item Name:</label><br></br>
                <input type="text" class="ba b--light-silver w-100 pa2 bw1"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.item_name = value;
                })} />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Item Category:</label>
                  <select class="ba b--light-silver bw1 pa2 w-100" onchange={m.withAttr("value", function(value) {
                      Promos.NewPromo.category = value;
                  })}>
                    <option>-- Select Category --</option>
                    {Promos.Categories.map(function(category, i){
                      return (<option value={category.slug} key={i} >
                        {category.name}
                      </option>)
                    })}

                  </select>
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Old Price:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.old_price = parseInt(value,10);
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">New Price:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.new_price = parseInt(value,10);
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Start Date:</label>
                <input type="date" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.start_date = moment(value, moment.ISO_8601);
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">End Date:</label>
                <input type="date" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.end_date = moment(value, moment.ISO_8601);
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Description:</label>
                <textarea  class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.description = value;
                })}
                ></textarea>
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Promo Featured Image:</label>
                <div class=" w-100 ">
                    <label for="featuredImageInput" class="pointer w-100  dib ba b--dashed tc pa3">
                            <p>Drag and Drop image here, or<br/> click to select image</p>
                    </label>
                    <input type="file" name="featuredImageInput" id="featuredImageInput" class="dn" onchange={m.withAttr("files",NewPromo.featuredImageChange)} />

                    {Promos.NewPromo.featured_image_b64&&Promos.NewPromo.featured_image_b64!==""?
                    <div id="preview" class="mv3 cf ">
                      <img class="fl w-25" src={Promos.NewPromo.featured_image_b64} alt="image"/>
                    </div>:""}
                </div>
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Promo Images:</label>
                <div class=" w-100 ">
                    <label for="imagesInput" class="pointer w-100  dib ba b--dashed tc pa3">
                            <p>Drag and Drop images here, or<br/> click to select images</p>
                    </label>
                    <input type="file" name="imagesInput" id="imagesInput" class="dn" onchange={m.withAttr("files",NewPromo.promoImagesChange)} multiple/>

                    <div id="preview" class="mv3 cf ">
                      {
                        Promos.NewPromo.images?Promos.NewPromo.images.map((image)=>{
                          return (<img class="fl w-25" src={image} alt="image"/>)
                        }):""
                      }
                    </div>
                </div>
            </div>
            <div class="pa2  pv3 mt2 tr">
                <button  class=" ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4 bw0 " onclick={function() {
                    // set company id before submission
                    Promos.NewPromo.company_id = MerchantModel.Merchant.company_id;
                    Promos.SaveNew();
                }}>submit promo</button>
            </div>
        </div>
      </section>
    )
  }
}

export default NewPromo;

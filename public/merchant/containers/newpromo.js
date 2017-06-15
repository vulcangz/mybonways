import m from 'mithril';
import {Promos} from '../models/promos.js';
import {MerchantModel} from '../models/merchant.js';

var NewPromo = {
    AddPreview: function() {
        var images = document.getElementById("images").files;
        var preview = document.getElementById("preview");

        function readAndPreview(image) {
            // Make sure `file.name` matches our extensions criteria
            if ( /\.(jpe?g|png|gif)$/i.test(image.name) ) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {
                    var file = new Image();
                    file.height = 150;
                    file.title = image.name;
                    file.src = this.result;
                    preview.appendChild( image );
                    Promos.NewPromo.images.push(this.result);
                }, false);

                reader.readAsDataURL(image);
            }
        }
        // reader.addEventListener("load", function() {
        //     Promos.NewPromo[e.target.name] = reader.result;
        //     img.src = reader.result;
        // })

        if(images) {
            [].forEach.call(images, readAndPreview);
            // reader.readAsDataURL(image);
        }
    },
    oncreate: function() {
        // initialize the images arrays...
        Promos.NewPromo.images = [];
    },
  view: function(vnode) {
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
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.category = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Old Price:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.old_price = parseInt(value);
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">New Price:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.new_price = parseInt(value);
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Start Date:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.start_date = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">End Date:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.end_date = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Description:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.description = value;
                })}
                />
            </div>
            <div class="pa2">
                <div class="pa2 w-100 bg-navy">
                    <div class="tc">
                        <label for="images" class="pointer">
                            <div class="dib ba b--navy bg-white pa2 shadow-4 br2">
                                <p class="navy mv0">Choose Files to upload</p>
                                <input type="file" name="images" id="images" class="dn" onchange={this.AddPreview} multiple/>
                            </div>
                        </label>
                    </div>
                    <hr class="light"/>
                    <div id="preview">
                        <div class="w-25 dib mh2 ba b--light-gray pa1">
                            <div class="tc overflow-hidden">
                                <img class="" id="image_1" src="/assets/img/user.jpg" alt="image"/>
                            </div>
                        </div>
                        <div class="w-25 dib mh2 ba b--light-gray pa1">
                            <div class="tc overflow-hidden">
                                <img class="" id="image_1" src="/assets/img/merchant_login_bg.jpg" alt="image"/>
                            </div>
                        </div>
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

import m from 'mithril';
import {Promos} from '../models/promos.js';

var NewPromo = {
    Preview: function(e) {
        var image = e.target.files[0];
        var reader = new FileReader();
        var img = document.getElementById(e.target.name);

        reader.addEventListener("load", function() {
            Promos.NewPromo[e.target.name] = reader.result;
            img.src = reader.result;
        })

        if(image) {
            reader.readAsDataURL(image);
        }
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
                    Promos.NewPromo.Name = value;
                })} />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Item Category:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.Category = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Old Price:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.OldPrice = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">New Price:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.NewPrice = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Start Date:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.StartDate = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">End Date:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.EndDate = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray pv2 dib">Description:</label>
                <input type="text" class="ba b--light-silver bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.Description = value;
                })}
                />
            </div>
            <div class="pa2">
                <div class="w-25 dib mh2 ba bw1 b--light-gray pa1">
                    <label for="img1" class="">
                        <input type="file" name="image1" id="img1" class="dn" onchange={this.Preview} />
                        <div class="tc overflow-hidden">
                            <img class="" id="image1" src="/assets/img/user.jpg" alt="image"/>
                        </div>
                    </label>
                </div>
                <div class="w-25 dib mh2 ba bw1 b--light-gray pa1">
                    <label for="img2" class="">
                        <input type="file" name="image2" id="img2" class="dn" onchange={this.Preview} />
                        <div class="tc overflow-hidden">
                            <img class="" id="image2" src="/assets/img/merchant_login_bg.jpg" alt="image"/>
                        </div>
                    </label>
                </div>
            </div>
            <div class="pa2  pv3 mt2 tr">
                <button  class=" ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4 bw0 " onclick={function() {
                    Promos.SaveNew();
                }}>submit promo</button>
            </div>
        </div>
      </section>
    )
  }
}

export default NewPromo;

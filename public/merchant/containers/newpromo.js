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
      <section class="pa2 bg-white">
        <div class="ba b--light-gray">
            <div class="tc">
                <h2>Add a new promo</h2>
            </div>
            <div class="pa2">
                <label class="f4 gray">Item Name:</label><br></br>
                <input type="text" class="ba b--gray w-100 pa2 bw1"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.Name = value;
                })} />
            </div>
            <div class="pa2">
                <label class="f4 gray">Item Category:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.Category = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">Old Price:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.OldPrice = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">New Price:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.NewPrice = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">Start Date:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.StartDate = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">End Date:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promos.NewPromo.EndDate = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">Description:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
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
            <div class="pa2">
                <button class="f4 ph3 pv2 blue ba b--blue bw1 shadow-3 bg-white" onclick={function() {
                    Promos.SaveNew();
                }}>ADD PROMO</button>
            </div>
        </div>
      </section>
    )
  }
}

export default NewPromo;
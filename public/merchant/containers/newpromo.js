import m from 'mithril';
import Promo from '../models/promos.js'

function Preview(e) {
    var image = e.target.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
        Promo.NewPromo[e.target.name] = reader.result;
    })

    if(image) {
        reader.readAsDataURL(image);
    }
}

var NewPromo = {
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
                    Promo.NewPromo.Name = value;
                })} />
            </div>
            <div class="pa2">
                <label class="f4 gray">Item Category:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promo.NewPromo.Category = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">Old Price:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promo.NewPromo.OldPrice = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">New Price:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promo.NewPromo.NewPrice = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">Start Date:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promo.NewPromo.StartDate = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">End Date:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promo.NewPromo.EndDate = value;
                })}
                />
            </div>
            <div class="pa2">
                <label class="f4 gray">Description:</label>
                <input type="text" class="ba b--gray bw1 pa2 w-100"
                oninput={m.withAttr("value", function(value) {
                    Promo.NewPromo.Description = value;
                })}
                />
            </div>
            <div class="pa2">
                <div class="w-25 dib mh2 ba bw1 b--light-gray pa1">
                    <label for="image1" class="">
                        <input type="file" name="image1" id="image1" class="dn" onchange={Preview} />
                        <div class="" style="overflow: hidden">
                            <img class="" src={function() {
                                return Promo.NewPromo.image1 || "/assets/img/user.jpg"
                             }} alt="image"/>
                        </div>
                    </label>
                </div>
                <div class="w-25 dib mh2 ba bw1 b--light-gray pa1">
                    <label for="image2" class="">
                        <input type="file" name="image2" id="image2" class="dn" onchange={Preview} />
                        <div class="" style="overflow: hidden">
                            <img class="" src={function() {
                                return Promo.NewPromo.image2 || "/assets/img/merchant_login_bg.jpg"
                            }} alt="image"/>
                        </div>
                    </label>
                </div>
            </div>
            <div class="pa2">
                <button class="f4 ph3 pv2 blue ba b--blue bw1 shadow-3 bg-white" onclick={function() {
                    Promo.SaveNew();
                }}>ADD PROMO</button>
            </div>
        </div>
      </section>
    )
  }
}

export default NewPromo;
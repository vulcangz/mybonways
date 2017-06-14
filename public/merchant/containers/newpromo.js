import m from 'mithril';
import Promo from '../models/promos.js'

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
                <button class="f4 ph3 pv2 blue ba b--blue shadow-3 bg-white" onclick={function() {
                    Promo.SaveNew();
                }}>ADD PROMO</button>
            </div>
        </div>
      </section>
    )
  }
}

export default NewPromo;
import m from "mithril";
import {Promos} from "../models/promos.js";
import moment from "moment"

var PromosTable = {
  oncreate:function(){
    Promos.GetAllPromos()
  },
  randomID: function(length, c) {
        var text = "promo_item_";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += characters. charAt(Math. floor(Math. random() * characters.length));
        }
        Promos.itemID[text] = c;
        console.log(Promos.itemID[text], " : ", text, " : ", c);
        return text;
    },
  view:function(){
    var p = Promos.AllPromos
    console.log("p: ", p)
    return (
      <section>
        <div class="ph4 pv4 bg-white shadow-m2 ">
          <div class="">
            <span  class="fw6 f3">All Promos </span>
            <a href="/promos/new" class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4" oncreate={m.route.link}>New Promo</a>
            </div>
        </div>
        <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
            <div class="" style="overflow: auto">
              <table class="f6 w-100 mw8 center" cellspacing="0">
                  <thead class="pa2 ">
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Name</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Category</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Price</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Duration</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Actions</th>
                  </thead>
                  <tbody class="lh-copy">
                      {p.map(function(promo,i) {
                        return (<tr class="">
                          <td class="pv3 pr3 bb b--black-20 tc">{i+1}</td>
                          <td class="pv3 pr3 bb b--black-20 tc">{promo.item_name}</td>
                          <td class="pv3 pr3 bb b--black-20 tc">{promo.category}</td>
                          <td class="pv3 pr3 bb b--black-20 tc">
                            <span class="db">{promo.new_price}</span>
                            <span class="db">-</span>
                            <span class="db strike">{promo.old_price}</span>
                          </td>
                          <td class="pv3 pr3 bb b--black-20 tc">
                            <span class="db">{moment(promo.start_date).format("L")}</span>
                            <span class="db">to</span>
                            <span class="db ">{moment(promo.end_date).format("L")}</span>
                          </td>
                          <td class="pv3 pr3 bb b--black-20 tc">
                            <a href={"/promos/edit/" + PromosTable.randomID(5, i)} class="ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4" oncreate={m.route.link}>View</a>

                            <a href="#!" class="ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4" oncreate={m.route.link}>Delete</a>

                          </td>
                        </tr>);
                      })}
                  </tbody>
              </table>
            </div>
            <div class="mt4 cf pa2 pv3">
              <a href="#!" class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline mh1 shadow-4" oncreate={m.route.link}>Previous</a>
              <a href="#!" class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline mh1 shadow-4" oncreate={m.route.link}>Next</a>
            </div>
        </div>
      </section>
    )
  }
}

export default PromosTable;

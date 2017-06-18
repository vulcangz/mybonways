import m from "mithril";
import {Promos} from "../models/promos.js";

var PromosTable = {

  view:function(){
    var p = Promos.AllPromos
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
                      {p.map(function(promo, i) {
                        return (<tr class="">
                          <td class="pv3 pr3 bb b--black-20 tc">{promo.ID}</td>
                          <td class="pv3 pr3 bb b--black-20 tc">{promo.Name}</td>
                          <td class="pv3 pr3 bb b--black-20 tc">{promo.Category}</td>
                          <td class="pv3 pr3 bb b--black-20 tc">
                            <span class="db">{promo.NewPrice}</span>
                            <span class="db">-</span>
                            <span class="db strike">{promo.OldPrice}</span>
                          </td>
                          <td class="pv3 pr3 bb b--black-20 tc">
                            <span class="db">{promo.StartDate}</span>
                            <span class="db">to</span>
                            <span class="db ">{promo.EndDate}</span>
                          </td>
                          <td class="pv3 pr3 bb b--black-20 tc">
                            <a href={"/promos/edit/" + i} class="ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4" oncreate={m.route.link}>Edit</a>

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

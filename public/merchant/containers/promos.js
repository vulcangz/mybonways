import m from "mithril";
import {Promos} from "../models/promos.js";

var PromosTable = {
    
  view:function(){
    var p = Promos.AllPromos
    return (
      <section>
        <div class="pa2 bg-white shadow-m2 mt3 cf">
            <div class="tc bb b--light-gray">
              <h3>All Promos</h3>
            </div>
            <div class="ba pa2 b--light-gray" style="overflow: auto">
              <table class="f6 w-100 mw8 center" cellspacing="0">
                  <thead class="pa2">
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">S/N</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Name</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Category</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">OldPrice</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">NewPrice</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Description</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">StartDate</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">EndDate</th>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Edit</th>
                  </thead>
                  <tbody class="lh-copy">
                      {p.map(function(promo) {
                        return (<tr class="">
                          <td class="pv3 pr3 bb b--black-20">{promo.ID}</td>
                          <td class="pv3 pr3 bb b--black-20">{promo.Name}</td>
                          <td class="pv3 pr3 bb b--black-20">{promo.Category}</td>
                          <td class="pv3 pr3 bb b--black-20">{promo.OldPrice}</td>
                          <td class="pv3 pr3 bb b--black-20">{promo.NewPrice}</td>
                          <td class="pv3 pr3 bb b--black-20">{promo.Description}</td>
                          <td class="pv3 pr3 bb b--black-20">{promo.StartDate}</td>
                          <td class="pv3 pr3 bb b--black-20">{promo.EndDate}</td>
                          <td class="pv3 pr3 bb b--black-20"><button type="button" class="ph1 pv2 ba b--white shadow-4 bg-red white">Del</button></td>
                        </tr>);
                      })}
                  </tbody>
              </table>
            </div>
            <div class="mt2 fr">
              <button class="ph3 pv2 bg-white blue ba b--blue bw1 shadow-3 pointer" type="button">Add Promo</button>
            </div>
        </div>
      </section>
    )
  }
}

export default PromosTable;

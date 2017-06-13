import m from "mithril";
import {Promos} from "../models/promos.js";

var PromosTable = {
  
    // Name: "",
    // Category: "",
    // OldPrice: "",
    // NewPrice: "",
    // Description: "",
    // StartDate: "",
    // EndDate: ""
    
  view:function(){
    var p = Promos.AllPromos
    return (
      <section>
        <div class="pa3 bg-white shadow-m2 tc">
          <h3>All Promos</h3>
        </div>
        <div class="pa3 bg-white shadow-m2 mt3 cf">
            <table class="w-100">
                <thead class="pa2">
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">Name</th>
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">Category</th>
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">OldPrice</th>
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">NewPrice</th>
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">Description</th>
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">StartDate</th>
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">EndDate</th>
                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white ttu">Edit</th>
                </thead>
                <tbody>
                    {p.map(function(promo) {
                       return (<tr class="">
                         <td class="pv3 pr3 bb b--black-20">{promo.Name}</td>
                         <td class="pv3 pr3 bb b--black-20">{promo.Category}</td>
                         <td class="pv3 pr3 bb b--black-20">{promo.OldPrice}</td>
                         <td class="pv3 pr3 bb b--black-20">{promo.NewPrice}</td>
                         <td class="pv3 pr3 bb b--black-20">{promo.Description}</td>
                         <td class="pv3 pr3 bb b--black-20">{promo.StartDate}</td>
                         <td class="pv3 pr3 bb b--black-20">{promo.EndDate}</td>
                         <td class="pv3 pr3 bb b--black-20"><button type="button" class="ph1 pv2 ba b--white shadow-4 bg-red white">del</button></td>
                       </tr>);
                     })}
                </tbody>
            </table>
        </div>
        <section class="pa3 bg-white shadow-m2 mt3 cf" >
        </section>
      </section>
    )
  }
}

export default PromosTable;

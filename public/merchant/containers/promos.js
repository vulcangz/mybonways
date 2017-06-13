import m from "mithril";
import promosList from "../models/promos";

var Promos = {
  
    // Name: "",
    // Category: "",
    // OldPrice: "",
    // NewPrice: "",
    // Description: "",
    // StartDate: "",
    // EndDate: ""

  view:function(){

    return (
      <section>
        <div class="pa3 bg-white shadow-m2 tc">
          <h3>All Promos</h3>
        </div>
        <div class="pa3 bg-white shadow-m2 mt3 cf">
            <table class="w-100 ba b--gray">
                <thead class="pa2">
                    <th class="pa2 tl ttu">Name</th>
                    <th class="pa2 tl ttu">Category</th>
                    <th class="pa2 tl ttu">OldPrice</th>
                    <th class="pa2 tl ttu">NewPrice</th>
                    <th class="pa2 tl ttu">Description</th>
                    <th class="pa2 tl ttu">StartDate</th>
                    <th class="pa2 tl ttu">EndDate</th>
                </thead>
                <tbody>
                    <tr>
                      
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <section class="pa3 bg-white shadow-m2 mt3 cf" >
        </section>
      </section>
    )
  }
}

export default Promos;

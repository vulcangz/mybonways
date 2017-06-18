import m from "mithril";
import {br} from "../models/branches.js";

var Branches = {
    oninit: function() {
        br.GetAllBranches();
    },
    view: function() {
        return (
            <section>
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">All Branches </span>
                        <a href="/branches/new" class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4" oncreate={m.route.link}>New Branch</a>
                    </div>
                </div>
                <div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
                    <div class="" style="overflow: auto">
                        <table class="f6 w-100 mw8 center" cellspacing="0">
                            <thead class="pa2 ">
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">S/N</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Address</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">City</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">State</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Country</th>
                                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Edit</th>
                            </thead>
                            <tbody>
                                {br.AllBranches.map(function(b, i) {
                                    return (
                                    <tr>
                                        <td class="pv3 pr3 bb b--black-20 tc">{i + 1}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{b.address}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{b.city}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{b.state}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">{b.country}</td>
                                        <td class="pv3 pr3 bb b--black-20 tc">
                                            <a href={"/branches/edit/" + b.id}  class="ph2 pv1 bg-navy white-90 grow pointer no-underline ma1 shadow-4" oncreate={m.route.link}>Edit</a>

                                            <button class="ph2 pv1 ba b--navy bg-navy white-90 grow pointer no-underline ma1 shadow-4"
                                            onclick={()=>{
                                                br.DeleteBranch(b.id, i)
                                                }}>Delete</button>
                                        </td>
                                    </tr>
                                    )
                                })}
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}

export default Branches;
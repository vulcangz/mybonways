import m from 'mithril';
import localforage from 'localforage';
import {AdminModel, getCookie} from '../models/admin.js';

export var MerchantAuth = {
 oncreate:function(){
   AdminModel.GetUserfromStorage()

 },
 view:function(vnode){
  var cookie = getCookie("X-ADMIN-TOKEN")
  if (cookie === ""){
    m.route.set("/login")
    return m("div")
  }
   return m("div",vnode.attrs,m.fragment(vnode.attrs,[vnode.children]));
 }
}

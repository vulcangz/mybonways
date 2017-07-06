import m from 'mithril';
import localforage from 'localforage';

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
export function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export var AdminModel = {
    Admin: {},
    Token: "",
    GetUserfromStorage: function(){
      if (!AdminModel.Admin || !AdminModel.Admin.email){
        return localforage.getItem('AuthAdmin').then(function(admin){
          console.log(admin)
          if (admin!=null){
            AdminModel.Admin = admin
            m.redraw()
            return
          }
          AdminModel.Admin = null
          m.redraw()
        })
      }
    },
    Login:function(admin){
      console.log(admin)
      return m.request({
              url: "/api/admin/login",
              method: "POST",
              data: admin
          })
          .then(function(response) {
            console.log(response);
            var cookie = getCookie("X-ADMIN-TOKEN")
            console.log("cookie:", cookie)
            return localforage.setItem('AuthAdmin', response.admin)
          })
          .then(function(){
             AdminModel.GetUserfromStorage()
        })
    },
    Logout:function(){
      m.route.set("/login")
      localforage.removeItem("AuthAdmin")
      deleteCookie("X-ADMIN-TOKEN")
    },
}

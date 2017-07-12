import m from 'mithril';
import Slideout from 'slideout';
import {UserModel} from '../models/user.js';
import {isEmptyObject} from '../../util/utils.js';

var slideout;


var OffCanvasMenu = {
  oncreate:function(vnode){
    vnode.attrs.slideout  = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 256,
      'tolerance': 70
    })
    UserModel.GetUserfromStorage().then(()=>{

    }).catch((error) => {
      console.error(error)
    })
  },
  view:function(vnode){
    return (
      <section>
        <nav id="menu" class="white-90 bg-red-gradient shadow-inset-1">
          {!isEmptyObject(UserModel.User)?
          <header class="pv4">
            <div class="tc">
              <img src="/assets/img/user.jpg" class="w4 h4 br-100 pa1 ba bw1 b--white"/>
              <div>
                <span class="f4">{UserModel.User.full_name}</span>
              </div>
            </div>
            <div class="pt4 ph4">
              <a class="db pv2 ph2 bt link white-90" oncreate={m.route.link} href="/">Home</a>
              <a class="db pv2 ph2 bt link" oncreate={m.route.link} href="/dashboard">Dashboard</a>
              <a class="db pv2 ph2 bt link" oncreate={m.route.link} href="/dashboard/favourites">Favorites</a>
              <a class="db pv2 ph2 bt link pointer" onclick={() => {
                  UserModel.Logout();
                }}>Logout</a>
            </div>
          </header>
          : <div class="tc pv4">
                <a href="/signup" class="bg-white red ba b--red pa3 shadow-3 br2 no-underline" oncreate={m.route.link}>Signup/Login</a>
            </div>}
        </nav>
        <section id="panel">
          {m.fragment(vnode.attrs, vnode.children)}
        </section>
      </section>
    )
  }
}

export default OffCanvasMenu;

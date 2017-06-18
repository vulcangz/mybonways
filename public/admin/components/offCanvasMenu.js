import m from 'mithril';
import Slideout from 'slideout';
var slideout;


 var OffCanvasMenu = {
  oncreate:function(vnode){
    vnode.attrs.slideout  = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 256,
      'tolerance': 70
    })
  },
  view:function(vnode){
    return (
      <section>
        <nav id="menu" class="white-90 bg-red-gradient shadow-inset-1">
          <header class="pv4">
            <div class="tc">
              <img src="/assets/img/user.jpg" class="w4 h4 br-100 pa1 ba bw1 b--white"/>
              <div>
                <span class="f4">Anthony Alaribe</span>
              </div>
            </div>
            <div class="pt4 ph4">
              <a class="db pv2 ph2 bt link white-90" oncreate={m.route.link} href="/">Home</a>
              <a class="db pv2 ph2 bt ">Profile</a>
              <a class="db pv2 ph2 bt ">Favorites</a>
            </div>
          </header>
        </nav>
        <section id="panel">
          {m.fragment(vnode.attrs, vnode.children)}
        </section>
      </section>
    )
  }
}

export default OffCanvasMenu;

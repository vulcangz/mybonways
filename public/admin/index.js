import m from 'mithril';

import HotPromosPage from './containers/hotPromosPage.js';
import PromoDetailPage from './containers/promoDetailPage.js';
import OffCanvasMenu from './components/offCanvasMenu.js';

var root = document.getElementById('appContainer');

m.route.prefix('/admin');
m.route(root, '/', {
  '/':{
    view: function(vnode){
      return m(OffCanvasMenu,vnode.attrs,
          m(HotPromosPage,vnode.attrs)
        );
      },
  },
  '/promo/:slug':{
    view: function(vnode){
      return m(OffCanvasMenu,vnode.attrs,
          m(PromoDetailPage,vnode.attrs)
        );
      },
  }
});

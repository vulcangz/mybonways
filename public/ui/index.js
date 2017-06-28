import m from 'mithril';

import HotPromosPage from './containers/hotPromosPage.js';
import PromoDetailPage from './containers/promoDetailPage.js';
import OffCanvasMenu from './components/offCanvasMenu.js';
import SearchArea from './containers/searcharea.js';
import MapPromos from './containers/mappromos.js';
import DoublePromos from './components/doublePromos.js';
import searchNav from './components/searchNav.js';

var root = document.getElementById('appContainer');

m.route.prefix('');
m.route(root, '/', {
  '/':{
    view: function(vnode){
      return m(OffCanvasMenu,vnode.attrs,
          m(HotPromosPage,vnode.attrs, m(searchNav, vnode.attrs))
        );
      },
  },
  '/promo/:slug':{
    view: function(vnode){
      return m(OffCanvasMenu,vnode.attrs,
          m(PromoDetailPage,vnode.attrs)
        );
      },
  },
  '/search': {
    view: function(vnode) {
      return m(SearchArea, vnode.attrs)
    }
  },
  '/map': {
    view: function(vnode){
      return m(OffCanvasMenu,vnode.attrs,
          m(MapPromos, vnode.attrs, m(searchNav, vnode.attrs))
        );
      },
  },
  '/2in1': {
    view: function(vnode){
      return m(OffCanvasMenu,vnode.attrs,
          m(DoublePromos,vnode.attrs, m(searchNav, vnode.attrs))
        );
      },
  }
});

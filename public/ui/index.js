import m from 'mithril';

import HotPromosPage from './containers/hotPromosPage.js';
import PromoDetailPage from './containers/promoDetailPage.js';
import OffCanvasMenu from './components/offCanvasMenu.js';
import SearchArea from './containers/searcharea.js';
import searchNav from './components/searchNav.js';
import MapPromos from './components/mappromos.js';
import DoublePromos from './containers/doublePromos.js';
import MerchantPromos from './containers/merchantpromos.js';

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
          m(PromoDetailPage,vnode.attrs, m(searchNav, vnode.attrs))
        );
      },
  },
  '/search': {
    view: function(vnode) {
      return m(SearchArea, vnode.attrs, m(searchNav, vnode.attrs))
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
    view: (vnode) => {
      return m(OffCanvasMenu,vnode.attrs,
          m(DoublePromos,vnode.attrs, m(searchNav, vnode.attrs))
        );
      },
  },
  '/merchant/:id': {
    view: (vnode) => {
      return m(OffCanvasMenu,vnode.attrs,
          m(MerchantPromos, vnode.attrs, m(searchNav, vnode.attrs))
        );
      },
  }
});

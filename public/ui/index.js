import m from 'mithril';

import HotPromosPage from './containers/hotPromosPage.js';
import OffCanvasMenu from './components/offCanvasMenu.js';

var root = document.getElementById('appContainer');

m.route.prefix('');
m.route(root, '/', {
  '/':{
    view: function(vnode){
      return m(OffCanvasMenu,vnode.attrs,
          m(HotPromosPage,vnode.attrs)
        );
      },
  }
});

import m from 'mithril';

import LoginPage from './containers/loginPage.js';
import OffCanvasMenu from './components/offCanvasMenu.js';
import AdminShell from './containers/adminShell.js';

import Categories from './containers/categories.js';
import {MerchantAuth} from './components/auth.js';

var root = document.getElementById('appContainer');

m.route.prefix('/admin');
m.route(root, '/', {
  '/':{
    view: function(vnode){
      return m(MerchantAuth,vnode.attrs,
          m(OffCanvasMenu,vnode.attrs,
              m(AdminShell,vnode.attrs,
                m(Categories,vnode.attrs)
              )
          )
        );
      },
  },
  '/login':{
    view: function(vnode){
      return  m(LoginPage, vnode.attrs)
      },

  }
});

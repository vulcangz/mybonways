import m from 'mithril';

import SignupPage from './containers/signupPage.js';
import OffCanvasMenu from './components/offCanvasMenu.js';
import AdminShell from './containers/adminShell.js';

import Categories from './containers/categories.js';
import {AdminAuth} from './components/auth.js';

var root = document.getElementById('appContainer');

m.route.prefix('/merchants');
m.route(root, '/', {
  '/':{
    view: function(vnode){
      return m(AdminAuth,vnode.attrs,
          m(OffCanvasMenu,vnode.attrs,
              m(AdminShell,vnode.attrs,
                m(Categories,vnode.attrs)
              )
          )
        );
      },
  },
  '/signup':{
    view: function(vnode){
      return m(SignupPage,vnode.attrs);
      },
  }
});

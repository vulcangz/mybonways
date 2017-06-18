import m from 'mithril';

import SignupPage from './containers/signupPage.js';
import OffCanvasMenu from './components/offCanvasMenu.js';
import AdminShell from './containers/adminShell.js';
import Branches from './containers/branches.js';
import NewBranch from './containers/newbranch.js';
import EditBranch from './containers/editbranch.js';

import Categories from './containers/categories.js';
import {MerchantAuth} from './components/auth.js';
import PromosTable from './containers/promos.js';
import NewPromo from './containers/newpromo.js';

var root = document.getElementById('appContainer');

m.route.prefix('/merchants');
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
  '/signup':{
    view: function(vnode){
      return  m(SignupPage, vnode.attrs)
      },
  },
  '/promos': {
      view: function(vnode) {
          return m(MerchantAuth,vnode.attrs,
            m(AdminShell, vnode.attrs,
              m(PromosTable, vnode.attrs)
            )
          )
      }
  },
  '/promos/new': {
      view: function(vnode) {
          return m(MerchantAuth,vnode.attrs,
            m(AdminShell, vnode.attrs,
              m(NewPromo, vnode.attrs)
            )
          )
      }
  },
  '/branches': {
    view: function(vnode) {
      return m(MerchantAuth,vnode.attrs,
            m(AdminShell, vnode.attrs,
              m(Branches, vnode.attrs)
            )
          )
    }
  },
  '/branches/new': {
    view: function(vnode) {
      return m(MerchantAuth,vnode.attrs,
            m(AdminShell, vnode.attrs,
              m(NewBranch, vnode.attrs)
            )
          )
    }
  },
  '/branches/edit/:id': {
    view: function(vnode) {
      return m(MerchantAuth,vnode.attrs,
            m(AdminShell, vnode.attrs,
              m(EditBranch, vnode.attrs)
            )
          )
    }
  }
});

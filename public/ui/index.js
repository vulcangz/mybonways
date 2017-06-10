import m from 'mithril';

import HotPromosPage from './containers/hotPromosPage.js';

var root = document.getElementById('appContainer');

m.route.prefix('');
m.route(root, '/', {
  '/': HotPromosPage
});

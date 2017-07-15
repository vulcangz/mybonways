import m from 'mithril';
import Footer from '../components/footer.js';

var DoublePromos = {
  onbeforeremove: (vnode) => {
    vnode.dom.classList.add("fadeOut")
    return new Promise(function (resolve) { setTimeout(resolve, 1000) })
  },
  oncreate: (vnode) => { vnode.dom.classList.add("fadeIn") },
  view: (vnode) => {
    return (
      <section class="animated">
          {m.fragment(vnode.attrs, vnode.children)}
        <div class="red">2 in 1 PROMOS...</div>
        <Footer />
      </section>
    )
  }
}

export default DoublePromos;

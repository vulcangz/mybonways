import m from 'mithril';

var MerchantPromos = {
    view: (vnode) => {
        return (
            <section>
                <section>
                    {m.fragment(vnode.attrs, vnode.children)}
                </section>
                <section>
                    <div class="pa1">
                        <p class="mv0 pa2 bg-red-custom white">Mechant details:</p>
                    </div>
                </section>
            </section>
        )
    }
}

export default MerchantPromos;

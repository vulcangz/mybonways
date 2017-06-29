import m from 'mithril';

var Slider = {
    view: (vnode) =>{ 
        return (
            <section>
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span  class="fw6 f3">All Sliders </span>
                        <a href="/slider/new" class="fr ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4" oncreate={m.route.link}>New Slider</a>
                    </div>
                </div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
                    <div class="shadow-4 mv1 pv2">
                        <p class="mv0 pa2">http://mybonways.com/promos/some-promo-HjsTy</p>
                        <img src="/assets/img/ad/5.jpg" alt="image" />
                        <div class="">
                            <a href="" class="bg-navy white pa2 ba b--transparent no-underline mh2 pointer">Edit</a>
                            <button class="bg-navy white pa2 ba b--transparent mh2 pointer">Delete</button>
                        </div>
                    </div>
                    <div class="shadow-4 mv1 pv2">
                        <p class="mv0 pa2">http://mybonways.com/promos/some-promo-HjsTy</p>
                        <img src="/assets/img/ad/5.jpg" alt="image" />
                        <div class="">
                            <a href="" class="bg-navy white pa2 ba b--transparent no-underline mh2 pointer">Edit</a>
                            <button class="bg-navy white pa2 ba b--transparent mh2 pointer">Delete</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Slider;
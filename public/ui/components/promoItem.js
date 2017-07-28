import m from "mithril";

var promoItem = {
  view:function(vnode){
    let {promo,key} = vnode.attrs;
    return (
      <div class="dib w-50 w-33-m w-25-l pa1 fl" key={key}>
        <a
          class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100"
          href={"/promo/" + promo.slug}
          oncreate={m.route.link}
        >
          <div class="f8 pv1 tl pv1 ph1">
            <div class=" overflow-x-hidden">
              <img
                src="/assets/img/svg/grid.svg"
                style="height:0.55rem;" class="di v-mid"
              />
            <span class="red-custom di pl1 v-mid">
                {promo.category}
              </span>
            </div>
          </div>
          <div
            class="w-100 cover overflow-hidden"
            style={
              "background-image:url(" +
              promo.featured_image_b64 +
              ")"
            }
            oncreate={vnode => {
              vnode.dom.style.height =
                vnode.dom.offsetWidth / 1.5 + "px";
            }}
          >
            <img src={promo.featured_image} class="w-100 br2" />
          </div>
          <span class="f7 lh-title dib pa1 ">
            {promo.item_name}
          </span>
          <div class="f8 pa1 tr cf">
            <div class="dib w-50 fl">
              <span class=" red-custom db fw6 f5">
                {((parseInt(promo.old_price) - parseInt(promo.new_price)) / parseInt(promo.old_price) * 100) % 1?
                ((parseInt(promo.old_price) - parseInt(promo.new_price)) / parseInt(promo.old_price) * 100).toFixed(1):
                ((parseInt(promo.old_price) - parseInt(promo.new_price)) / parseInt(promo.old_price) * 100)}%
              </span>
            </div>
            <div class="dib w-50 fl">
              <strong class="dark-gray db">
                {promo.new_price}F CFA
              </strong>
              <span class="strike db">
                {promo.old_price}F CFA
              </span>
            </div>
          </div>
          <div class="f8 pa1 pv2 ">
            <span class="pa1">
              <img
                src="/assets/img/svg/like-hollow.svg"
                class="dib pr1"
                style="height:0.5rem;"
              />
              <span class="dib">{promo.favourite}</span>
            </span>
            <span class="pa1">
              <img
                src="/assets/img/svg/comment.svg"
                class="pr1"
                style="height:0.5rem;"
              />
              <span class="dib">{promo.comment}</span>
            </span>
          </div>
        </a>
      </div>
    )
  }
}

export default promoItem;

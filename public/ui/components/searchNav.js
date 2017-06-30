import m from 'mithril';


var searchNav = {
  view: (vnode) => {
    return (
    <section>
      <div class="flex flex-row pv1 ph2">
        <div class="flex pa1 pr3">
          <a class="red-custom f3" onclick={() => vnode.attrs.slideout.toggle()}>☰</a>
        </div>
        <div class="flex flex-row flex-auto">
          <div class="flex flex-auto  justify-center pa1 tc">
              <a href="/map" class={(m.route.get() == "/map" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>Map</a>
            {/*<a class={(HotPromosPage.tab == "Map" ? "bg-red-custom white" : "bg-white red-custom") + " pa1 dib w-100 br-pill"}
              onclick={() => {
                console.log("clicked button: ", HotPromosPage.tab)
                HotPromosPage.tab = "Map";
              }}>Map</a>*/}
          </div>
          <div class="flex flex-auto justify-center pa1 tc">
              <a href="/" class={(m.route.get() == "/" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>Hot</a>
            {/*<a class={(HotPromosPage.tab == "Hot" ? "bg-red-custom white" : "bg-white red-custom") + " pa1 dib w-100  br-pill "}
              onclick={() => {
                console.log("clicked button: ", HotPromosPage.tab)
                HotPromosPage.tab = "Hot";
              }}>Hot</a>*/}
          </div>
          <div class="flex flex-auto justify-center pa1 tc">
              <a href="/2in1" class={(m.route.get() == "/2in1" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>2 in 1</a>
            {/*<a class={(HotPromosPage.tab == "2in1" ? "bg-red-custom white" : "bg-white red-custom") + " pa1 dib w-100 br-pill"}
              onclick={() => {
                console.log("clicked button: ", HotPromosPage.tab)
                HotPromosPage.tab = "2in1";
              }}>2 in 1</a>*/}
          </div>
        </div>
      </div>
      <div class="pa2">
            <div class=" cf flex justify-between relative">
                <div class="dib   flex relative " style="flex:7">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                    <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;" />
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent " placeholder="search" />
                </div>
                <div class="dib ml2 flex relative" style="flex:3">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                    <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;" />
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent" placeholder="area" id="areaInput"
                    oninput={m.withAttr("value", function (value) {
                    search.searchData = value;
                    })} />
                </div>
            </div>
        </div>
    </section>
    )
  }
}

export default searchNav;
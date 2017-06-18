import m from 'mithril';
import {search} from '../models/search.js';

var SearchArea = {
    initMap: function (myLatLng, i, title) {
        {/*var myLatLng = {lat: location.latitude, lng: location.longtitude};*/}

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map' + i), {
            center: myLatLng,
            scrollwheel: false,
            zoom: 4
        });

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: title
        });
    },
    oninit: function(vnode) {
        search.searchData = vnode.attrs.area;
        search.searchFor();
    },
    view: function(vnode){
        return (
            <section>
                <section>
                    <div class="flex flex-row pv1 ph2">
                        {/*<div class="flex pa1 pr3">
                            <a class="red-custom f3" onclick={()=>vnode.attrs.slideout.toggle()}>☰</a>
                        </div>*/}
                        <div class="flex flex-row flex-auto">
                            <div class="flex flex-auto  justify-center pa1 tc">
                                <a class="pa1 dib w-100  red-custom link" href="/" oncreate={m.route.link}>map</a>
                            </div>
                            <div class="flex flex-auto  justify-center pa1 tc">
                                <a class="pa1 dib w-100  br-pill bg-red-custom white link" href="/" oncreate={m.route.link}>hot</a>
                            </div>
                            <div class="flex flex-auto  justify-center pa1 tc">
                                <a class="pa1 dib w-100 red-custom link" href="/" oncreate={m.route.link}>2 in 1</a>
                            </div>
                        </div>
                    </div>
                    <div class="pa2">
                        <div class=" cf flex justify-between relative">
                            <div class="dib   flex relative " style="flex:7">
                                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                                    <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;"/>
                                </span>
                                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent "  placeholder="search"/>
                            </div>
                            <div class="dib ml2 flex relative" style="flex:3">
                                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                                    <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;"/>
                                </span>
                                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent "  placeholder="area"
                                    oninput={m.withAttr("value", function(value) {
                                        search.searchData = value;
                                    })}/>
                                <span class="dib z-3 pv1 ph3 pointer bg-light-gray hover-bg-navy" style="padding-top:0.60rem" onclick={function() {
                                        search.searchFor();
                                        m.route.set("/search/" + search.searchData);
                                    }}>
                                    <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;"/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="cf">
                        <h3 class="tc pa2">Search Area: <span class="navy underline">{vnode.attrs.area}</span></h3>
                    </div>
                    <div class="cf">
                    {search.mysearch.map(function(location, i) {
                        return (
                        <div class="fl w-third-l w-50-m pa2 cf">
                            <div class="pa2 ma2 ba b--light-gray hover-shadow-m3 br3">
                                <div id={"map"+ i}></div>
                                <img src="/assets/img/800x450.png" width="100%" alt="map"/>
                                <div class="">
                                    <p>Company id: {location.company_id}</p>
                                    <p>branch location(lat : lng): {location.latitude + " : " + location.longtitude}</p>
                                    <p>branch Area: {location.area}</p>
                                </div>
                            </div>
                            {/*this.initMap({lat: location.latitude, lng: location.longtitude}, i, location.area)*/}
                        </div>
                        )
                    })}
                    </div>
                </section>
            </section>
        )
    }
}

export default SearchArea;
import m from 'mithril';

export var search = {
    page: 0,
    searchData:"",
    mysearch: [],
    searchFor: function (query, lat, lng) {
        // search for a particular area
        return m.request({
            method: "GET",
            url: `/api/promo/search?q=${query}&lat=${lat}&lng=${lng}&p=${++search.page}`
        }).then(function(response) {
            response.map((r) => {
                console.log(r.longitude + " lng : lat " + r.latitude);
            })
            console.log("response : ", response);
            if(response.length){
                search.mysearch.push.apply(search.mysearch, response);
            } else {
                console.log("no other response");
            }
        })
    }
}

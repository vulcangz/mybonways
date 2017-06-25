import m from 'mithril';

export var search = {
    searchData:"",
    mysearch: [],
    searchFor: function (query, lat, lng) {
        // search for a particular area
        m.request({
            method: "GET",
            url: `/api/promo/search?q=${query}&lat=${lat}&lng=${lng}`
        }).then(function(response) {
            console.log("response : ", response);
            search.mysearch = response;
        })
    }
}

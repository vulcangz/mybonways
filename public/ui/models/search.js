import m from 'mithril';

export var search = {
    searchData:"",
    mysearch: [],
    searchFor: function () {
        // search for a particular area
        console.log("search data: ", encodeURI(search.searchData))
        m.request({
            method: "GET",
            url: "/api/search/area/" + encodeURI(search.searchData),
            data:{}
        }).then(function(response) {
            console.log("response : ", response);
            // search.mysearch = response;
        })
    }
}
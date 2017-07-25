import m from 'mithril';

export var PromosModel = {
    AllPromos : [],
    GetAll : function() {
        return m.request({
            method: "GET",
            url: "/api/admins/promos"
        }).then(function(response) {
            PromosModel.AllPromos = response;
        })
    }
}
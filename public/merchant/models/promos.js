import m from 'mithril';
/*
    {
  "item_name":"my item"
  "company_id":"calli"
  "category":"cat"
  "old_price":2000
  "new_price":1000
  "start_date":"2017-06-14T20:00:05.869Z"
  "end_date":"2017-06-14T20:00:05.869Z"
  "description":"description_one"
  "images":[]
}
*/


export var Promos = {
    itemID:{},
    AllPromos: [],
    NewPromo: {},
    GetAllPromos: function() {
        return m.request({
            method: "GET",
            url: "/api/merchants/promo"
        }).then(function(response) {
            console.log("get promo Response: ", response);
            Promos.AllPromos = response
            m.redraw()
            // if successful, add the new promo to the promo list
        })
    },
    SaveNew: function() {
        // TODO:: Save a new promo.
        return m.request({
            method: "POST",
            url: "/api/merchants/promo",
            data: Promos.NewPromo
        }).then(function(response) {
            console.log("New promo Response: ", response);
            // if successful, add the new promo to the promo list
        })
    },
    Update: function(promo) {
        console.log("Updated promo: ",promo);
        return m.request({
            method: "PUT",
            url: "/api/merchants/promo/" + promo.id,
            data: promo
        }).then(function(response) {
            console.log(response);
        })
    }
}

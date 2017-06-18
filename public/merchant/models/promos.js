import m from 'mithril';

function genFakePromos(n) {
    var fakePromos = [];
    for (var i = 1; i < n; i++) {
        var p = {};
        p.ID = i;
        p.Name = "Name " + i;
        p.Category = "Category " + i;
        p.OldPrice = 1000 * i;
        p.NewPrice = p.OldPrice - 500;
        p.Description = "Description " + i;
        p.StartDate = "12/09/2017";
        p.EndDate = "19/09/2017";

        fakePromos.push(p);
    }
    return fakePromos;
}
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
    AllPromos: genFakePromos(5),
    NewPromo: {},
    GetAllPromos: function() {
        // TODO:: Get All Promos from DB
    },
    SaveNew: function() {
        // TODO:: Save a new promo.
        return m.request({
            method: "POST",
            url: "/api/merchant/promo",
            data: Promos.NewPromo
        }).then(function(response) {
            console.log("New promo Response: ", response);
            // if successful, add the new promo to the promo list
        })
    },
    Update: function(promo) {
        console.log(promo);
        m.request({
            method: "PUT",
            url: "/api/merchant/promo",
            data: promo
        }).then(function(response) {
            console.log(response);
        })
    }
}

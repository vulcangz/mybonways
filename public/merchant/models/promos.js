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
            url: "/api/promo",
            data: Promos.NewPromo
        }).then(function(response) {
            console.log("New promo Response: ", response);
            // if successful, add the new promo to the promo list
        })
    }
}

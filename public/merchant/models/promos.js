function samplePromo() {
    this.Name = "";
    this.Category = "";
    this.OldPrice = 0;
    this.NewPrice = 0;
    this.Description = "";
    this.StartDate = "";
    this.EndDate = "";
}

function genFakePromos(n) {
    var fakePromos = [];
    for (var i = 1; i < n; i++) {
        var p = new samplePromo();
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

    GetAllPromos: function() {
        // TODO:: Get All Promos from DB
    }
}
import m from 'mithril';

export var LocationModel = {
    NewCountry: {},
    NewCity: {},
    Neighbourhood: {},
    AddCountry: () => {
        m.request({
            method: "POST",
            url: "/api/admins/locations/country",
            data: LocationModel.NewCountry
        }).then((response) => {
            console.log("Add country response: ", response);
        }).catch((error) => {
            console.error("Add country error: ", error);
        })
    },
    AddCity: () => {
        m.request({
            method: "POST",
            url: "/api/admins/locations/addcity",
            data: {}
        }).then((response) => {
            console.log("Add city response: ", response);
        }).catch((error) => {
            console.error("Add city error: ", error);
        })
    },
    AddNeighbourhood: () => {
        m.request({
            method: "POST",
            url: "/api/admins/locations/addneighbourhood",
            data: {}
        }).then((response) => {
            console.log("Add neighbourhood response: ", response);
        }).catch((error) => {
            console.error("Add neighbourhood error: ", error);
        })
    }
}
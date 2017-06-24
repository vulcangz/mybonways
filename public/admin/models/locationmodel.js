import m from 'mithril';

export var LocationModel = {
    NewLocation: {},
    AddLocation: () => {
        m.request({
            method: "POST",
            url: "/api/admins/locations/neighbourhood",
            data: LocationModel.NewLocation
        }).then((response) => {
            console.log("Add location response: ", response);
        }).catch((error) => {
            console.error("Add location error: ", error);
        })
    }
}
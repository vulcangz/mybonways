import m from 'mithril';
// import {branch} from "./branches.js";

export var LocationModel = {
    NewLocation: {},
    AddLocation: () => {
        return m.request({
            method: "POST",
            url: "/api/admins/locations/neighbourhood",
            data: LocationModel.NewLocation
        }).then((response) => {
            console.log("Add location response: ", response);
        })
    },
    AllCountries: [],
    AllCities: [],
    AllNeighbourhoods: [],
    LocationUpdate: {},
    NewLocationUpdate: {},
    UpdateNeighbourhood: () => {
        if (!LocationModel.NewLocationUpdate.neighbourhood) return new Promise((resolve, reject) => reject("No neighbourhood changes") )
        var location = LocationModel.LocationUpdate
        return m.request({
            method: "PUT",
            url: "/api/locations/neighbourhood?country="
            + location.country + "&city=" + location.city + "&neighbourhood=" + location.neighbourhood,
            data: LocationModel.NewLocationUpdate
        }).then((response) => {
            console.log("Update location response: ", response)
        }).catch((error) => {
            console.error("Update Location Error: ", error)
        })
    },
    UpdateCountry: () => {
        if (!LocationModel.NewLocationUpdate.country) return new Promise((resolve, reject) => reject("No country changes") )
        return m.request({
            method: "PUT",
            url: "/api/locations/country?country=" + LocationModel.LocationUpdate.country,
            data: LocationModel.NewLocationUpdate
        }).then((response) =>{
            console.log("Update Country Response: ", response);
            LocationModel.GetCountries();
        })
    },
    UpdateCity: () => {
        if (!LocationModel.NewLocationUpdate.city) return new Promise((resolve, reject) => reject("No city changes") )
            
        return m.request({
            method: "PUT",
            url: "/api/locations/city?country=" + LocationModel.LocationUpdate.country + "&city=" + LocationModel.LocationUpdate.city,
            data: LocationModel.NewLocationUpdate
        }).then((response) =>{
            console.log("Update city Response: ", response);
        })
    },
    GetCountries: () => {
        return m.request({
            method: "GET",
            url: "/api/locations/countries"
        }).then((response)=>{
            console.log("response: ", response)
            LocationModel.AllCountries = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    },
    GetCities: (country) => {
        return m.request({
            method: "GET",
            url: "/api/locations/cities?country=" + country
        }).then((response)=>{
            console.log("response: ", response)
            LocationModel.AllCities = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    },
    GetNeighbourhoods: () => {
        return m.request({
            method: "GET",
            url: "/api/locations/neighbourhood?country=" + LocationModel.LocationUpdate.country + "&city=" + LocationModel.LocationUpdate.city
        }).then((response)=>{
            console.log("response: ", response)
            LocationModel.AllNeighbourhoods = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    }
}
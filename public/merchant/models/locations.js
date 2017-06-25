import m from 'mithril';
import {br} from "./branches.js";

export var Locations = {
    AllCountries: [],
    AllCities: [],
    AllNeighbourhoods: [],
    GetCountries: () => {
        return m.request({
            method: "GET",
            url: "/api/locations/countries"
        }).then((response)=>{
            console.log("response: ", response)
            Locations.AllCountries = response;
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
            Locations.AllCities = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    },
    GetNeighbourhoods: () => {
        return m.request({
            method: "GET",
            url: "/api/locations/neighbourhood?country=" + br.NewBranch.country + "&city=" + br.NewBranch.city
        }).then((response)=>{
            console.log("response: ", response)
            Locations.AllNeighbourhoods = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    }
}
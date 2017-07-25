import m from "mithril";
import { branch } from "../models/branches.js";
import iziToast from 'iziToast';
import {Locations} from '../models/locations.js';
import { isEmptyObject } from "../../util/utils.js";

var EditBranch = {
	oncreate: function(vnode) {
		EditBranch.state.loader = true;
		branch.GetBranch(vnode.attrs.id).then(function() {
			EditBranch.state.loader = false;
			Locations.GetCountries().then(function() {
				Locations.GetCities(branch.editBranch.country).then(function(){
					Locations.GetNeighbourhoods(branch.editBranch.country, branch.editBranch.city);
				})
			})
		}).catch(function() {
			EditBranch.state.loader = false;
		})
	},
	state: {
		buttonloader: false,
		loader: true
	},
	onremove: function() {
		branch.editBranch = {}
	},
	view: function(vnode) {
		return (
			<section class="">
				<div class="ph4 pv4 bg-white shadow-m2 ">
					<div class="">
						<span class="fw6 f3">Edit This Branch </span>
					</div>
				</div>
				<div class="pa3 pa4-ns bg-white shadow-m2 mt3 cf">
					{!isEmptyObject(branch.editBranch)?
					<div class="">
						<div class="pa2">
							<label class="f4 gray pv2 dib">Address:</label>
							<br />
							<input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.address = value;
								})}
								value={branch.editBranch.address}
							/>
						</div>
						<div class="pa2">
							<label class="f4 gray pv2 dib">Country:</label>
							<br />
							<select class="ba b--light-silver w-100 pa2 bw1"
							onchange={m.withAttr("value", function(value) {
									branch.editBranch.country = value;
									Locations.GetCities(value);
								})}>
								<option disabled> -- Select One -- </option>
								{Locations.AllCountries.map(function(country, i) {
									return (
										<option value={country.country} selected={(branch.editBranch.country == country.country)? "selected": ""}>{country.country}</option>
									)
								})}
							</select>
							{/* <input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.country = value;
								})}
								value={branch.editBranch.country}
							/> */}
						</div>
						<div class="pa2">
							<label class="f4 gray pv2 dib">City:</label>
							<br />
							<select class="ba b--light-silver w-100 pa2 bw1"
							onchange={m.withAttr("value", function(value) {
									branch.editBranch.city = value;
									Locations.GetNeighbourhoods(branch.editBranch.country, branch.editBranch.city);
								})}>
								<option disabled> -- Select One -- </option>
								{Locations.AllCities.map(function(city, i) {
									return (
										<option value={city.city} selected={(branch.editBranch.city == city.city)? "selected": ""}>{city.city}</option>
									)
								})}
							</select>
							{/* <input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.city = value;
								})}
								value={branch.editBranch.city}
							/> */}
						</div>
						<div class="pa2">
							<label class="f4 gray pv2 dib">Neighbourhood:</label>
							<br />
							<select class="ba b--light-silver w-100 pa2 bw1"
							onchange={m.withAttr("value", function(value) {
									branch.editBranch.neighbourhood = value;
								})}>
								<option disabled> -- Select One -- </option>
								{Locations.AllNeighbourhoods.map(function(neighbourhood, i) {
									return (
										<option value={neighbourhood.neighbourhood} selected={(branch.editBranch.neighbourhood == neighbourhood.neighbourhood)? "selected": ""}>{neighbourhood.neighbourhood}</option>
									)
								})}
							</select>
							{/* <input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.neighbourhood = value;
								})}
								value={branch.editBranch.neighbourhood}
							/> */}
						</div>
						{/* <h4>Location Area</h4>
						<div class="pa2">
							<label class="f4 gray pv2 dib">Area:</label>
							<br />
							<input
								type="text"
								class="ba b--light-silver w-100 pa2 bw1"
								oninput={m.withAttr("value", function(value) {
									branch.editBranch.location.area = value;
								})}
								value={branch.editBranch.area}
							/>
						</div> */}

						<div class="pa2  pv3 mt2 tr">
							<button
								class=" ph3 pv2 w5 bg-navy white-90 grow pointer no-underline shadow-4 bw0 "
								onclick={function() {
									EditBranch.state.buttonloader = true;
									branch.UpdateBranch().then(function(){
										iziToast.success({
											title: 'Success',
											message: "Branch successfully updated",
											position: 'topRight'
										});
										EditBranch.state.buttonloader = false;
									}).catch(function() {
										iziToast.error({
											title: 'Error',
											message: "Could not update this branch.",
											position: 'topRight'
										});
										EditBranch.state.buttonloader = false;
									})
								}}
							>
								{EditBranch.state.buttonloader? <div class="loader"></div>:"Update Branch"}
							</button>
						</div>
					</div>:""}
					<div class="tc">
						{EditBranch.state.loader?<div class="loader" style="color: red"></div>:""}
					</div>
				</div>
			</section>
		);
	}
};

export default EditBranch;

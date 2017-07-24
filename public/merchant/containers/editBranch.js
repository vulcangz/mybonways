import m from "mithril";
import { branch } from "../models/branches.js";

var EditBranch = {
	oninit: function(vnode) {
		branch.GetBranch(vnode.attrs.id);
		console.log("oninit callled");
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
						<label class="f4 gray pv2 dib">City:</label>
						<br />
						<input
							type="text"
							class="ba b--light-silver w-100 pa2 bw1"
							oninput={m.withAttr("value", function(value) {
								branch.editBranch.city = value;
							})}
							value={branch.editBranch.city}
						/>
					</div>
					<div class="pa2">
						<label class="f4 gray pv2 dib">State:</label>
						<br />
						<input
							type="text"
							class="ba b--light-silver w-100 pa2 bw1"
							oninput={m.withAttr("value", function(value) {
								branch.editBranch.state = value;
							})}
							value={branch.editBranch.state}
						/>
					</div>
					<div class="pa2">
						<label class="f4 gray pv2 dib">Country:</label>
						<br />
						<input
							type="text"
							class="ba b--light-silver w-100 pa2 bw1"
							oninput={m.withAttr("value", function(value) {
								branch.editBranch.country = value;
							})}
							value={branch.editBranch.country}
						/>
					</div>
					<h4>Location Area</h4>
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
					</div>

					<div class="pa2  pv3 mt2 tr">
						<button
							class=" ph3 pv2 bg-navy white-90 grow pointer no-underline shadow-4 bw0 "
							onclick={function() {
								branch.UpdateBranch().then(function(){
									iziToast.success({
										title: 'Success',
										message: "Branch successfully updated",
										position: 'topRight'
									});
								}).catch(function() {
									iziToast.error({
										title: 'Error',
										message: "Could not update this branch.",
										position: 'topRight'
									});
								})
							}}
						>
							Update Branch
						</button>
					</div>
				</div>
			</section>
		);
	}
};

export default EditBranch;

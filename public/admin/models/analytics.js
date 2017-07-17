import m from "mithril";

export var Analytics = {
	Data: {},
	GetAnalytics: () => {
		return m
			.request({
				method: "GET",
				url: "/api/admins/analytics"
			})
			.then(function(response) {
				console.log("analytics response: ", response);
				Analytics.Data = response;
			})
			.catch(function(error) {
				console.error(error);
			});
	}
};

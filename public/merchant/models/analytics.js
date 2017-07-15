import m from "mithril";

export var Analytics = {
  	Data: {
		  UnapprovedListingsCount: 0,
		  ListingsCount: 0,
		  UsersCount: 0
	},
	GetAnalytics: () => {
		return  m.request({
				method: 'GET',
				url: '/api/merchants/analytics',
			}).then(function(response) {
				console.log("analytics response: ", response)
				Analytics.Data = response;
			}).catch(function(error) {
				console.error(error);
		});
	}
}

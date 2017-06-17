import m from 'mithril';
export var br = {
    NewBranch:{},
    AllBranches:[],
    GetAllBranches : function() {
        // TODO :: GET all my branches
        m.request({
            method: "GET",
            url: "/api/merchant/branch",
            data:{}
        }).then(function(response) {
            console.log("all branches: ", response);
            br.AllBranches = response;
        })
    },
    SaveNewBranch: function() {
        console.log("new branch: ", this.NewBranch);
    }
}
import m from 'mithril';

export var br = {
    NewBranch:{
        location:{}
    },
    AllBranches:[],
    editBranch:{},
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
        m.request({
            method:"POST",
            url:"/api/merchant/branch",
            data: this.NewBranch
        }).then(function(response) {
            console.log(response);
            this.AllBranches.push(response);
            // m.redraw()
        })
    },
    EditBranch: function() {
        // edit a branch
    },
    GetBranch: (id) => {
        m.request({
            method: "GET",
            url: "/api/merchant/branch/" + String(id),
            data:{}
        }).then(function(response) {
            console.log(response);
            br.editBranch = response
        })
    },
    UpdateBranch: () => {
        m.request({
            method: "PUT",
            url: "/api/merchant/branch",
            data: br.NewBranch
        }).then(function(response) {
            console.log("response: ", response);
            // display success message
        })
    }
}
import m from 'mithril';

export var branch = {
    NewBranch:{
        location:{}
    },
    AllBranches:[],
    editBranch:{},
    GetAllBranches : function() {
        // TODO :: GET all my branches
        m.request({
            method: "GET",
            url: "/api/merchants/branch",
            data:{}
        }).then(function(response) {
            console.log("all branches: ", response);
            branch.AllBranches = response;
        })
    },
    SaveNewBranch: function() {
        console.log("new branch: ", branch.NewBranch);
        return m.request({
            method:"POST",
            url:"/api/merchants/branch",
            data: branch.NewBranch
        }).then(function(response) {
            console.log(response);
            branch.AllBranches.push(response);
            // m.redraw()
        })
    },
    EditBranch: function() {
        // edit a branch
    },
    GetBranch: (id) => {
        m.request({
            method: "GET",
            url: "/api/merchants/branch/" + String(id),
            data:{}
        }).then(function(response) {
            console.log(response);
            branch.editBranch = response
        })
    },
    UpdateBranch: () => {
        m.request({
            method: "PUT",
            url: "/api/merchants/branch/" + branch.editBranch.id,
            data: branch.editBranch
        }).then(function(response) {
            console.log("response: ", response);
            // display success message
        })
    },
    DeleteBranch: function(id, i) {
        console.log("delete: ", id)
        m.request({
            method: "DELETE",
            url: "/api/merchants/branch/" + id,
            data: {}
        }).then(function(response) {
            console.log("delete: ", response);
            if (response.hasOwnProperty("id")) {
                if(i > -1) {
                    branch.AllBranches.splice(i, 1);
                    m.redraw()
                }
            }
        })
    }
}

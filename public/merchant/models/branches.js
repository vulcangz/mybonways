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
        console.log("new branch: ", br.NewBranch);
        m.request({
            method:"POST",
            url:"/api/merchant/branch",
            data: br.NewBranch
        }).then(function(response) {
            console.log(response);
            br.AllBranches.push(response);
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
            url: "/api/merchant/branch/" + br.editBranch.id,
            data: br.editBranch
        }).then(function(response) {
            console.log("response: ", response);
            // display success message
        })
    },
    DeleteBranch: function(id, i) {
        console.log("delete: ", id)
        m.request({
            method: "DELETE",
            url: "/api/merchant/branch/" + id,
            data: {}
        }).then(function(response) {
            console.log("delete: ", response);
            if (response.hasOwnProperty("id")) {
                if(i > -1) {
                    br.AllBranches.splice(i, 1);
                    m.redraw()
                }
            }
        })
    }
}
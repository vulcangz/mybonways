import m from 'mithril';

export var Comment = {
    MyComment: {},
    AllComments: [],
    Add: function() {
        return m.request({
            method: "POST",
            url: "/api/comments",
            data: Comment.MyComment
        }).then(function(response) {
            console.log("comment response: ", response);
        })
    },
    GetAllComments: function(promo_id) {
        return m.request({
            method: "GET",
            url: "/api/comments/"+ promo_id,
        }).then(function(response) {
            console.log("All comments response: ", response)
            if (response) {
                Comment.AllComments = response;
            }
        })
    }
}
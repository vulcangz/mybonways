import m from 'mithril';

export var UserModel = {
    signupData: {},
    Signup: function() {
        console.log("signup: ", UserModel.signupData);
        return m.request({
            url: "/api/merchants",
            method: "POST",
            data: UserModel.signupData
        }).then(function(response) {
            console.log("response: ", response);
        })
    }
}
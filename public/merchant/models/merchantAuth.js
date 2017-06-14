import m from 'mithril';
import localforage from 'localforage';

export var MerchantModel = {
    Merchant: {},
    Token: ""
}

export var MerchantLogin = {
    Merchant: {},
    Submit: function() {
        console.log(MerchantLogin.Merchant);
        
        return m.request({
            url: "/api/merchants/login",
            method: "POST",
            data: MerchantLogin.Merchant
        }).then(function(response) {
            console.log("Merchant login response: ", response);
        })
    }
}
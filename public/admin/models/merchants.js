import m from 'mithril';

export var MerchantsModel = {
    AllMerchants:[],
    Merchant: {},
    GetAllMerchants: function() {
        return m.request({
            method: 'GET',
            url: '/api/admins/merchants',
            data: {}
        }).then(function(response) {
            console.log("get merchants response:", response);
            MerchantsModel.AllMerchants = response;
            m.redraw();
        }).catch(function(error) {
            console.error(error);
        })
    },
    GetMerchant: function(id) {
        return m.request({
            method: 'GET',
            url: '/api/admins/merchants/' + id,
            data: {}
        }).then(function(response) {
            console.log("getmerchant reponse: ", response);
            MerchantsModel.Merchant = response;
        }).catch(function(error) {
            console.error("getmerchant err:", error);
        })
    },
    DeleteMerchant: function(MerchantID) {
        console.log("delete merchant: ". MerchantID);
        // m.request({
        //     method: "DELETE",
        //     url: "/api/admins/merchants/" + MerchantID,
        //     data: {}
        // }).then(function(response) {
        //     console.log("delete response: ", response);
        // }).catch(function(error){
        //     console.log("Delete Merchant error: ", error);
        // })
    }

}
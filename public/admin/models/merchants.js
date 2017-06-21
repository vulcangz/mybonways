import m from 'mithril';

export var MerchantsModel = {
    AllMerchants:[],
    GetAllMerhcants: function() {
        return m.request({
            method: 'GET',
            url: '/api/admins/merchants',
            data: {}
        }).then(function(response) {
            console.log(response);
            MerchantsModel.AllMerchants = response;
            m.redraw();
        }).catch(function(error) {
            console.error(error);
        })
    },
    GetMerchant: function(key) {
        return m.request({
            method: 'GET',
            url: '/api/admin/merchants/' + MerchantsModel.AllMerchants[key].id,
            data: {}
        }).then(function(response) {
            console.log(response);

        }).catch(function(error) {
            console.error(error);
        })
    }

}
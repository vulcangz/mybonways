import m from 'mithril';

export var Promos = {
    FeaturedPromos : [],
    Promo: {promo_images:""},
    PromoMerchant: {},
    GetFeaturedPromos: () => {
        return m.request({
            method: "GET",
            url: "/api/featuredpromos",
        }).then((response) => {
            console.log("featured promos response:", response);
            Promos.FeaturedPromos = response;
        }).catch((error) => {
            console.error("featured promos error: ", error)
        })
    },
    GetPromo: (slug) => {
        return m.request({
            method: "GET",
            url: "/api/promo/" + slug
        }).then((response) => {
            console.log("Promo details response: ", response);
            Promos.Promo = response;
            m.redraw();
            Promos.GetPromoMerchant(response.company_id);
        }).catch((error) => {
            console.error("promos details error: ", error)
        })
    },
    GetPromoMerchant: (company_id) => {
        return m.request({
            method: "GET",
            url: "/api/merchant/" + company_id
        }).then((response) => {
            console.log("Promo merchant response: ", response);
            Promos.PromoMerchant = response;
        }).catch((error) => {
            console.error("Promos merchant error: ", error)
        })
    }
}
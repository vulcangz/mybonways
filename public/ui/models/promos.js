import m from 'mithril';
import {UserModel} from './user.js';

export var Promos = {
    FeaturedPromos : [],
    PromoBranches: [],
    Promo: {promo_images:"", reservation: {}},
    PromoMerchant: {},
    Page: 1,
    GetFeaturedPromos: () => {
        return m.request({
            method: "GET",
            url: "/api/featuredpromos",
        }).then((response) => {
            console.log("featured promos response:", response);
            Promos.FeaturedPromos = response;
            Promos.GetBranches();
        }).catch((error) => {
            console.error("featured promos error: ", error)
        })
    },
    LoadMore: () => {
        return m.request({
            method: "GET",
            url: "/api/featuredpromos/" + ++Promos.Page
        }).then((response) => {
            console.log("more promos: ", response);
            if(response.length > 0 ) {
                Promos.FeaturedPromos.push.apply(Promos.FeaturedPromos, response);
                // Promos.FeaturedPromos = Promos.FeaturedPromos.concat(response);
            }
            
        }).catch((error) => {
            console.error("more promos Error: ", error);
        })
    },
    GetPromo: (slug) => {
        return m.request({
            method: "GET",
            url: "/api/promo/" + slug
        }).then((response) => {
            console.log("Promo details response: ", response);
            Promos.GetPromoMerchant(response.company_id);
            Promos.Promo = response;
            // if user is logged in check if he has reserved this promo.
            UserModel.GetUserfromStorage().then(() => {
                UserModel.isReserved(Promos.Promo.id).then((response) => {
                    Promos.Promo.reservation = response;
                })
            }).catch((error) => {
                console.error(error)
            })
            m.redraw();
            Promos.GetPromoMerchant(response.company_id);
            Promos.GetBranches();

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
    },
    GetBranches: () => {
        return m.request({
            method: "GET",
            url: "/api/promo/branches/" + Promos.Promo.company_id
        }).then((response) => {
            console.log("Promo branches response: ", response);
            Promos.PromoBranches = response;
        })
    },
    Reserve: (id) => {
        console.log("Reserve this promo. UserID: ", id);
        return m.request({
            method: "POST",
            url: "/api/reservations",
            data: {user_id: id, promo_id: Promos.Promo.id, promo_slug: Promos.Promo.slug, company_id: Promos.Promo.company_id}
        }).then((response) => {
            console.log("reserve response: ", response);
            Promos.Promo.reservation = response;
        })
    },
    unReserve: () => {
        console.log("unreserve: ");
        return m.request({
            method: "DELETE",
            url: "/api/reservations/" + Promos.Promo.reservation.id,
            // data: Promos.Promo
        }).then((response) => {
            console.log("delete reservation response: ", response);
            Promos.Promo.reservation = {};
            m.redraw();
        }).catch((error) => {
            console.log("delete reservation error: ", error)

        })
    }
}
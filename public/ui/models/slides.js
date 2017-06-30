import m from 'mithril';

export var Slides = {
    AllSlides: [],
    GetAllSlides: () => {
        return m.request({
            method: "GET",
            url: "/api/slides"
        }).then((response) => {
            console.log("slides response: ", response);
            Slides.AllSlides = response;
        })
    }
}
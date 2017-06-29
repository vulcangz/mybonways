import m from 'mithril';

export var Slides = {
    NewSlide: {},
    AllSlides: [],
    AddNewSlide: () => {
        console.log("New Slide: ", Slides.NewSlide);
        return m.request({
            method: "POST",
            url: "/api/admins/slides",
            data: Slides.NewSlide
        }).then((response)=>{
            console.log("created slide: ", response);
            Slides.AllSlides.push(response);
            m.route.set("/admins/slider");
        })
    },
    GetAllSlides: () => {
        return m.request({
            method: "GET",
            url: "/api/admins/slides"
        }).then((response) => {
            console.log("slides response: ", response);
            Slides.AllSlides = response;
        })
    }
}
import m from 'mithril';

export var Slides = {
    NewSlide: {},
    Slide: {},
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
    },
    GetSlide: (id) => {
        return m.request({
            method: "GET",
            url: "/api/admins/slides/" + id
        }).then((response)=>{
            console.log("Slide response: ", response);
            Slides.Slide = response;
        })
    },
    Update: () => {
        return m.request({
            method: "PUT",
            url: "/api/admins/slides/" + Slides.Slide.id,
            data: Slides.Slide
        }).then((response) => {
            console.log("Update response: ", response);
        })
    },
    DeleteSlide: (id) => {
        return m.request({
            method: "DELETE",
            url: "/api/admins/slides/" + id
        }).then((response) => {
            console.log("Delete slide response: ", response);
            Slides.GetAllSlides();
        })
    }
}
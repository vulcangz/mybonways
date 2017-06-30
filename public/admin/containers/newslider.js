import m from 'mithril';
import { Slides } from '../models/slides.js';

var NewSlider = {
    ImageChange: function (files) {

        if (/\.(jpe?g|png|gif)$/i.test(files[0].name)) {
            let reader = new FileReader();
            reader.addEventListener("load", (e) => {
                //  downscaleImage(e.target.result,1200,"image/jpeg",0.7,(compressed)=>{ Promos.NewPromo.images.push(compressed)
                //  console.log(Promos.NewPromo)
                // })
                Slides.NewSlide.image = e.target.result
                m.redraw()
                console.log(Slides.NewSlide)

            }, false);

            reader.readAsDataURL(files[0]);
        } else {
            // TODO:: LET THE USER KNOW THE RULES
            NewSlider.Error = "Image must be either jpg, jpeg, png or gif format.";
        }
    },
    SaveSlide: () => {
        if(!Slides.NewSlide.image || !Slides.NewSlide.url) {
            NewSlider.Error = "Please fill out all the fields.";
            return;
        }
        NewSlider.Error = "";
        NewSlider.loader = true;
        Slides.AddNewSlide().then(()=>{
            NewSlider.loader = false;
            Slides.NewSlide = {}
        }).catch((error) => {
            NewSlider.loader = false;
            NewSlider.Error = "Could not save this slide...Try again later.";
        })
    },
    Error: "",
    loader: false,
    view: (vnode) => {
        return (
            <section>
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span class="fw6 f3">Add A New Slider </span>
                    </div>
                </div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
                    {NewSlider.Error ? <p class="bg-red white mv0 pa2 tc">{NewSlider.Error}</p> : ""}
                    <div class="">
                        <p>Promo/Advert URL</p>
                        <input type="url" placeholder="" class="ba b--gray bw1 pa2 w-100"
                            oninput={m.withAttr("value", (value) => {
                                Slides.NewSlide.url = value;
                            })} />
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Slide Featured Image:</label>
                        <div class=" w-100 ">
                            <label for="featuredImageInput" class="pointer w-100  dib ba b--dashed tc pa3">
                                <p>Drag and Drop image here, or<br /> click to select image</p>
                            </label>
                            <input type="file" name="featuredImageInput" id="featuredImageInput" class="dn" onchange={m.withAttr("files", NewSlider.ImageChange)} />

                            {Slides.NewSlide.image ?
                                <div id="preview" class="mv3 cf ">
                                    <img class="fl w-25" src={Slides.NewSlide.image} alt="image" />
                                </div> : ""}
                        </div>
                    </div>
                    {/*<div class="mv1">
                        <p>OR URL to the image...</p>
                        <input type="url" placeholder="" class="ba b--gray bw1 pa2 w-100"
                        oninput={m.withAttr("value", (value) => {
                            Slides.NewSlide.imageurl = value;
                        })}/>
                    </div>*/}
                    <div class="tr">
                        <button class="bg-navy white grow pa2 w3 ba b--transparent mh2 pointer" onclick={() => {
                            NewSlider.SaveSlide();
                        }}>{NewSlider.loader ? m(".loader") : "ADD" }</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default NewSlider;
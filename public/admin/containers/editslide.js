import m from 'mithril';
import { Slides } from '../models/slides.js';

var EditSlide = {
    oncreate: (vnode) => {
        Slides.GetSlide(vnode.attrs.id);
    },
    ImageChange: (files) =>{
        if (/\.(jpe?g|png|gif)$/i.test(files[0].name)) {
            let reader = new FileReader();
            reader.addEventListener("load", (e) => {
                //  downscaleImage(e.target.result,1200,"image/jpeg",0.7,(compressed)=>{ Promos.NewPromo.images.push(compressed)
                //  console.log(Promos.NewPromo)
                // })
                Slides.Slide.image = e.target.result
                m.redraw()
                console.log(Slides.Slide)

            }, false);

            reader.readAsDataURL(files[0]);
        } else {
            // TODO:: LET THE USER KNOW THE RULES
            EditSlide.Error = "Image must be either jpg, jpeg, png or gif format.";
        }
    },
    UpdateSlide: () => {
        if (!Slides.Slide.url || !Slides.Slide.image) {
            EditSlide.Error = "All fields must be filled.";
            return;
        }
        EditSlide.Error = "";
        EditSlide.loader = true;
        Slides.Update().then(()=>{
            EditSlide.Error = "";
            EditSlide.loader = false;
        }).catch((error) => {
            EditSlide.Error = "An error occured while updating, try again.";
            EditSlide.loader = false;
        })
    },
    Error: "",
    loader: false,
    view: () => {
        return (
            <section>
                <div class="ph4 pv4 bg-white shadow-m2 ">
                    <div class="">
                        <span class="fw6 f3">Edit Slide </span>
                    </div>
                </div>
                <div class="pa3 bg-white shadow-m2 mt3 cf">
                    {EditSlide.Error ? <p class="bg-red white mv0 pa2 tc">{EditSlide.Error}</p> : ""}
                    <div class="">
                        <p>Promo/Advert URL</p>
                        <input type="url" placeholder="" class="ba b--gray bw1 pa2 w-100"
                            oninput={m.withAttr("value", (value) => {
                                Slides.Slide.url = value;
                            })}
                            value={Slides.Slide.url}/>
                    </div>
                    <div class="pa2">
                        <label class="f4 gray pv2 dib">Slide Featured Image:</label>
                        <div class=" w-100 ">
                            <label for="featuredImageInput" class="pointer w-100  dib ba b--dashed tc pa3">
                                <p>Drag and Drop image here, or<br /> click to select image</p>
                            </label>
                            <input type="file" name="featuredImageInput" id="featuredImageInput" class="dn" onchange={m.withAttr("files", EditSlide.ImageChange)} />

                            {Slides.Slide.image ?
                                <div id="preview" class="mv3 cf ">
                                    <img class="fl w-25" src={Slides.Slide.image} alt="image" />
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
                            EditSlide.UpdateSlide();
                        }}>{EditSlide.loader ? m(".loader") : "Update" }</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default EditSlide;
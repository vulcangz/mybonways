import m from 'mithril';
import {UserModel} from '../models/user.js';
import {isEmptyObject} from '../../util/utils.js';
import Footer from '../components/footer.js';

var Favourites = {
    oncreate: () => {
        // UserModel.GetUserfromStorage();
    },
    view: (vnode) => {
        return (
            <section>
                {m.fragment(vnode.attrs, vnode.children)}
                <div class="">
                    {!isEmptyObject(UserModel.User)?
                    <section>
                        <h2 class="red-custom">Favourites</h2>
                    </section>
                    : ""}
                </div>
                <Footer/>
            </section>
        )
    }
}

export default Favourites;

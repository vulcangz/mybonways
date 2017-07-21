import m from 'mithril';
import {Comment} from '../models/comment.js';
import { Promos } from "../models/promos.js";
import { UserModel } from "../models/user.js";
import format from "date-fns/format";

var Comments = {
    state:{
        loader: false,
        error: ""
    },
    oncreate: function() {
        Comment.GetAllComments(Promos.Promo.id).then(function() {})
    },
    onremove: function() {
        Comments.state.error = "";
    },
    ValidateAndSendComment: function() {
        if (!UserModel.User.id) {
            Comments.state.error = "You must be logged in to comment.";
            return;
        }
        if (!Comment.MyComment.comment) {
            Comments.state.error = "No comment";
            return;
        }
        Comment.MyComment.user_id = UserModel.User.id;
        Comment.MyComment.promo_id = Promos.Promo.id;
        console.log("Comment: ", Comment.MyComment)
        Comments.state.loader = true;
        Comment.Add().then(function(){
            Comments.state.loader = false;
            document.getElementById("comment").value = "";
            Comment.MyComment.comment = "";
            Comment.GetAllComments(Promos.Promo.id).then(function() {})
        }).catch(function(error) {
            Comments.state.loader = false;
        })
    },
    view: function(vnode) {
        return (
            <section class="mw7">
                <div class="ph2 pv1 mv1">Comments</div>
                {Comment.AllComments.length?
                Comment.AllComments.map(function(c, i) {
                    return (
                        <div class="ph3 pv1 mv1 cf bb b--light-gray">
                            <div class="fl w2 h2">
                                <img alt="image" src="/assets/img/user.jpg"/>
                            </div>
                            <div class="fl pl4">
                                <p class="mv0">{c.user.full_name + " : " + format(c.comment.created_at, "YYYY-MM-DD h:mm a")}</p>
                                <p class="f3 mv0 pa1">{c.comment.comment}</p>
                            </div>
                        </div>
                    )
                })
                :""}
                <div class="ph3 pv1 mv1">
                    {Comments.state.error?<p class="red mv0 pa1">{Comments.state.error}</p>:""}
                    <textarea id="comment" class="w-100 mw-100 h3 pa2"
                        oninput={m.withAttr("value", function(value) {
                            Comment.MyComment.comment = value;
                        })}>
                    </textarea>
                    <div class="cf">
                        <button class="pa2 w4 bg-navy br1 white ba b--transparent fr"
                            onclick={function() {
                                Comments.ValidateAndSendComment();
                            }}
                        >{Comments.state.loader? <div class="loader"></div>:"Comment"}</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default Comments;
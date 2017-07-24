import m from 'mithril';
import {Comment} from '../models/comment.js';
import { Promos } from "../models/promos.js";
import { UserModel } from "../models/user.js";
import format from "date-fns/format";
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import iziToast from 'iziToast';

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
            iziToast.error({
                title: 'Error',
                message: "You must be logged in to comment",
                position: 'bottomRight',
                color: "red"
            });
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
            iziToast.success({
                title: 'Successs',
                message: "Comment successfully added.",
                position: 'bottomRight',
            });
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
                <div class="ph1 pv1 mv1">Comments</div>
                  <div class="ph1 pv1 mv1">
                      {Comments.state.error?<p class="red mv0 pa1">{Comments.state.error}</p>:""}
                      <textarea id="comment" class="w-100 mw-100 h3 pa2 ba b--light-gray"
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
                  <section class="pv3">
                {Comment.AllComments.length?
                Comment.AllComments.map(function(c, i) {
                    return (
                        <div class="ph1 pv1 mv1 cf bb b--light-gray">
                            <div class="fl dib w-20 w-10-ns pa1 pa2-ns">
                                <img alt="image" src="/assets/img/user.jpg" class="w-100"/>
                            </div>
                            <div class="fl dib pl4 w-80 w-90-ns ">
                                <p class="mv0">
                                  <span>{c.user.full_name}</span> <span class="f7 fr">{distanceInWordsToNow(c.comment.created_at)} ago
                                  </span>
                                </p>
                                <p class=" mv0 pa1 f7">{c.comment.comment}</p>
                            </div>
                        </div>
                    )
                })
                :""}
              </section>
            </section>
        )
    }
}

export default Comments;

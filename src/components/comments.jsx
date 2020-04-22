import React, {useState} from "react";
import {deleteComment, getPhotoURL, getUser} from "../hooks/databaseHooks";
import { ReactComponent as DeleteButton } from "../images/clear-24px.svg";
import "../css/comments.css";

function Comments(props){
    const [commentPhoto, updateCommentPhoto] = useState("");
    let deleteButton = null;

    function getCommentPhoto(uid){
        getPhotoURL(uid).then( function (url) {
          if(url === "")
          {
            updateCommentPhoto(require("../images/louieLaker.jpg"));
          }
          else{
            updateCommentPhoto(url);
          }
        }).catch(function(error) {
          alert("There was an error fetching data. Please refresh and try again.")

        });
    }

    function removeComment()
    {
        deleteComment(props.qid, props.cid).then(function() {
            setTimeout(() => {
                window.location.reload(false)
            }, 1500);
        }).catch(function(error) {
            alert("Error with deleting comment: " + error.message);
        });
    }

    if(props.uid == getUser().uid && props.showDelete){
        deleteButton = <button className="btn btn-vote ml-1 commentDeleteButton" onClick={removeComment}><DeleteButton /></button>
    }

      return (
        <div className="">
          <hr/>
          <div className="commentMaterial">
              {deleteButton}
            <span className="">
                {props.Body}
            </span>

            <div className="commentProfile">
              <img
                  className="qcardProfileLogo"
                  src={commentPhoto}
                  alt="profilePic"
                  onLoad={ getCommentPhoto(props.uid)}
              />
              <span>{props.DisplayName}</span>
            </div>
          </div>
        </div>
      )

  }

  export default Comments;
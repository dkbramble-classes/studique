import React, {useState} from "react";
import {getPhotoURL} from "../hooks/databaseHooks";
import "../css/comments.css";

function Comments(props){
    const [commentPhoto, updateCommentPhoto] = useState("");

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

      return (
        <div className="">
          <hr/>
          <div className="commentMaterial">
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
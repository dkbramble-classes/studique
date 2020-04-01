import React, {useState} from "react";
import getPhotoURL from "../hooks/databaseHooks";

function Comments(props){
    const [commentPhoto, updateCommentPhoto] = useState("");

    if(props === undefined) {
        return null
    }

    //let comment_url = require("../images/louieLaker.jpg")

    function getCommentPhoto(uid){
        getPhotoURL(uid).then( function (url) {
          if(url === "")
          {
            updateCommentPhoto(require("../images/louieLaker.jpg"))
          }
          else{
            updateCommentPhoto(url);
          }
        }).catch(function(error) {
          console.log(error.code);
          console.log(error.message);
        });
      }


    // function getCommentPhoto(uid){
    //   getPhotoURL(uid).then( function (url) {
    //     if(url === "")
    //     {
    //       comment_url = require("../images/louieLaker.jpg")
    //     }
    //     else{
    //       comment_url = url;
    //     }
    //   }).catch(function(error) {
    //     console.log(error.code);
    //     console.log(error.message);
    //   });
    // }
    for (let [, value] of Object.entries(props)) {
      return <div className="qcardCommentsSection">
        <hr/>
        <div className="qcardRightContent">
          <span className="qcardComment">
            {value.Body}
          </span>

          <div className="qcardProfile">
            <img
                className="qcardProfileLogo"
                src={commentPhoto}
                alt="profilePic"
                onLoad={getCommentPhoto(value.uid)}
            />
            <span>{value.DisplayName}</span>
          </div>
        </div>
      </div>
    }
  }

  export default Comments;
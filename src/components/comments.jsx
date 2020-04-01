import React, {useState, useEffect} from "react";
import {getPhotoURL} from "../hooks/databaseHooks";

function Comments(props){
    const [commentPhoto, updateCommentPhoto] = useState("");

    console.log('Inside Comments Again');

    // if(props.commentContent === null || props.commentContent === undefined) {
    //     console.log('inside comments with null')
    //     return null
    // }

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
          console.log(error.code);
          console.log(error.message);
        });
    }

      return (<div className="">
               <hr/>
               <div className="">
                 <span className="">
                   {props.Body}
                 </span>

                 <div className="qcardProfile">
                   <img
                       className="qcardProfileLogo"
                       src={commentPhoto}
                       alt="profilePic"
                       onLoad={ getCommentPhoto(props.uid)}
                   />
                   <span>{props.DisplayName}</span>
                 </div>
               </div>
             </div>)

  }

  export default Comments;
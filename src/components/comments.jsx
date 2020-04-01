import React, {useState} from "react";
import {getPhotoURL} from "../hooks/databaseHooks";
import "../css/comments.css";

function Comments(props){
    const [commentPhoto, updateCommentPhoto] = useState("");

    if(props.commentContent === null || props.commentContent === undefined) {
        return null
    }

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

      return <div>
         {Object.entries(props.commentContent).map(([key, value])=>{
           return <div>
               <hr/>
               <div className="commentMaterial">
                 <span className="">
                   {value.Body}
                 </span>
       
                 <div className="commentProfile">
                   <img
                       className="qcardProfileLogo"
                       src={require("../images/louieLaker.jpg")}
                       alt="profilePic"
                       //onLoad={getCommentPhoto(value.uid)}
                   />
                   <span>{value.DisplayName}</span>
                 </div>
               </div>
             </div>
         })
         }
         </div>
      
  }

  export default Comments;
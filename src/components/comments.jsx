import React, {useState} from "react";
import {getPhotoURL} from "../hooks/databaseHooks";

function Comments(props){
    const [commentPhoto, updateCommentPhoto] = useState("");

    console.log('props inside comments', props);

    if(props.commentContent === null || props.commentContent === undefined) {
        console.log('inside comments with null')
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
           return (<div className="">
               <hr/>
               <div className="">
                 <span className="">
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
         )})
         }
         </div>
      
  }

  export default Comments;
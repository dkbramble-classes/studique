import React, { useState } from "react";
import "../css/profilePage.css";
import { getQuestionsByUser, getUid} from "../hooks/databaseHooks";
import QuestionCards from "./questionCards";

function ProfileQuestions(props) {
  //gets the functions from storage refences the image storage in firebase by the children
  //gets the download url then sets the image from firebase as the value for the imgUrl key:
    let currentQuestions = "";
    let uid = getUid();

    getQuestionsByUser(uid)
      .then(function(snapshots) {
        console.log('snapshots', snapshots)
        currentQuestions = snapshots;
        //0: {key: ___, body: ___}
        Object.entries(snapshots).forEach(item => { return <div>item</div> }); //console.log("item", item)});

      })
      .catch(function(error) {
        return (<div className="profile">There was an error. Please try again.</div>);
      });

      
  
      return <div className="profile">
      {Object.values(currentQuestions).map(item => {
        return (
          <QuestionCards
            key={item.key}
            objectId={item.objectID}
            title={item.Title}
            body={item.Body}
            rating={item.Rating}
            creationDate={item.creationDate}
            tags={item.Tags}
            userId={item.uid}
            userDisplayName={item.UserDisplayName}
            userPhoto={item.UserPhoto}
          />
        //what it doesn't have: objectID, UserPhoto
        //has extra: UpVotes
        //need to iterate over the map differently

        );
      })}
      </div>
}

export default ProfileQuestions;

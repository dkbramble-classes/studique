import React, { useState } from "react";
import "../css/profilePage.css";
import { getQuestionsByUser, getUid } from "../hooks/databaseHooks";
import QuestionCards from "./questionCards";

function ProfileQuestions() {
  //gets the functions from storage refences the image storage in firebase by the children
  //gets the download url then sets the image from firebase as the value for the imgUrl key:
  const [questions, loading] = useAsyncHook();
  console.log("questions", questions);
  console.log(typeof(questions));

  return (
    <div>
      {loading === "false" ? (
        <h3>Loading...</h3>
      ) : questions === undefined ? (
        <h3>No results found</h3>
      ) : (
        <div>
        <h3>Questions that you asked:</h3>
          { Object.entries(questions).forEach(item => { return <div>item</div> }) }
      </div>
      )}
    </div>
  );
}

function useAsyncHook() {
  const [questions, setQuestions] = React.useState();
  const [loading, setLoading] = React.useState("false");

  let uid = getUid();

  React.useEffect(() => {
    async function fetchSearch() {
      try {
        setLoading("true");
        const results = await getQuestionsByUser(uid)
          .then(function(snapshots) {
            //console.log("snapshots", snapshots);
            //0: {key: ___, body: ___}
            // Object.entries(snapshots).forEach(item => {
            //   return <div>item</div>
            // }
            //setQuestions(snapshots); //console.log("item", item)});
            setLoading("false");

            return snapshots;
          })
          .catch(function(error) {
            return (
              <div className="profile">
                There was an error. Please try again.
              </div>
            );
          });
          console.log('results', results);
          const finalResults = await results;
          setQuestions(finalResults);
          
      } catch (error) {
        setQuestions(undefined);
        setLoading("null");
      }
      
    }
    
    fetchSearch();
    
  });

  //console.log('questions', questions);

  return [questions, loading];
}

export default ProfileQuestions;

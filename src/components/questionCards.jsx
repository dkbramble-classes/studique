import React, {useState} from "react";
import "../css/questionCards.css";
import { ReactComponent as UpArrow } from "../images/keyboard_arrow_up-24px.svg";
import { ReactComponent as DownArrow } from "../images/keyboard_arrow_down-24px.svg";
import { ReactComponent as DeleteButton } from "../images/clear-24px.svg";
import { addComment, updateRating, getRatingInfo, getRating, getPhotoURL, deleteQuestion} from "../hooks/databaseHooks";
import 'firebase/storage';
import Comments from './comments';

function QuestionCards(props) {
  const [isClicked, updateClick] = useState(false);
  const [isUpVotable, updateUpVotable] = useState(true);
  const [isDownVotable, updateDownVotable] = useState(true);
  let tagList = [];
  var deleteButton = null;

  function Tags(props){
    if(props.tagname.length !== 0){
      return <div className="tags">{props.tagname}</div>
    } else {
      return null;
    }
  }
  
  if (typeof(props.cardInfo.Tags) !== 'undefined' && props.cardInfo.Tags != null) {
    var myTagList = props.cardInfo.Tags;
    tagList = myTagList.map(tag => (
      <Tags key={props.cardInfo.objectID+"tags"+tag} tagname={tag}/>
    ))
  }

  if(props.showDelete){
    deleteButton = <button className="btn btn-vote ml-1 qcardDeleteButton" onClick={removeQuestion}><DeleteButton /></button>
  }
  

  const [voteCount, updateCount] = useState(props.cardInfo.Rating);
  const colors = {
    "Neutral": "black",
    "Up": "#3944bc",
    "Down": "#d21f3c"
  };
  const [voteColor, updateColor] = useState(colors["Neutral"]);
  const [bodyInput, setBodyInput] = useState("");
  const [questionPhoto, updateQuestionPhoto] = useState("");

  const q_id = props.cardInfo.objectID;

  function handleVoteInitialization() {
    getRatingInfo(q_id).then(function (state) {

      if (state.Rating !== props.cardInfo.Rating){
        updateCount(state.Rating);
        props.cardInfo.Rating = state.Rating;
        props.handleRateUpdate(true);
      }
      updateColor(colors[state.color]);
      updateUpVotable(state.isUp);
      updateDownVotable(state.isDown);
    }).catch(function (error) {
      console.log("Error: " + error.message);
      getRating(q_id).then(function (rating) {
        if (rating !== props.cardInfo.Rating){
          updateCount(rating);
          props.handleRateUpdate(true);
        }
      })
    });
  }

  function handleClick() {
    var newClickState = isClicked === true ? false : true;
    updateClick(newClickState);
  }

  function handleUpClick(){
    if (isUpVotable){
      updateRating(q_id, "UpVotes").then(function(info){
        if (info.Rating !== props.cardInfo.Rating){
          updateCount(info.Rating);
          props.handleRateUpdate(true);
        }

        updateUpVotable(info.isUp);
        updateColor(colors[info.Color]);
        updateDownVotable(info.isDown);
      }).catch(function (error) {
        getRating(q_id).then(function (rating) {
          if (rating !== props.cardInfo.Rating){
            updateCount(rating);
            props.handleRateUpdate(true);
          }
        })
      });
    }
  }

  function handleDownClick(){
    if (isDownVotable){
      updateRating( q_id, "DownVotes").then(function(info) {
        if (info.Rating !== props.cardInfo.Rating){
          updateCount(info.Rating);
          props.handleRateUpdate(true);
        }
        updateDownVotable(info.isDown);
        updateColor(colors[info.Color]);
        updateUpVotable(info.isUp);
      }).catch(function (error) {
        console.log("Error: " + error.message);
        getRating(q_id).then(function (rating) {
          if (rating !== props.cardInfo.Rating){
            updateCount(rating);
            props.handleRateUpdate(true);
          }
        })
      });
    }
  }

  function removeQuestion()
  {
    deleteQuestion(q_id).then(function() {
      setTimeout(() => {
        window.location.reload(false)
      }, 1500);
    }).catch(function(error) {
      alert("Error with deleting question: " + error.message);
    });
  }

  function getQuestionPhoto(uid){
    getPhotoURL(uid).then( function (url) {
      if(url === "")
      {
        updateQuestionPhoto(require("../images/louieLaker.jpg"))
      }
      else{
        updateQuestionPhoto(url);
      }
    }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
  }

  function handleBodyInput(ev) {
    setBodyInput(ev.target.value);
  }

  function postComment()
  {
    if( bodyInput === "")
    {
      alert("You can't post a comment with no content.")
    }
    else
    {
      addComment(q_id, bodyInput).then(function () {
        console.log("Comment successfully added to question " + q_id);
      }).catch(function(error) {
        alert("There was an error creating this comment. Please refresh and try again.")
        console.log(error.code);
        console.log(error.message);
      });;
    }
  }

  let description;
  let hrline;
  let comments;
  let answerSection;
  let moreLink;
  handleVoteInitialization(q_id);

  const Votes = () => (
    <div className="qcardVotes ">
      <div>
        <button className="btn btn-vote ml-1" disabled={!props.isAuthed} onClick={handleUpClick}><UpArrow /></button>
      </div>
  
      <div>
      <h4 className="text-center mt-1 ml-1" style={{color: voteColor}}>{voteCount}</h4>
      </div>
  
      <div>
        <button className="btn btn-vote ml-1" disabled={!props.isAuthed} onClick={handleDownClick}><DownArrow /></button>
      </div>
    </div>
  );
  
  //create description
  if (isClicked) {
    description = (
      <div className="qcardDescription">
        {props.cardInfo.Body}
      </div>
    );
  }
  //create comments
  if (isClicked) {
    //have to do comments
    if(props.cardInfo.Comments !== undefined) {
      comments = Object.entries(props.cardInfo.Comments).map(([key, value])=>{
        return <Comments uid={value.uid} DisplayName={value.DisplayName} Body={value.Body}
                         qid={props.cardInfo.objectID} cid={key} showDelete={props.showDelete}/>
      });
    }
    
  }
  //create hrline
  if (isClicked) {
    hrline = <hr />;
  }
  //create answerSection
  if (isClicked) {
    answerSection = (
      <div>
        <h5>Add An Answer</h5>
        <div className="qcardAnswerSection">
          <form className="qcardCommentForm">
            <textarea
              className="qcardCommentTextBox"
              type="text"
              id="commentText"
              placeholder="Write comment here"
              onChange={handleBodyInput}
            />
          </form>
          <form onSubmit={(e) => {e.preventDefault(); postComment();
            setTimeout(() => {
              window.location.reload(false)
            }, 1500);}}>
            <button type="submit" id={"questionCardCommentButton"} className="text-font qcardSubmitButton" >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  //create description
  if (isClicked) {
    moreLink = <span className="moreLink" onClick = {handleClick}>See less</span>;
  }
  } else {
    moreLink = <span className="moreLink" onClick = {handleClick}>See more</span>;
  }

  return (
    <div className="qcard">
      {deleteButton}
      <div className="qcardTop">
        <Votes />

        <div className="qcardRightContent">
          <div className="qcardProfile">
            <img 
              className="qcardProfileLogo"
              src={questionPhoto}
              alt="profilePic"
              onLoad={getQuestionPhoto(props.cardInfo.UserID)}
            />
            <span>{props.cardInfo.UserDisplayName}</span>
          </div>

          <div className="qcardTitle" onClick = {handleClick}>
            <h5>{props.cardInfo.Title}</h5>
          </div>

          {description}

          <div className="qcardTags">
          {tagList} 
          </div>

          {moreLink}
        </div>
      </div>
      {comments}
      {hrline}
      {answerSection}
    </div>
  );
}


export default QuestionCards;

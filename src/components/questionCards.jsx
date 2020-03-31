import React, {useState} from "react";
import "../css/questionCards.css";
import { ReactComponent as UpArrow } from "../images/keyboard_arrow_up-24px.svg";
import { ReactComponent as DownArrow } from "../images/keyboard_arrow_down-24px.svg";
import {storage, addComment, updateRating, getRatingInfo, getRating, getPhotoURL} from "../hooks/databaseHooks";
import 'firebase/storage';

function QuestionCards(props) {
  const [isClicked, updateClick] = useState(false);
  const [isUpVotable, updateUpVotable] = useState(true);
  const [isDownVotable, updateDownVotable] = useState(true);
  var tagList = [];
  var url = 'require("../images/louieLaker.jpg")'

  function Tags(props){
    return <div className="tags">{props.tagname}</div>
  }
  
  if (typeof(props.tags) !== 'undefined' && props.tags != null) {
    var myTagList = props.tags;
    tagList = myTagList.map(tag => (
      <Tags key={props.objectId+"tags"+tag} tagname={tag}/>
    ))
  }

  if(props.userPhoto !== null && props.userPhoto !== undefined){
    url = props.userPhoto;
  }

  const [voteCount, updateCount] = useState(props.rating);
  const colors = {
    "Neutral": "black",
    "Up": "#3944bc",
    "Down": "#d21f3c"
  };
  const [voteColor, updateColor] = useState(colors["Neutral"]);
  const [bodyInput, setBodyInput] = useState("");
  const [questionPhoto, updateQuestionPhoto] = useState("");

  const q_id = props.objectId;
  // console.log('props', props);

  function handleVoteInitialization() {
    getRatingInfo(q_id).then(function (state) {
      updateCount(state.Rating);
      updateColor(colors[state.color]);
      updateUpVotable(state.isUp);
      updateDownVotable(state.isDown);
    }).catch(function (error) {
      console.log("Error: " + error.message);
      getRating(q_id).then(function (rating) {
        updateCount(rating);
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
        updateCount(info.Rating);
        updateUpVotable(info.isUp);
        updateColor(colors[info.Color]);
        updateDownVotable(info.isDown);
      }).catch(function (error) {
        console.log("Error: " + error.message);
        getRating(q_id).then(function (rating) {
          updateCount(rating);
        })
      });
    }
  }

  function handleDownClick(){
    if (isDownVotable){
      updateRating( q_id, "DownVotes").then(function(info) {
        updateCount(info.Rating);
        updateDownVotable(info.isDown);
        updateColor(colors[info.Color]);
        updateUpVotable(info.isUp);
      }).catch(function (error) {
        console.log("Error: " + error.message);
        getRating(q_id).then(function (rating) {
          updateCount(rating);
        })
      });
    }
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
      console.log("You can't post a comment with no content.")
    }
    else
    {
      addComment(q_id, bodyInput).then(function () {
        console.log("Comment successfully added to question " + q_id);
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
      });;
    }
  }

  function Comments(props){
    let comment_url = require("../images/louieLaker.jpg")

    function getCommentPhoto(uid){
      getPhotoURL(uid).then( function (url) {
        if(url === "")
        {
          comment_url = require("../images/louieLaker.jpg")
        }
        else{
          comment_url = url;
        }
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
      });
    }
    for (let [key, value] of Object.entries(props)) {
      return <div className="qcardCommentsSection">
        <Votes />
        <div className="qcardRightContent">
          <span className="qcardComment">
            {value.Body}
          </span>

          <div className="qcardProfile">
            <img
                className="qcardProfileLogo"
                src={comment_url}
                alt="profilePic"
                onLoad={getCommentPhoto(value.uid)}
            />
            <span>{value.DisplayName}</span>
          </div>
        </div>
      </div>
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
        <button className="btn btn-vote ml-1" onClick={handleUpClick}><UpArrow /></button>
      </div>
  
      <div>
      <h4 className="text-center mt-1 ml-1" style={{color: voteColor}}>{voteCount}</h4>
      </div>
  
      <div>
        <button className="btn btn-vote ml-1" onClick={handleDownClick}><DownArrow /></button>
      </div>
    </div>
  );
  
  //create description
  if (isClicked) {
    description = (
      <div className="qcardDescription">
        {props.body}
      </div>
    );
  }
  //create comments
  if (isClicked) {
    //have to do comments 
    comments = Comments(props.comments);
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
          <img
            className="qcardProfileLogo"
            src={url}
            alt="profilePic"
          />

          <form>
            <textarea
              className="qcardCommentTextBox"
              type="text"
              id="commentText"
              placeholder="Write comment here"
              onChange={handleBodyInput}
            />
          </form>
          <form onSubmit={(e) => {postComment(); e.preventDefault();}}>
            <button type="submit" id={"questionCardCommentButton"} className="text-font qFormButton" >
              SUBMIT QUESTION
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
      <div className="qcardTop">
        <Votes />

        <div className="qcardRightContent">
          <div className="qcardProfile">
            <img 
              className="qcardProfileLogo"
              src={questionPhoto}
              alt="profilePic"
              onLoad={getQuestionPhoto(props.userId)}
            />
            <span>{props.userDisplayName}</span>
          </div>

          <div className="qcardTitle" onClick = {handleClick}>
            <h5>{props.title}</h5>
          </div>

          {description}

          <div className="qcardTags">
          {tagList} 
          </div>

          {moreLink}
        </div>
      </div>
      {hrline}
      {comments}
      {hrline}
      {answerSection}
    </div>
  );
}


export default QuestionCards;

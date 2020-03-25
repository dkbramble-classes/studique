import React, {useState} from "react";
import "../css/questionCards.css";
import { ReactComponent as UpArrow } from "../images/keyboard_arrow_up-24px.svg";
import { ReactComponent as DownArrow } from "../images/keyboard_arrow_down-24px.svg";
import {storage, addComment, updateRating, getRatingInfo, getRating} from "../hooks/databaseHooks";

function QuestionCards(props) {
  console.log("inside question cards");
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
      <Tags tagname={tag}/>
    ))
  }

  if(props.userPhoto != null && props.userPhoto !== undefined){
    url = props.userPhoto;
  }

  const [voteCount, updateCount] = useState(0);
  const colors = {
    "Neutral": "black",
    "Up": "#3944bc",
    "Down": "#d21f3c"
  };
  const [voteColor, updateColor] = useState(colors["Neutral"]);
  const [bodyInput, setBodyInput] = useState("");

  const q_id = props.objectId;
  console.log('props', props);

  function handleVoteInitialization() {
    console.log('inside handlevoteinitialization', q_id);
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
    return <div className="qcardCommentsSection">
        <Votes />
        <div className="qcardRightContent">
          <span className="qcardComment">
            this is a fake comment. will need to work on
          </span>
  
          <div className="qcardProfile">
            <img
              className="qcardProfileLogo"
              src={require("../images/louieLaker.jpg")}
              alt="profilePic"
            />
            <span>Professor Peabody</span>
          </div>
        </div>
      </div>
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
        {props.description}
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
              src="https://firebasestorage.googleapis.com/v0/b/studique.appspot.com/o/images%2Fhancoxk_200x200?alt=media&token=e577b6e9-7a9b-4711-ad8b-1556f1068bf6"
              alt="profilePic"
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

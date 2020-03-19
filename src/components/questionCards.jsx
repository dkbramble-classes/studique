import React, {useState} from "react";
import "../css/questionCards.css";
import { ReactComponent as UpArrow } from "../images/keyboard_arrow_up-24px.svg";
import { ReactComponent as DownArrow } from "../images/keyboard_arrow_down-24px.svg";

function QuestionCards(props) {
  const [isClicked, updateClick] = useState(false);
  const [isUpVotable, updateUpVotable] = useState(true);
  const [isDownVotable, updateDownVotable] = useState(true);
  const [voteCount, updateCount] = useState(props.rating);
  const [voteColor, updateColor] = useState("black");
  const initialRating = props.rating;
  var tagList = [];

  // if (props.tags) {
  //   const tagList = this.props.tags.map(function (tag) {
  //       return (
  //         <Tags tagname={tag}/>
  //       );
  //   });
  // }

  function Tags(props){
    return <div className="tags">{props.tagname}</div>
  }
  
  if (typeof(props.tags) !== 'undefined' && props.tags != null) {
    tagList = props.tags;
    // tagList.map(tag => {
    //   <div className="tags">{tag}</div>
    // })
    // tagList.map((tag) => (
    //   <div className="tags"> {tag}</div>
    // ))

    tagList.map(tag => {
      return <div className="tags"> {tag}</div>;
    })
    console.log(tagList);
  }

  function handleClick() {
    var newClickState = isClicked === true ? false : true;
    updateClick(newClickState);
  }

  function handleUpClick(){
    if (isUpVotable){
      let newVote = voteCount + 1
      updateCount(newVote);
      if(newVote !== initialRating){
        updateUpVotable(false);
        updateColor("#3944bc")
      } else{
        updateColor("black");
      }
      updateDownVotable(true);
    }
  }

  function handleDownClick(){
    if (isDownVotable){
      let newVote = voteCount - 1
      updateCount(newVote);
      updateUpVotable(true);
      if(newVote !== initialRating){
        updateDownVotable(false);
        updateColor("#d21f3c")
      } else{
        updateColor("black");
      }
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
            src={require("../images/louieLaker.jpg")}
            alt="profilePic"
          />

          <form>
            <textarea
              className="qcardCommentTextBox"
              type="text"
              id="commentText"
              placeholder="Write comment here"
            />
          </form>
          <button type="submit" id="questionCardCommentButton" className="text-font qFormButton">
            ASK QUESTION
        </button>
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
              src={require("../images/louieLaker.jpg")}
              alt="profilePic"
            />
            <span>Standard Student</span>
          </div>

          <div className="qcardTitle" onClick = {handleClick}>
            <h5>{props.title}</h5>
          </div>

          {description}

          <div className="qcardTags">

          {tagList}

            {/* <div className="tags">CIS162</div>
            <div className="tags">computer science</div> */}

            
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

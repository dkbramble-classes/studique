import React, {useState} from "react";
import "../css/questionCards.css";
import { ReactComponent as UpArrow } from "../images/keyboard_arrow_up-24px.svg";
import { ReactComponent as DownArrow } from "../images/keyboard_arrow_down-24px.svg";
import {addComment, updateRating, getRatingInfo} from "../hooks/databaseHooks"


function QuestionCards(props) {
  const [isClicked, updateClick] = useState(false);
  const [isUpVotable, updateUpVotable] = useState(true);
  const [isDownVotable, updateDownVotable] = useState(true);
  const [voteCount, updateCount] = useState(0);
  const colors = {
    Neutral: "black",
    Up: "#3944bc",
    Down: "#d21f3c"
  };
  const [voteColor, updateColor] = useState(colors["Neutral"]);
  const [bodyInput, setBodyInput] = useState("");

  const q_id = props.objectID;

  function handleVoteInitialization() {
    getRatingInfo(q_id).then(function (state) {
      updateCount(state.Rating);
      updateColor(colors[state.color]);
    })
  }

  function handleClick() {
    var newClickState = isClicked === true ? false : true;
    updateClick(newClickState);
  }

  function handleUpClick(){
    if (isUpVotable){
      updateRating(q_id, "UpVotes").then(function(rating){
        updateCount(rating);
        updateUpVotable(false);
        updateColor(colors["Up"]);
        updateDownVotable(true);
      });
    }
  }

  function handleDownClick(){
    if (isDownVotable){
      updateRating( q_id, "DownVotes").then(function(rating) {
        updateCount(rating);
        updateDownVotable(false);
        updateColor(colors["Down"]);
        updateUpVotable(true);
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    );
  }
  //create comments
  if (isClicked) {
    comments = (
      <div className="qcardCommentsSection">
        <Votes />
        <div className="qcardRightContent">
          <span className="qcardComment">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
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
    );
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
              src={require("../images/louieLaker.jpg")}
              alt="profilePic"
            />
            <span>Standard Student</span>
          </div>

          <div className="qcardTitle" onClick = {handleClick}>
            <h5>How do I create a Hello World in React?</h5>
          </div>

          {description}

          <div className="qcardTags">
            <div className="tags">CIS162</div>
            <div className="tags">computer science</div>
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



// const Profile = () => (
//   <div className="qcardProfile">
//             <img
//               className="qcardProfileLogo"
//               src={require("../images/louieLaker.jpg")}
//               alt="profilePic"
//             />
//             <span>Standard Student</span>
//           </div>
// );

export default QuestionCards;

import React from 'react';
import QCards from '../components/questionCards';
import "../css/questionList.css";
import {  BrowserRouter,Link } from "react-router-dom";

function QuestionList(props) {
  return (
    <div className="qlistPage">


      <h1>Question list page:</h1>
      <div className="qlistList">
      <QCards objectID={"-M2z9WUddIwRWWloeFeV"}/>
      <QCards objectID={"-M2z9WUddIwRWWloeFeV"}/>
      <QCards objectID={"-M2z9WUddIwRWWloeFeV"}/>
      <QCards objectID={"-M2z9WUddIwRWWloeFeV"}/>
      <QCards objectID={"-M2z9WUddIwRWWloeFeV"}/>
      <QCards objectID={"-M2z9WUddIwRWWloeFeV"}/>
      <QCards objectID={"-M2z9WUddIwRWWloeFeV"}/>

      {/* <BrowserRouter> */}
      <Link to="/questionForm">
      <button type="submit" className="text-font qFormButton">
            ASK QUESTION
        </button>
      </Link>
      {/* </BrowserRouter> */}
      </div>

    </div>
    );
    }

  export default QuestionList;
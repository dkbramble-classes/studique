import React from 'react';
import "../css/questionList.css";
import { Link } from "react-router-dom";
import AlgoliaSearch from "./algoliaSearch";

function QuestionList(props) {
  //const searchString = (props.location.pathname).split('=')[1] === null ? (props.location.pathname).split('=')[1] : null;
  const searchString = props.searchString;
  // console.log("seoij", props.location.pathname);
  // console.log("search", props.searchString);
  
  return (
    <div className="qlistPage">

      <h1>Question list page:</h1>
      <div className="qlistList">
        <AlgoliaSearch query={searchString}/>
        {/* <QCards Rating={12} />
        <QCards Rating={1} />
        <QCards Rating={15} />
        <QCards Rating={12} />
        <QCards Rating={120} />
        <QCards Rating={400} />
        <QCards Rating={12} /> */}

        <Link to="/questionForm">
          <button type="submit" className="text-font qFormButton">
                ASK QUESTION
          </button>
        </Link>
      </div>

    </div>
    );
    }

  export default QuestionList;
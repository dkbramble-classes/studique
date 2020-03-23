import React from 'react';
import "../css/questionList.css";
import { Link } from "react-router-dom";
import AlgoliaSearch from "./algoliaSearch";

function QuestionList(props) {
  const searchString = props.searchString;
  
  return (
    <div className="qlistPage">

      <div className="qlistList">
        <AlgoliaSearch query={searchString}/>

        <br/>
        <h4>Didn't find what you're looking for?</h4>
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
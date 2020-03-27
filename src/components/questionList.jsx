import React from 'react';
import "../css/questionList.css";
import { Link } from "react-router-dom";
import Select from 'react-select'
import AlgoliaSearch from "./algoliaSearch";

const options = [
  { value: 'rating', label: 'Rating' },
  { value: 'datetime', label: 'Date Asked' },
  { value: 'usertype', label: 'User Type' }
]

function QuestionList(props) {
  const searchString = props.searchString;
  const handleDropDown = selectedOption => {
    console.log(`Option selected:`, selectedOption.value);
  };
  return (
      <div className="qlistPage pt-2">
        <form className="form-inline rounded-0 m text-font">
          <p className="text-font text-white mt-3">Sort By:</p>
          <Select options={options} className="text-font dropdown text-left align-left" onChange={handleDropDown}  defaultValue={ { value: 'rating', label: 'Rating' }}/>
        </form>
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
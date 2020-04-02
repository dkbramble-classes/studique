import React from 'react';
import "../css/questionList.css";
import { Link } from "react-router-dom";
import Select from 'react-select'
import AlgoliaSearch from "./algoliaSearch";

const options = [
  { value: 'rating', label: 'Rating' },
  { value: 'date', label: 'Date Asked' }
]

function QuestionList(props) {
  const [sortOption, setSort] = React.useState("rating");

  const handleDropDown = selectedOption => {
    setSort(selectedOption.value);
  };

  function DropDown() {
    const sort = window.location.href.split('/sort/')[1] === null ? null : window.location.href.split('/sort/')[1];
    if (sort){
      return(<div/>);
    } 
  
    return (        
      <form className="form-inline pt-2 rounded-0 text-font">
        <p className="text-font text-white mt-3">Sort By:</p>
        <Select options={options} className="text-font dropdown text-left align-left" onChange={handleDropDown}  defaultValue={ { value: 'rating', label: 'Rating' }}/>
    </form>
    );
  }

  return (
      <div className="qlistPage">

      <div className="qlistList">
        <DropDown/>
        <AlgoliaSearch sortOption={sortOption}/>

        <br/>
        <h4>Didn't find what you're looking for?</h4>
        <Link to="/questionForm">
          <button type="submit" className="text-font mb-3 qFormButton">
                ASK QUESTION
          </button>
        </Link>
      </div>

    </div>
    );
    }

  export default QuestionList;
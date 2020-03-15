import React from 'react';
import QCards from '../components/questionCards';
import "../css/questionList.css";
import { Link } from "react-router-dom";
import Select from 'react-select'

// const colourStyles = {
//   control: styles => ({ ...styles, backgroundColor: 'white' }),
//   option: (styles, { isDisabled, isFocused, isSelected }) => {
//     const color = "#64a19d";
//     return {
//       ...styles,
//       backgroundColor: isDisabled ? 'red' : "#64a19d",
//       color: '#FFF',
//       cursor: isDisabled ? 'not-allowed' : 'default'
//     };
//   },
// };
const options = [
  { value: 'rating', label: 'Rating' },
  { value: 'datetime', label: 'Date Asked' },
  { value: 'usertype', label: 'User Type' }
]
function QuestionList() {
  const handleDropDown = selectedOption => {
    console.log(`Option selected:`, selectedOption.value);
  };
  
  return (
      <div className="qlistPage">


      <div className="qlistList pt-2">
        <form className="form-inline rounded-0 m text-font">
          <p className="text-font text-white mt-3">Sort By:</p>
          <Select options={options} className="text-font dropdown text-left align-left" onChange={handleDropDown}  defaultValue={ { value: 'rating', label: 'Rating' }}/>
        </form>
      <QCards />
      <QCards />
      <QCards />
      <QCards />
      <QCards />
      <QCards />
      <QCards />

      <Link to="/questionForm">
      <button type="submit" className="text-font qFormButton mb-4">
            ASK QUESTION
        </button>
      </Link>
      </div>

    </div>
    );
    }

  export default QuestionList;
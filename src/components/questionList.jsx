import React from 'react';
import QCards from '../components/questionCards';
import "../css/questionList.css";
import { Link } from "react-router-dom";

function QuestionList(props) {
  console.log(props.searchString);
  return (
    <div className="qlistPage">


      <h1>Question list page:</h1>
      <div className="qlistList">
      <QCards Rating={12} objectID={"-M2e51Q3wLz6uViSkt5h"}/>
      <QCards Rating={1} objectID={"-M2e51Q3wLz6uViSkt5h"}/>
      <QCards Rating={15} objectID={"-M2e51Q3wLz6uViSkt5h"}/>
      <QCards Rating={12} objectID={"-M2e51Q3wLz6uViSkt5h"}/>
      <QCards Rating={120} objectID={"-M2e51Q3wLz6uViSkt5h"}/>
      <QCards Rating={400} objectID={"-M2e51Q3wLz6uViSkt5h"}/>
      <QCards Rating={12} objectID={"-M2e51Q3wLz6uViSkt5h"}/>

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
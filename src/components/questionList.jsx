import React from 'react';
import QCards from '../components/questionCards';
import "../css/questionList.css";
import { Link } from "react-router-dom";

function QuestionList() {
  return (
    <div className="qlistPage">

      <h1>Question list page:</h1>
      <div className="qlistList">
      <QCards Rating={12} />
      <QCards Rating={1} />
      <QCards Rating={15} />
      <QCards Rating={12} />
      <QCards Rating={120} />
      <QCards Rating={400} />
      <QCards Rating={12} />

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
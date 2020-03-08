import React from 'react';
import QCards from '../components/questionCards';
import "../css/questionList.css";
import { Link } from "react-router-dom";

function QuestionList() {
  return (
    <div className="qlistPage">

      <h1>Question list page:</h1>
      <div className="qlistList">
      <QCards />
      <QCards />
      <QCards />
      <QCards />
      <QCards />
      <QCards />
      <QCards />

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
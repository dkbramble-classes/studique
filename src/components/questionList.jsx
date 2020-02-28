import React from 'react';
import QCards from '../components/questionCards';
import "../css/questionList.css";

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
      </div>
    </div>
    );
    }

  export default QuestionList;
import React from 'react';
import QCards from '../components/questionCards';
import "../css/questionList.css";

function questionList() {
  return (
    <div>

      <h1>Question list page:</h1>
      <div className="qlistList">
      <QCards />
      <QCards />
      </div>
    </div>
    );
    }

  export default questionList;
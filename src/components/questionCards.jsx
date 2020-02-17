import React from 'react';
import '../css/questionCards.css';
import { ReactComponent as UpArrow } from '../images/keyboard_arrow_up-24px.svg';
import { ReactComponent as DownArrow } from '../images/keyboard_arrow_down-24px.svg';


function questionCards() {




return (
<div className="qcard">
<div className="qcardVotes">
<div><UpArrow /></div>
<div><h4>12</h4></div>
<div><DownArrow /></div>
</div>

<div className="qcardRightContent">
<div className="qcardProfile">
<span>profile</span>
</div>
<div className="qcardTitle">
<h5>How do I create a Hello World in React?</h5>
</div>
<div className="qcardTags">
<div className="tags">CIS162</div>
<div className="tags">computer science</div>
</div>
</div>
</div>
);
}

export default questionCards;

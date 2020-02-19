import React from "react";
import "../css/questionCards.css";
import { ReactComponent as UpArrow } from "../images/keyboard_arrow_up-24px.svg";
import { ReactComponent as DownArrow } from "../images/keyboard_arrow_down-24px.svg";


function questionCards() {

  //const clicked = props.isClicked;

  return (

    <div className="qcard">

      <div className="qcardTop">

        <Votes />

        <div className="qcardRightContent">
          
        <div className="qcardProfile">
            <img
              className="qcardProfileLogo"
              src={require("../images/louieLaker.jpg")}
              alt="profilePic"
            />
            <span>Standard Student</span>
          </div>

          <div className="qcardTitle">
            <h5>How do I create a Hello World in React?</h5>
          </div>



          <div className="qcardDescription">
              I'm wondering how to create this long thing in React please help
              me
              adociajwejcamwofjampxomaejwmakwejfx;laex;akmfopiajmwepoiajwmecfopajwefoaerjpoiejpoajenf;ojen;foxiqjneoxiqnef;oiqajnefo;iqejnf;oqiiefjq;oiejfnqoiefjnq;oiefpqiefnjq;oienfq;om
              efo;ajweofxjamweo;xfmweofxj
              aewjfo;ajwefx;oaef;jpgawjefocawjemo;xjmajefcionoj
              efcawehfanpiwehac;jnaw;efjk;o thanks
          </div>

          <div className="qcardTags">
            <div className="tags">CIS162</div>
            <div className="tags">computer science</div>
          </div>
          <span className="answersLink">Answers</span>
        </div>

      </div>

      <hr />

      <div className="qcardCommentsSection">

        <Votes />
        <div className="qcardRightContent">
        <div className="qcardProfile">
            <img
              className="qcardProfileLogo"
              src={require("../images/louieLaker.jpg")}
              alt="profilePic"
            />
            <span className="qcardComment">This is a comment. aiewjcpocaifnpoaiwenfoxaiejnfhe
            wqejifnqweoxfnqeiowfunqpoeiufn;qoeif;qoweinfjq;oewijfn
            poqsiefnpqiwehnfx;oqejf;qoeijfzoeinfpqoiwenfqxon;hfq
            wqejifnqweoxfnqeiowfunqpoeiufnqxwejfqwnehfpzqwoiefnxefnpqojlfajwhl
            fqiwuehbfxqilefhuinqefnqleh
            xqwefjxxq;ofqwiehnfpqwiefhxpfhinqwuehnpix
            -qwoxqliqrxiq
            erg
            evw
            wqejifnqweoxfnqeiowfunqpoeiufnrrhtrth
            dyjte
            aowpeiuqpfongqruioc
            wv
            wvg
          </span>
          </div>

        </div>
      </div>
    
      <hr />

      <div>
        <h5>Add An Answer</h5>
      <div className="qcardAnswerSection">
        <img
              className="qcardProfileLogo"
              src={require("../images/louieLaker.jpg")}
              alt="profilePic"
            />

        <form>
        <textarea 
          className="qcardCommentTextBox" 
          type = "text"
          id = "commentText"
          placeholder="Write comment here"/>
        </form>

        </div>
      </div>

      </div>

  );
}


const Votes = () => (
  <div className="qcardVotes">
  <div>
    <UpArrow />
  </div>

  <div>
    <h4>12</h4>
  </div>

  <div>
    <DownArrow />
  </div>
</div>
);

// const Profile = () => (
//   <div className="qcardProfile">
//             <img
//               className="qcardProfileLogo"
//               src={require("../images/louieLaker.jpg")}
//               alt="profilePic"
//             />
//             <span>Standard Student</span>
//           </div>
// );

export default questionCards;

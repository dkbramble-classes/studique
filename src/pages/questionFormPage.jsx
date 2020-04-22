import React, {useState} from "react";
import "../css/questionForm.css";
import {createQuestion} from "../hooks/databaseHooks"
import { Redirect} from "react-router-dom";

function QuestionForm()
{
  const [titleInput, setTitleInput] = useState("");
  // const [tmpURL, setURL] = useState('');
  const [bodyInput, setBodyInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [loadResults, setLoad] = useState(false);

  function handleTitleInput(ev) {
    if(ev.target.value.length < 140){
      setTitleInput(ev.target.value);
      // if(ev.target.value.length > 0){
      //   var url = ev.target.value.replace(/ /g, '&');
      //   var urlSlash = url.replace(/\//g, '_slash_');
      //   setURL(urlSlash);    
      // }
    }

    if (ev.target.value.length > 0 && bodyInput.length > 0 && isDisabled === true){
      setDisabled(false);
    } else if((ev.target.value.length <= 0 || bodyInput.length <= 0) && isDisabled === false){
      setDisabled(true);
    }
    //console.log(isDisabled);
  }

  function handleBodyInput(ev) {
    if(ev.target.value.length < 2000){
      setBodyInput(ev.target.value);
    }
    if (ev.target.value.length > 0 && titleInput.length > 0 && isDisabled === true){
      setDisabled(false);
    } else if((ev.target.value.length <= 0 || titleInput.length <= 0) && isDisabled === false){
      setDisabled(true);
    }
    //console.log(isDisabled);
  }

  function handleTagsInput(ev) {
    setTagsInput(ev.target.value);
  }

  function createQuestionCard(){
    if(titleInput === "" || bodyInput === "")
    {
      console.log("Please Enter a Title and Body for your question")
      alert("Please Enter a Title and Body for your question");
    }
    else {
      setTagsInput(tagsInput.replace(/\s/g, ''));
      const tagList = tagsInput.split(',');
      createQuestion(titleInput, bodyInput, tagList).then(function () {
        // Sign-out successful.
        setLoad(true);
        console.log("Q-Card creation successful");
        
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
    }
  }
  if (loadResults === true) {
    return <Redirect to="/results/search//sort/date"/>
  }
  return (
      <div className="questionFormPage">
      <div className="qFormContent">
        <h1>Ask a new Question</h1>

        <div className="qFormOuterForm">
          <div className="qFormInnerForm">
            <div className="qFormSection">
              <h4>Title</h4>
              <div>
                <form>
                  <input
                    type="text"
                    className="form-control"
                    id="questionTitle"
                    autoComplete="off"
                    placeholder="e.g. Where can I find my tax forms as a student employee?"
                    onChange={handleTitleInput}
                  />
                </form>
              </div>
            </div>

            <div className="qFormSection">
              <h4>Body</h4>
              <div>
                <form>
                  <textarea
                    type="text"
                    className="form-control"
                    id="questionBody"
                    autoComplete="off"
                    rows="10"
                    placeholder="Explain the context, why you need it, what you've tried, etc."
                    onChange={handleBodyInput}
                  />
                </form>
              </div>
            </div>

            <div className="qFormSection">
              <h4>Tags</h4>
              <form>
                <input
                  type="text"
                  className="form-control"
                  id="questionTags"
                  autoComplete="off"
                  placeholder="e.g. Student employee, Employment (Separate multiple tags by commas)"
                  onChange={handleTagsInput}
                />
              </form>
            </div>
          </div>
        </div>
        
        <form onSubmit={(e) => {createQuestionCard(); e.preventDefault();
          setTimeout(() => {
            window.location.reload(false)
          }, 1500);
        }}>
          <button type="submit" id='qFormSubmit' disabled={isDisabled} className="text-font qFormButton mb-2" >
            SUBMIT QUESTION
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default QuestionForm;

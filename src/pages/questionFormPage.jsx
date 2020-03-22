import React, {useState} from "react";
import "../css/questionForm.css";
import {createQuestion} from "../hooks/databaseHooks"

function QuestionForm(props)
{
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  function handleTitleInput(ev) {
    if(ev.target.value.length < 30){
      setTitleInput(ev.target.value);
    }
  }

  function handleBodyInput(ev) {
    if(ev.target.value.length < 2000){
      setBodyInput(ev.target.value);
    }
  }

  function handleTagsInput(ev) {
    setTagsInput(ev.target.value);
  }

  function createQuestionCard(){
    if(titleInput === "" || bodyInput === "")
    {
      console.log("Please Enter a Title and Body for your question")
    }
    else {
      setTagsInput(tagsInput.replace(/\s/g, ''));
      const tagList = tagsInput.split(',');
      createQuestion(titleInput, bodyInput, tagList).then(function () {
        // Sign-out successful.
        console.log("Q-Card creation successful");
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
      });
    }
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
        <form onSubmit={(e) => {createQuestionCard(); e.preventDefault();}}>
          <button type="submit" className="text-font qFormButton mb-2" >
            SUBMIT QUESTION
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;

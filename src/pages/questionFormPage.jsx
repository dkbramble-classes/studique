import React from "react";
import "../css/questionForm.css";

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                      className="qFormInput"
                      id="questionTitle"
                      autoComplete="off"
                      placeholder="e.g. Where can I find my tax forms as a student employee?"
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
                      className="qFormInput"
                      id="questionBody"
                      autoComplete="off"
                      rows="10"
                      placeholder="Explain the context, why you need it, what you've tried, etc."
                    />
                  </form>
                </div>
              </div>

              <div className="qFormSection">
                <h4>Tags</h4>
                <form>
                  <input
                    type="text"
                    className="qFormInput"
                    id="questionTags"
                    autoComplete="off"
                    placeholder="e.g. Student employee, Employment (Separate multiple tags by commas)"
                  />
                </form>
              </div>
            </div>
          </div>

          <button type="submit" className="text-font qFormButton">
            SUBMIT QUESTION
          </button>
        </div>
      </div>
    );
  }
}

export default QuestionForm;

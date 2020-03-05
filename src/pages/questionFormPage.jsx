import React from "react";
import "../css/questionForm.css";

class questionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "", tags: "" };
    //this.updateClick = this.updateClick.bind(this);
  }

  render() {
    return (
      <div className="questionFormPage">
        <div className="qFormInnerForm">
        <h1>Ask a new Question</h1>

        <div className="qFormSection">
        <h4>Title</h4>
        <div className="qFormSubtext">Be specific</div>
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
        <div className="qFormSubtext">Explain the context, why you need it, what you've tried, etc.</div>
        <div>
          <form>
            <textarea
              type="text"
              className="qFormInput"
              id="questionBody"
              autoComplete="off"
              rows="10"
              placeholder="e.g. I have already tried looking at this website page (include link to page) ... "
            />
          </form>
        </div>
        </div>

        <div className="qFormSection">
        <h4>Tags</h4>
        <div className="qFormSubtext">Separate multiple tags by commas</div>
        <form>
          <input
            type="text"
            className="qFormInput"
            id="questionTags"
            autoComplete="off"
            placeholder="e.g. Student employee, Employment"
          />
        </form>
        </div>

        
        <button type="submit" className="ext-font">
          Submit Question
        </button>
        </div>
      </div>
    );
  }
}

export default questionForm;

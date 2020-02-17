import React from 'react';
import { Link } from "react-router-dom";

class SearchBarText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', isEnabled: false};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    
    let empty = event.target.value.length > 0;
    this.setState({isEnabled: empty});
  }

  render() {
    return (
      
      <form className="form-inline d-flex content-center">

        <input type="text" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputText" autoComplete="off" placeholder="ASK A QUESTION" value={this.state.value} onChange={this.handleChange} />
        <div className="mx-auto">
        <Link to={"/results/" + this.state.value}>
        <input type="submit" disabled={!this.state.isEnabled} className="btn btn-primary mx-auto" value="Submit" />
        </Link>
        </div>
      </form>

    );
  }
}

export default SearchBarText
    

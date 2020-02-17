import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import { Link } from "react-router-dom";

const client = algoliasearch('2OXOHVVBM2', 'b8769b9a1270565298eb7e51af306c8b');
const index = client.initIndex('Questions');

// // only query string
// index.search('How').then(({ hits }) => {
//   console.log(hits);
// });

// with params
// index.search('How', {
//   attributesToRetrieve: ['Text'],
//   hitsPerPage: 10,
// }).then(({ hits }) => {
//   console.log(hits)
// });

class SimpleSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', isEnabled: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
    
    let empty = event.target.value.length > 0;
    this.setState({isEnabled: empty});
  }

  handleSubmit(event) {
    index.search(this.state.value, {
      attributesToRetrieve: ['Text'],
      hitsPerPage: 10,
    }).then(({ hits }) => {
      console.log(hits)
      if (hits.length === 0){
        alert("There's no hits! Want to ask a question?");
      }
      //alert('Hits: ' + hits);
    });
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      
      <form className="form-inline d-flex content-center" onSubmit={this.handleSubmit}>

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

export default SimpleSearchBar
    

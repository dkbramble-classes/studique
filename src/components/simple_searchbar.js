import React from 'react';
import algoliasearch from 'algoliasearch/lite';

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
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    index.search(this.state.value, {
      attributesToRetrieve: ['Text'],
      hitsPerPage: 10,
    }).then(({ hits }) => {
      console.log(hits)
      //alert('Hits: ' + hits);
    });
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline d-flex" onSubmit={this.handleSubmit}>
        <input type="text" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputText" placeholder="ASK A QUESTION" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" className="btn btn-primary mx-auto" value="Submit" />
      </form>
    );
  }
}

export default SimpleSearchBar
    

import React, {useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import alglogo from "../images/algolia-white.svg";

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

function SimpleSearchBar (props){
  // constructor(props) {
  //   super(props);
  //   this.state = {value: '', isEnabled: false};

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  const [tmpSearch, setSearch] = useState('');
  const [tmpURL, setURL] = useState('');
  const [isEnabled, setEnabled] = useState(false);

  
  function handleTextChange(event) {
    setSearch(event.target.value);
    var url = event.target.value.replace(/ /g, "&");
    setURL(url);    
    let empty = event.target.value.length > 0;
    setEnabled(empty);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (tmpSearch.length > 0){
      props.handleSearch(tmpSearch, tmpURL);
    }
    index.search(tmpSearch, {
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
  }
  return (
    <div>
        <a className="text-left alg-logo ais-PoweredBy-link" href="https://www.algolia.com" aria-label="Algolia">
          <img className="alg-logo content-left" src={alglogo} alt="alglogo"></img>
        </a>
      <form className="form-inline d-flex content-center text-center" onSubmit={handleSubmit}>
        <input type="text" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputText" autoComplete="off" placeholder="ASK A QUESTION" value={tmpSearch} onChange={handleTextChange} />
        <div className="mx-auto">
        <Link to={"/results/search=" + tmpURL}>
          <input type="submit" disabled={!isEnabled} className="btn btn-primary mx-auto" value="Submit" />
        </Link>
        </div>
      </form>
    </div>
  );
}

export default SimpleSearchBar
    

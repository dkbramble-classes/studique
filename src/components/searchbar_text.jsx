import React,  {useState}  from 'react';
import { Link } from "react-router-dom";
import alglogo from "../images/algolia-white.svg";

function SearchBarText(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {value: '', isEnabled: false};

  //   this.handleChange = this.handleChange.bind(this);
  // }
  const [tmpSearch, setSearch] = useState('');
  const [tmpURL, setURL] = useState('');
  const [isEnabled, setEnabled] = useState(false);

  
  function handleTextChange(event) {
    setSearch(event.target.value);

    let empty = event.target.value.length > 0;
    if (empty) {
      var url = event.target.value.replace(/ /g, '&');
      console.log(url);
      setURL(url);    
    }
    setEnabled(empty);
  }

  function subBtn(e){
    e.preventDefault();
    if (tmpSearch.length > 0){
      props.handleSearch(tmpSearch, tmpURL);
    }
  }

  return (
    <div>
      <a className="text-left alg-logo" href="https://www.algolia.com" aria-label="Algolia">
        <img className="alg-logo content-left" src={alglogo} alt="alglogo"></img>
      </a>
      <form className="form-inline d-flex content-center text-center" onSubmit={subBtn}>
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

export default SearchBarText
    

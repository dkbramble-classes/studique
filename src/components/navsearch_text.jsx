import React,  {useState}  from 'react';
import { BrowserRouter, Link } from "react-router-dom";
// import alglogo from "../images/algolia-white.svg";
import Icon from "../components/searchIcon"

function NavSearchText(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {value: '', isEnabled: false};

  //   this.handleChange = this.handleChange.bind(this);
  // }
  const [tmpSearch, setSearch] = useState('');
  const [tmpURL, setURL] = useState('');
  const [isEnabled, setEnabled] = useState(false);

  
  function handleTextChange(event) {
    if(event.target.value.length < 140){
      setSearch(event.target.value);

      let empty = event.target.value.length > 0;
      if (empty) {
        var url = event.target.value.replace(/ /g, '&');
        setURL(url);    
      }
      setEnabled(empty);
    }
  }

  function subBtn(e){
    e.preventDefault();
    // if (tmpSearch.length > 0){
    //   props.handleSearch(tmpSearch, tmpURL);
    // }
  }

  return (
    <div>
      {/* <a className="text-left alg-logo" href="https://www.algolia.com" aria-label="Algolia">
        <img className="alg-logo content-left" src={alglogo} alt="alglogo"></img>
      </a> */}
      <form className="form-inline rounded-0" onSubmit={subBtn}>
        <input type="text" id="inputMini" className="form-control search-mini flex-fill d-sm-block d-none" autoComplete="off" placeholder="SEARCH QUESTIONS" value={tmpSearch} onChange={handleTextChange} />
        <div className="mx-auto">
        {/* <BrowserRouter> */}
        <Link to={"/results/search=" + tmpURL} onClick={() =>   {
          if (tmpSearch.length > 0){
            props.handleSearch(tmpSearch, tmpURL);
          }}
          } >
          <button id="navSubmit" disabled={!isEnabled} className="btn btn-mini d-sm-block d-none" ><Icon></Icon></button>
        </Link>
        {/* </BrowserRouter> */}
        </div>
      </form>
    </div>

  );
  
}

export default NavSearchText
    

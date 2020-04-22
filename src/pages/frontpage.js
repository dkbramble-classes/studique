import React from 'react';
import { Link } from "react-router-dom";
import SearchBarText from '../components/searchbar_text';

function FrontPage(props) {
  return (
  <div className="bg-image">

    <section id="signup" className="signup-section mt-5 justify-content-center d-flex h-100">
        <div className="mx-auto jumbotron">
          <h1 className="text-white mb-4 text-center">Studique</h1>
          <h3 className="text-white mb-5 text-center">
            Crowdsourcing The College Experience
          </h3>
          <SearchBarText urlStringL={props.urlString}/>

          <div className="text-white text-font text-center">
            <div className="my-2">
            Want to help others? 
            </div>
            <Link to="/results/search/_/sort/date">
             <input type="submit" className="btn mb-1 btn-primary" value="Share Your Knowledge" />
            </Link>
          </div>
        </div>
    </section>
  </div>);

}
 
export default FrontPage;

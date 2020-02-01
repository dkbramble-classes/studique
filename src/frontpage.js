import React from 'react';
import logo from "./shared/img/logo.png";
//import logo from './shared/icons/logo.svg';
//import Qlist from './question-list/Qlist';

function App() {
  return (
    <div className="App bg-image">
        <link href="./bootstrap.min.css" rel="stylesheet"></link>
        <link href="./font-awesome.min.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>

      <nav className="navbar navbar-expand-sm navbar-light" id="mainNav">
        <div className="container">
          <a className="navbar-brand  text-font" href="#page-top">
          <img className="brand-logo mr-2" src={logo} alt="LogoBrand"/>
             Studique</a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              {/* <button type="button" class="btn btn-outline-info border border-info">Info</button> */}
              <button type="submit" className=" btn nav-link text-font">Sign In</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn text-font">Sign up</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* <div className="jumbotron mt-10"></div> */}
      <section id="signup" className="signup-section my-5 imgbox center-fit">
        {/* <div className="jumbotron jumbotron-fluid rounded mt-10">
        <div className="container-fluid"> */}
          <div className="row">
            <div className="col-md-5 col-lg-8 mx-auto text-center">
              <h1 className="text-white mb-4">Studique</h1>
              <h3 className="text-white mb-5">Crowdsourcing The College Experience</h3>
                {/* <div className="media">
                <img className="logo mr-3" src={logo} alt="LogoPage"/>
                <div className="media-body mx-auto">
                  <h1 className="text-white">Studique</h1>
                  <h3 className="text-white mb-5">Crowdsourcing The College Experience</h3>
                </div>
              </div> */}
              <form className="form-inline d-flex">
                <input type="text" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputText" placeholder="ASK A QUESTION"/>
                <button type="submit" className="btn btn-primary mx-auto">Search</button>
              </form>
            </div>
          </div>
        {/* </div>
        </div> */}
      </section>
    </div>
  );
}

export default App;

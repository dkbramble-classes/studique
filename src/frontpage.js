import React from 'react';
import './shared/css/style.css';

function App() {
  return (
    <div className="App">

    <head>
        <link href="./bootstrap.min.css" rel="stylesheet"></link>
        <link href="./shared/css/style.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Baloo+Bhai&display=swap" rel="stylesheet"></link>
    </head>

    <nav className="navbar navbar-expand-sm navbar-light fixed-top" id="mainNav">
      <div className="container">
        <a className=" title-navbar navbar-brand js-scroll-trigger" href="#page-top">Studique</a>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="title-navbar nav-link js-scroll-trigger" href="#about">Sign in</a>
            </li>
            <li className="nav-item">
              <a className="title-navbar nav-link js-scroll-trigger" href="#projects">Sign up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <section id="frontpage" className="frontpage-section">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-lg-8 mx-auto text-center">
            <h1 className="title-h1 text-white mb-4">Studique</h1>
            <h3 className="title-h3 text-white mb-5">Crowdsourcing The College Experience</h3>
            
            <form className="form-inline d-flex">
              <input type="text" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputText" placeholder="ASK A QUESTION"/>
             <button type="submit" className="title-h3 btn btn-primary mx-auto">Search</button>*/}
            </form>
  
          </div>
        </div>
      </div>
    </section>
  
    </div>
  );
}

export default App;

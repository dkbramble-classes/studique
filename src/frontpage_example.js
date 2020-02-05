import React from 'react';
//import logo from './shared/icons/logo.svg';
import Qlist from './question-list/Qlist';

function App() {
  return (
    <div className="App">

    <head>
        <link href="./bootstrap.min.css" rel="stylesheet"></link>
    </head>

    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand js-scroll-trigger" href="#page-top">Studique</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#about">Sign in</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#projects">Sign up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <header className="masthead">
      <div className="container d-flex h-100 align-items-center">
        <div className="mx-auto text-center">
          <h1 className="mx-auto my-0 text-uppercase">Grayscale</h1>
          <h2 className="text-white-50 mx-auto mt-2 mb-5">A free, responsive, one page Bootstrap theme created by Start Bootstrap.</h2>
          <a href="#about" className="btn btn-primary js-scroll-trigger">Search</a>
        </div>
      </div>
    </header>
  
    <section id="about" className="about-section text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="text-white mb-4">Built with Bootstrap 4</h2>
            <p className="text-white-50">Grayscale is a free Bootstrap theme created by Start Bootstrap. It can be yours right now, simply download the template on
              <a href="http://startbootstrap.com/template-overviews/grayscale/">the preview page</a>. The theme is open source, and you can use it for any purpose, personal or commercial.</p>
          </div>
        </div>
        <img src="img/ipad.png" className="img-fluid" alt=""/>
      </div>
    </section>
  
    <section id="projects" className="projects-section bg-light">
      <div className="container">
  
        <div className="row align-items-center no-gutters mb-4 mb-lg-5">
          <div className="col-xl-8 col-lg-7">
            <img className="img-fluid mb-3 mb-lg-0" src="img/bg-masthead.jpg" alt=""/>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="featured-text text-center text-lg-left">
              <h4>Shoreline</h4>
              <p className="text-black-50 mb-0">Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!</p>
            </div>
          </div>
        </div>
  
        <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
          <div className="col-lg-6">
            <img className="img-fluid" src="img/demo-image-01.jpg" alt=""/>
          </div>
          <div className="col-lg-6">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-left">
                  <h4 className="text-white">Misty</h4>
                  <p className="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                  <hr className="d-none d-lg-block mb-0 ml-0"/>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="row justify-content-center no-gutters">
          <div className="col-lg-6">
            <img className="img-fluid" src="img/demo-image-02.jpg" alt=""/>
          </div>
          <div className="col-lg-6 order-lg-first">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-right">
                  <h4 className="text-white">Mountains</h4>
                  <p className="mb-0 text-white-50">Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                  <hr className="d-none d-lg-block mb-0 mr-0"/>
                </div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </section>
  
    <section id="signup" className="signup-section">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto text-center">
  
            <i className="far fa-paper-plane fa-2x mb-2 text-white"></i>
            <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
  
            <form className="form-inline d-flex">
              <input type="email" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" placeholder="Enter email address..."/>
              <button type="submit" className="btn btn-primary mx-auto">Subscribe</button>
            </form>
  
          </div>
        </div>
      </div>
    </section>
  
    <Qlist></Qlist>
  
    <footer className="bg-black small text-center text-white-50">
      <div className="container">
        Copyright &copy; Your Website 2019
      </div>
    </footer>
    </div>
  );
}

export default App;

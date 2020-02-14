import logo from "../images/logo.png";
import React from 'react';
import SignIn from "../components/signIn.jsx";
import SignUp from "../components/signUp.jsx";
import Popup from "reactjs-popup";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light" id="mainNavStdq">
    <div className="container">
      <a className="navbar-brand text-font" href="/">
        <img className="mr-2 " width="30" height="40" src={logo} alt="LogoBrand" />
        Studique
      </a>
      <div className="" id="navbarResponsive">
        <div className="navbar-nav ml-auto">
    
          <div className="nav-item">
            {/* <button type="button" class="btn btn-outline-info border border-info">Info</button> */}
            <Popup
              modal
              trigger={
                <button
                  type="submit"
                  className=" nav-btn btn nav-link text-font">
                  Sign In
                </button>
              }
            >
              <SignIn className="popup-primary"></SignIn>
            </Popup>
          </div>
          <div className="nav-item">
            <Popup
              modal
              trigger={
                <button className="nav-link btn text-font">Sign up</button>
              }
            >
              <SignUp className="popup-primary"></SignUp>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  </nav>
      
  );
}

export default Nav;

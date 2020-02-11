import logo from "../shared/images/logo.png";
import React from 'react';
import SignIn from "../signIn/signIn.jsx";
import SignUp from "../signUp/signUp.jsx";
import Popup from "reactjs-popup";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light" id="mainNavStdq">
    <div className="container">
      <a className="navbar-brand text-font" href="/">
        <img className="brand-logo mr-2" src={logo} alt="LogoBrand" />
        Studique
      </a>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
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
          </li>
          <li className="nav-item">
            <Popup
              modal
              trigger={
                <button className="nav-link btn text-font">Sign up</button>
              }
            >
              <SignUp className="popup-primary"></SignUp>
            </Popup>
          </li>
        </ul>
      </div>
    </div>
  </nav>
      
  );
}

export default Nav;

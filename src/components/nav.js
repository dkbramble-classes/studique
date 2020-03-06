import logo from "../images/logo.png";
import React from 'react';
import SignIn from "../components/signIn.jsx";
import SignUp from "../components/signUp.jsx";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function Nav(props) {
  
  return (
    <nav className="navbar navbar-expand-md navbar-expand-lg navbar-light" id="mainNavStdq" aria-expanded="false" >
    <div className="container">
      <a className="navbar-brand text-font" href="/">
        <img className="mr-2 " width="30" height="40" src={logo} alt="LogoBrand" />
        Studique
      </a>
      <div className="" id="navbarResponsive">
        <ButtonDisplay isAuthed={props.isAuthed} handleAuthed={props.handleAuthed} displayName={props.displayName} handleName={props.handleName} handleType={props.handleType}/>
      </div>
    </div>
  </nav>
      
  );
}


function ButtonDisplay(props){
  
  if (!props.isAuthed) {
    return(
        <ul className="navbar-nav">
          <li className="nav-item">
              {/* <button type="button" class="btn btn-outline-info border border-info">Info</button> */}
              <Popup
                modal
                trigger={
                  <button
                    type="submit"
                    className=" nav-btn btn nav-link text-font"
                    >
                    Sign In
                  </button>
                }
                className="popup-set"
              >
                <SignIn handleAuthed={props.handleAuthed} handleName={props.handleName} handleType={props.handleType} ></SignIn>
              </Popup>
            </li>
            <li className="nav-item">
              <Popup
                modal
                trigger={
                  <button className="nav-link btn text-font">Sign up</button>
                }
                className="popup-set"
              >
                <SignUp className="popup-primary" handleAuthed={props.handleAuthed} handleName={props.handleName} handleType={props.handleType}></SignUp>
              </Popup>
            </li>
        </ul>
    );
  }
  else{
    return <div className="text-white text-font text-center">
    <div className="my-2">
    </div>
    <Link to="/profile/">
     <input type="submit" className="nav-link btn text-font" value="Profile"  displayName={props.displayName} />
    </Link>
  </div>
  }
}

export default Nav;

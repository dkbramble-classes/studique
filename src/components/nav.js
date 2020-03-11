import logo from "../images/logo.png";
import React from 'react';
import SignIn from "../components/signIn.jsx";
import SignUp from "../components/signUp.jsx";
import NavBarText from "../components/navsearch_text";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import {signOut} from "../hooks/databaseHooks";
import {withRouter} from 'react-router'

const Nav = ({location, ...props}) => (
    <nav className="navbar navbar-expand-md navbar-expand-lg navbar-light" id="mainNavStdq" aria-expanded="false" >
    <div className="container">
      <a className="navbar-brand text-font mr-md-4" href="/">
        <div className="inline-block">
      <img className="mr-2  " width="30" height="40" src={logo} alt="LogoBrand"/>
      </div>
      <div className="inline-block d-sm-inline d-none">Studique</div>
      </a>        

      <div className="d-inline-flex" id="navbarResponsive">
        <div className="mt-2">
          {location.pathname !== '/' && <NavBarText handleSearch={props.handleSearch} searchString/>}
        </div>
        <ButtonDisplay isAuthed={props.isAuthed} handleAuthed={props.handleAuthed} displayName={props.displayName} handleName={props.handleName} handleType={props.handleType}/>
      </div>
    </div>
  </nav>
      
);


function ButtonDisplay(props){

  const handleLogout = () => {
    //Need to handle props.isAuthed some how
    signOut(props);
    props.handleAuthed('');
  }
  
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
                className="popup-set "
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
    return( <div className="text-white text-font text-center">
    <div>
    <ul className="navbar-nav">
      <li className="nav-item">
      <Link to="/profile/">
     <input type="submit" className="nav-link nav-btn btn text-font" value="Profile" />
    </Link>
    </li>
    <li className="nav-item">
      {/* <button  className=" nav-btn btn nav-link text-font" onClick={handleLogout}>
      Sign-Out</button> */}
      <Link to="/">
        <input type="submit" className="nav-link btn text-font" value="Log-Out" onClick={handleLogout} />
      </Link>
    </li>
    </ul>
    </div>
    
  </div>);
  }
}

export default withRouter(Nav);

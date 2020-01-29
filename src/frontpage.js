import React from 'react';
import logo from './shared/icons/logo.svg';
import './frontpage.css';
import SignIn from './sign-in/sign-in';
import SignUp from './sign-up/sign-up';
import Popup from 'reactjs-popup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/frontpage.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Popup modal trigger={<button>Sign-Up</button>}>
        <SignUp></SignUp>
        </Popup>
        <Popup modal trigger={<button>SignIn</button>}>
          <SignIn></SignIn>
        </Popup>
      </header>
      <div><p>Literally Anything else</p></div>
    </div>
  );
}

export default App;

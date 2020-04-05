import React, { useState, useEffect } from 'react';
import { BrowserRouter , Route } from "react-router-dom";
import QuestionList from '../components/questionList';
import Nav from '../components/nav';
import Profile from './profilePage';
import FrontPage from './frontpage';
import QuestionForm from './questionFormPage';

function App () {
  //Whether or not the user is logged in
  const [isAuthed, setAuthed] = useState(
    sessionStorage.getItem('Authenticated') || ''
  );
  useEffect(() => {
    sessionStorage.setItem('Authenticated', isAuthed);
  }, [isAuthed]);

  //The name of the logged in user
  const [displayName, setName] = useState(
    localStorage.getItem('DisplayName') || ''
  );
  useEffect(() => {
    localStorage.setItem('DisplayName', displayName);
  }, [displayName]);

  //The Permissions of the logged in user
  const [userType, setType] = useState(
    localStorage.getItem('Permissions') || ''
  );
  useEffect(() => {
    localStorage.setItem('Permissions', userType);
  }, [userType]);

  function handleAuthed(newVal) {
    setAuthed(newVal);
  }

  function handleName(newName) {
    setName(newName);
  }

  function handleType(newType){
    setType(newType);
  }

  return (
    <BrowserRouter>
      <div>
        <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossOrigin="anonymous"></link>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries"></script>
        
        <Nav isAuthed={isAuthed} handleAuthed={handleAuthed} displayName={displayName} handleName={handleName} handleType={handleType} />
        <Route path="/" exact render={(props) => <FrontPage {...props} />}/>
        <Route path="/results/*" exact render={(props) => <QuestionList {...props} isAuthed={isAuthed} userType={userType}/>}/>
        <Route path="/profile" exact render={(props) => <Profile {...props} handleName={handleName} displayName={displayName} isAuthed={isAuthed} />} />
        <Route path="/questionForm" exact render={(props) => <QuestionForm/>} />
      </div>
    </BrowserRouter>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";

//import { BrowserHistory } from 'react-history'

//import {getQuestions} from '../hooks/databaseHooks'
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

  //The results of the last search
  const [searchString, setSearch] = useState(
    sessionStorage.getItem('SearchString') || ''
  );
  useEffect(() => {
    sessionStorage.setItem('SearchString', searchString);
  }, [searchString]);

  //Whether or not the user is logged in
  const [urlString, setURL] = useState(
    sessionStorage.getItem('SearchURL') || ''
  );
  useEffect(() => {
    sessionStorage.setItem('SearchURL', urlString);
  }, [urlString]);

  // const [isAuthed, setAuthed] = useSessionStorage('Authenticated', isAuthed, setAuthed );
  // const [displayName, setName] = useSessionStorage('DisplayName', displayName, setName );
  // const [userType, setType] = useSessionStorage('Permissions', userType, setType );
  // const [searchString, setSearch] = useSessionStorage('SearchString',searchString, setSearch );

  function handleAuthed(newVal) {
    setAuthed(newVal);
  }

  function handleSearch(newSearch, newURL){
    //console.log(newSearch);
    setSearch(newSearch);
    setURL(newURL);
  }

  function handleName(newName) {
    //console.log(newName);
    setName(newName);
  }

  function handleType(newType){
    setType(newType);
    //console.log(newType);
  }

  return (
    <Router>
      <div>
        <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossOrigin="anonymous"></link>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries"></script>
        
        <Nav isAuthed={isAuthed} handleAuthed={handleAuthed} displayName={displayName} handleName={handleName} handleType={handleType} searchString={searchString} handleSearch={handleSearch}/>
        <Route path="/" exact render={(props) => <FrontPage {...props} searchString={searchString} urlString={urlString} handleSearch={handleSearch} />}/>
        <Route path="/results/*" exact render={(props) => <QuestionList {...props} searchString={searchString} handleSearch={handleSearch} isAuthed={isAuthed} userType={userType}/>}/>
        <Route path="/profile" exact render={(props) => <Profile {...props} handleName={handleName} displayName={displayName} isAuthed={isAuthed} />} />
        <Route path="/questionForm" exact render={(props) => <QuestionForm {...props} handleName={handleName} displayName={displayName} isAuthed={isAuthed} />} />
        <Switch>
          <Route path="/results/search=:id"> <RoutResults/></Route>
        </Switch>
      </div>
    </Router>
  );
}

function RoutResults() {
  // access dynamic URL variables
  let { id } = useParams();
  
  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export default App;

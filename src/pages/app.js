import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";

//import { BrowserHistory } from 'react-history'

//import {getQuestions} from '../hooks/databaseHooks'
import QuestionList from '../components/questionList';
import Nav from '../components/nav';

import Profile from './profilePage';
import FrontPage from './frontpage';

function App () {
  const [isAuthed, setAuthed] = useState(false);
  const [displayName, setName] = useState("");
  const [userType, setType] = useState("");
  const [searchString, setSearch] = useState("");

  function handleAuthed(newVal) {
    setAuthed(newVal);
  }

  function handleSearch(newSearch){
    setSearch(newSearch);
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
        
        <Nav isAuthed={isAuthed} handleAuthed={handleAuthed} displayName={displayName} handleName={handleName} handleType={handleType} />
        <Route path="/" exact render={(props) => <FrontPage {...props} searchString={searchString} onChange={handleSearch} />}/>
        <Route path="/results/*" exact render={(props) => <QuestionList {...props} searchString={searchString} onChange={handleSearch} isAuthed={isAuthed} userType={userType}/>}/>
        <Route path="/profile" exact render={(props) => <Profile {...props} handleName={handleName} displayName={displayName} isAuthed={isAuthed} />} />
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

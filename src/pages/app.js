import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";

//import { BrowserHistory } from 'react-history'

import {getQuestions} from '../hooks/databaseHooks'
import questionList from '../components/questionList';
import Nav from '../components/nav';

import profile from './profilePage';
import FrontPage from './frontpage';

class App extends React.Component {
  render(){
  getQuestions();
  return (
    <Router>

      <div>
        <link href="./bootstrap.min.css" rel="stylesheet"></link>
        <link href="./font-awesome.min.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossOrigin="anonymous"></link>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries"></script>
        
        <Nav />
        <Route path="/" exact component={FrontPage}></Route>
        <Route path="/results/*" exact component={questionList}/>
        <Route path="/profile" exact component={profile} />
        <Switch>
          <Route path="/results/:id"> <RoutResults/></Route>
        </Switch>

      </div>
    </Router>
  );
}
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

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";

import {getQuestions} from '../hooks/web_hooks'

import SimpleSearchBar from '../components/simple_searchbar'
import SearchBarText from '../components/searchbar_text'
import questionList from '../components/questionList';
import Nav from '../components/nav';

import profile from '../pages/profilePage';

function App() {
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
        <Route path="/" exact component={frontPage} />
        <Route path="/results/*" exact component={questionList}/>
        <Route path="/profile" exact component={profile} />
        <Switch>
          <Route path="/results/:id"> <RoutResults/></Route>
        </Switch>

      </div>
    </Router>
  );
}

const frontPage = () => (
  <div className="App container">
    <section id="signup" className="signup-section mt-5 justify-content-center d-flex h-100">
        <div className="mx-auto text-center jumbotron">
          <h1 className="text-white mb-4">Studique</h1>
          <h3 className="text-white mb-5">
            Crowdsourcing The College Experience
          </h3>
          {/* <SimpleSearchBar/> */}
          <SearchBarText/>
          <div className="text-white text-font">
            <div>
            Want to help others? </div>
            <Link to="/results/">
             <input type="submit" className="btn mb-1 btn-primary" value="Share Your Knowledge" />
            </Link>
          </div>
        </div>
    </section>
  </div>
);

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

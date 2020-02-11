import React from "react";
import SimpleSearchBar from "./components/simple_searchbar";
import { getQuestions } from "./web_hooks";

import questionList from './questionList/questionList';
import profile from './profilePage/profilePage';
import Nav from './components/nav';

import { BrowserRouter as Router, Route } from "react-router-dom";

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
        <Route path="/results" exact component={questionList} />
        <Route path="/profile" exact component={profile} />

      </div>
    </Router>
  );
}

const frontPage = () => (
  <div className="App bg-image">
    <section id="signup" className="signup-section my-5 imgbox center-fit">
      <div className="row">
        <div className="col-md-5 col-lg-8 mx-auto text-center">
          <h1 className="text-white mb-4">Studique</h1>
          <h3 className="text-white mb-5">
            Crowdsourcing The College Experience
          </h3>

          <SimpleSearchBar></SimpleSearchBar>
        </div>
      </div>
    </section>
  </div>
);

export default App;

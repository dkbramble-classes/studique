import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontpage';
import * as serviceWorker from './serviceWorker';
import './shared/css/bootstrap.min.css';
import './shared/css/style.css';
//import questionCards from './question-cards/questionCards';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

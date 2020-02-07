// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require("firebase/app");
require("firebase/database");
require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyA8F9gI68PiVnWJ6-_PqcGL_XGpQEhX8pg",
    authDomain: "studique-3179a.firebaseapp.com",
    databaseURL: "https://studique-3179a.firebaseio.com",
    projectId: "studique",
    storageBucket: "studique.appspot.com",
    messagingSenderId: "559326264470",
    appId: "1:559326264470:web:29267f7606276bfbc956b7"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export function getQuestions()
{
    database.ref('Questions/Q1').once('value').then(function (snapshot) {
        console.log(snapshot.val());
    });
}
// Firebase App (the core Firebase SDK) is always required and must be listed first
import {getUserInfo} from "./profileHooks";

const firebase = require("firebase/app");
const dotenv = require('dotenv');
require("firebase/database");
require("firebase/auth");


dotenv.config();
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "studique-3179a.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: "studique",
    storageBucket: "studique.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export function initializeUser(user, permission, displayName)
{
    console.log("Display name: " + displayName);
    if(user != null) {
        user.updateProfile({
            displayName: displayName,
        }).then(function() {
            console.log("Updated name sucessfully: " + user.displayName + " " + user.email);
            },
            function(error) {
            // An error happened
        }).catch(function (error) {
            console.log(error.message)
        });

        firebase.database().ref('users/' + user.uid).set({
            email: user.email,
            permissions: permission
        });
        let meta = {};
        setTimeout(() => {getUserInfo().then(function (result) {
            meta = result;
        })}, 1000);
        setTimeout(() => {
            console.log(meta);
        }, 1000);
    }
}

export function getUserMetadata(user)
{
    return database.ref('users/' + user.uid).once('value').then(function (snapshot) {
        let info = snapshot.val();
        let metadata = {};
        metadata["permissions"] = info.permissions;
        return metadata;
    }).then(result => {return result}).then(result => {return result});
    // let metadata = {};
    // let data = await database.ref('users/' + user.uid).once('value').then(function (snapshot) {
    //     let info = snapshot.val();
    //     let metadata = {};
    //     metadata["permissions"] = info.permissions;
    //     return metadata;
    // }).then(result => {return result}).then();
    // console.log(data);
    // console.log(metadata);
    //
    // return data;
}
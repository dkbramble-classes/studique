// Firebase App (the core Firebase SDK) is always required and must be listed first
import {getUserInfo} from "./profileHooks";

const firebase = require("firebase/app");
const dotenv = require('dotenv');
require("firebase/database");
require("firebase/auth");
require("firebase/storage");



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
const storage = firebase.storage();

export async function initializeUser(user, permission, displayName)
{
    if(user != null) {
        return await user.updateProfile({
            displayName: displayName,
        }).then( function() {
            return firebase.database().ref('users/' + user.uid).set({
                email: user.email,
                permissions: permission
            });
        }).then(function() {
            return getUserInfo().then(function (result) {
                console.log(result);
                return result["displayName"];
            });
        }).catch(function (error) {
            console.log(error.message)
        });
    }
}

export async function updateDisplayName(newName)
{
    let user = firebase.auth().currentUser;
    return await user.updateProfile({
        displayName: newName,
    })
}

export function getUserMetadata(user)
{
    return database.ref('users/' + user.uid).once('value').then(function (snapshot) {
        let info = snapshot.val();
        return info.permissions;
    }).then(result => {return result});
}

export function signOut(props){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        props.handleAuthed('');
      }).catch(function(error) {
        // An error happened.
      });      
}

export {
    storage, firebase as default
}
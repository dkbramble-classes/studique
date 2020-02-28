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

        // await firebase.database().ref('users/' + user.uid).set({
        //     email: user.email,
        //     permissions: permission
        // });
        //
        // return getUserInfo().then(function (result) {
        //     console.log(result);
        //     return result["displayName"];
        // });
    }
}

export function getUserMetadata(user)
{
    return database.ref('users/' + user.uid).once('value').then(function (snapshot) {
        let info = snapshot.val();
        return info.permissions;
    }).then(result => {return result});
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
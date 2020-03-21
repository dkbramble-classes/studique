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
    }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
}

export function signOut(props){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        props.handleAuthed('');
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
}

export function createQuestion(title, body, tagList) {
    const user = firebase.auth().currentUser;

    const postData = {
        uid: user.uid,
        Body: body,
        Title: title,
        Rating: 0,
        Tags: tagList,
        creationDate: Math.round((new Date()).getTime() / 1000),
    };
    console.log(postData);

    const newPostKey = firebase.database().ref().child('Questions/').push().key;

    return firebase.database().ref("Questions/" + newPostKey).set(postData);
}

export function addComment(q_id, body) {
    const user = firebase.auth().currentUser;

    const postData = {
        uid: user.uid,
        Body: body,
        creationDate: Math.round((new Date()).getTime() / 1000),
    };
    console.log(postData);

    const newPostKey = firebase.database().ref().child('Questions/' + q_id + '/Comments/').push().key;

    return firebase.database().ref("Questions/" + q_id + '/Comments/' + newPostKey).set(postData);
}

export async function updateRating( q_id, voteDir)
{
    const user = firebase.auth().currentUser;
    return firebase.database().ref("Questions/" + q_id + '/').once('value').then(function(snapshot) {
        if(user === null){
            throw new Error("You must be signed in");
        }
        let rating = snapshot.val().Rating;
        let color = "Neutral";
        let isUp = true;
        let isDown = true;
        let current_upvotes_list = snapshot.val().UpVotes;
        let current_downvotes_list = snapshot.val().DownVotes;
        if(voteDir === "UpVotes")
        {
            rating += 1;
            if(current_downvotes_list !== undefined) {
                let pos = current_downvotes_list.indexOf(user.uid);
                if (pos !== -1) {
                    current_downvotes_list.splice(pos, 1);
                    if(current_upvotes_list === undefined)
                    {
                        current_upvotes_list = [];
                    }
                }
                else if(current_upvotes_list === undefined)
                {
                    color = "Up";
                    isUp = false;
                    current_upvotes_list = [user.uid];
                }
                else{
                    color = "Up";
                    isUp = false;
                    current_upvotes_list.push(user.uid)
                }
            }
            else
            {
                current_downvotes_list = [];
                current_upvotes_list = [user.uid];
                color = "Up";
                isUp = false;
            }
        }
        else
        {
            rating -= 1;
            if(current_upvotes_list !== undefined) {
                let pos = current_upvotes_list.indexOf(user.uid);
                if (pos !== -1) {
                    current_upvotes_list.splice(pos, 1);
                    if(current_downvotes_list === undefined)
                    {
                        current_downvotes_list = [];
                    }
                }
                else if(current_downvotes_list === undefined)
                {
                    color = "Down";
                    isDown = false;
                    current_downvotes_list = [user.uid];
                }
                else {
                    color = "Down";
                    isDown = false;
                    current_downvotes_list.push(user.uid)
                }
            }
            else
            {
                current_upvotes_list = [];
                current_downvotes_list = [user.uid];
                color = "Down";
                isDown = false;
            }
        }
        firebase.database().ref("Questions/" + q_id + '/').update({
            Rating: rating,
            UpVotes: current_upvotes_list,
            DownVotes: current_downvotes_list,
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
        return {Rating: rating, Color: color, isUp: isUp, isDown: isDown};
    });
}

export function getRatingInfo(q_id)
{
    return firebase.database().ref("Questions/" + q_id + '/').once('value').then(function(snapshot) {
        let rating = snapshot.val().Rating;
        let color = "Neutral";
        let isUp = true;
        let isDown = true;
        const user = firebase.auth().currentUser;
        if(user === null){
            throw new Error("You must be signed in");
        }
        else {
            if (snapshot.val().UpVotes !== undefined && snapshot.val().UpVotes.includes(user.uid)) {
                color = "Up";
                isUp = false;
            } else if (snapshot.val().DownVotes !== undefined && snapshot.val().DownVotes.includes(user.uid)) {
                color = "Down";
                isDown = false;
            }
        }
        return {Rating: rating, color: color, isUp: isUp, isDown: isDown};
    })
}

export function getRating(q_id)
{
    return firebase.database().ref("Questions/" + q_id + '/').once('value').then(function(snapshot) {
        return snapshot.val().Rating;
    });
}

export {
    storage, firebase as default
}
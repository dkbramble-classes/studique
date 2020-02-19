const firebase = require("firebase/app");

require("firebase/auth");

export function signInFirebase(email, password)
{
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code + ": " + email);
        console.log(error.message);
    });
    let user = firebase.auth().currentUser;
    console.log(user.email);
}
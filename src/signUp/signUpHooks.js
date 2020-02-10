const firebase = require("firebase/app");

require("firebase/auth");

export function signUpFirebase(email, password)
{
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
}
import {initializeUser} from "./databaseHooks";
import {signInFirebase} from "./signInHooks";


const firebase = require("firebase/app");

require("firebase/auth");

export function signUpFirebase(email, password, permission, displayName, handleName, handleAuthed, handleType)
{
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        return signInFirebase(email,password).then(function() {
            return initializeUser(firebase.auth().currentUser, permission, displayName);
        });
    }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
    //Need to have a slight delay to signing in for Firebase to create the full user
    handleName(displayName);
    handleAuthed(true);
    handleType(permission);
    setTimeout(() => { signInFirebase(email,password); }, 1000);

    setTimeout(() => { initializeUser(firebase.auth().currentUser, permission, displayName); }, 4000);

}
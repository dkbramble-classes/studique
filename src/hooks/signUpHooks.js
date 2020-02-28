import {initializeUser} from "./databaseHooks";
import {signInFirebase} from "./signInHooks";


const firebase = require("firebase/app");

require("firebase/auth");

export function signUpFirebase(email, password, permission, displayName)
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
    // console.log("Logging in");
    // // let login = signInFirebase(email,password);
    // console.log(login);
    // setTimeout(() => { initializeUser(firebase.auth().currentUser, permission, displayName); }, 3000);
}
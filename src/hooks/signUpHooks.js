import {initializeUser} from "./databaseHooks";
import {signInFirebase} from "./signInHooks";


const firebase = require("firebase/app");

require("firebase/auth");

export function signUpFirebase(email, password, permission, displayName)
{
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        return signInFirebase(email,password).then(function() {
            return initializeUser(firebase.auth().currentUser, permission, displayName);
        }).catch(function(error) {
            //console.log(error.code);
            //console.log(error.message);
            alert("We had trouble signing you up. Please try again.");
        });
        
    }).catch(function(error) {
        //console.log(error.code);
        //console.log(error.message);
        alert("There was an issue. Please make sure you are using a GVSU authorized email and that your password is longer than 6 characters.");
    });
}
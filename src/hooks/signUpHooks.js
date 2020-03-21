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
            console.log(error.code);
            console.log(error.message);
        });
        
    }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
}
const firebase = require("firebase/app");

require("firebase/auth");

export function signInFirebase(email, password, setAuthed, setName, setType)
{
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code + ": " + email);
        console.log(error.message);
    });

    // setAuthed(true);
    // setName("HALLO");
    // setType("student");
}
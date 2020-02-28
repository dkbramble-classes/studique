const firebase = require("firebase/app");

require("firebase/auth");

export async function signInFirebase(email, password, setAuthed, setName, setType)
{
    let current_display_name = "";
    let login = await firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        return firebase.auth().currentUser;
    }).then(function(user) {
        current_display_name = user.displayName;
        return current_display_name;
    }).catch(function(error) {
        console.log(error.code + ": " + email);
        console.log(error.message);
    });

    // setAuthed(true);
    // setName("HALLO");
    // setType("student");
    return login;
}
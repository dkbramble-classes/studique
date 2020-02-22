import {getUserMetadata} from "./databaseHooks";

const firebase = require("firebase/app");

require("firebase/auth");

export async function getUserInfo()
{
    let user = firebase.auth().currentUser;
    console.log("In profile hooks: " + user.displayName + " " + user.email);
    let user_info = {
        "display name": user.displayName,
        "email": user.email
    };
     let metadata = {};
     getUserMetadata(user).then(function(result) {
         metadata = result;
     });
    setTimeout(() => { user_info["permissions"] = metadata["permissions"];
        console.log(user_info);
        return user_info; }, 1000);
}
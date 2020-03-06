import {getUserMetadata} from "./databaseHooks";

const firebase = require("firebase/app");

require("firebase/auth");

export async function getUserInfo()
{
    let user = firebase.auth().currentUser;
    let user_info = {
        "displayName": user.displayName,
        "email": user.email
     };
     return await getUserMetadata(user).then(function(permission) {
         user_info["permissions"] = permission;
         return user_info
     });
}


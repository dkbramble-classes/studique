import React, {useState} from "react";
import {signInFirebase} from "../hooks/signInHooks";
import "../css/signIn.css"

function SignIn(props){
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
  
    function handleEmail(ev) {
    
        if(ev.target.value.length < 30){
            setEmail(ev.target.value);
        }
    }
  
    function handlePassword(ev){
        if(ev.target.value.length < 30){
            setPassword(ev.target.value);
            alert("Password must be less than 30 characters.");
        }
    }

    async function doSignIn() {
        return await signInFirebase(userEmail, userPassword, props.handleAuthed, props.handleName, props.handleType).then(
            function(displayName) {
                if (displayName !== null){
                    props.handleName(displayName);
                    props.handleAuthed(true);
                    //ALSO NEED USER PERMISSION
                    //props.handleType(userPermission);
                }
                return displayName;
            }
        );
    }

    return (
        <div className="container mx-auto text-center pop-up">
            <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
            <h2 className="title">Sign-In</h2>
            <form onSubmit={ (e) => {doSignIn().then(function(display) {console.log("Signed in with name: " + display)}); e.preventDefault();}}>
                <div className="form-group row">
                    <input className="form-control input-medium"
                        id="inputEmailIn"
                        type="text"
                        value={
                            userEmail
                        }
                        name="userEmail"
                        placeholder="Email"
                        onChange={handleEmail}></input>
                </div>
                <div className="form-group row">
                    <input className="form-control input-medium" id="inputPasswordIn" type="password"
                        value={
                            userPassword
                        }
                        name="userPassword"
                        placeholder="Password"
                        onChange={handlePassword}></input>
                </div>
                <div className="form-group row last">
                    <input type="submit" id="signInSubmit" className="btn btn-primary mx-auto" value="Sign In"/>
                </div>
            </form>
        </div>
    );
}
export default SignIn;

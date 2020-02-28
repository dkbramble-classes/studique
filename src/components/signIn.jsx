import React, {useState} from "react";
import {signInFirebase} from "../hooks/signInHooks";

function SignIn(props){
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
  
    function handleEmail(ev) {
      setEmail(ev.target.value);
      console.log(userEmail);
    }
  
    function handlePassword(ev){
      setPassword(ev.target.value);
    }

    function doSignIn() {
        if (userEmail !== "" && userPassword !== ""){
            signInFirebase(userEmail, userPassword, props.handleAuthed, props.handleName, props.handleType);
        }
    }

    return (
        <div className="container mx-auto text-center pop-up">
            <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
            <h2 className="title">Sign-In</h2>
            <form onSubmit={doSignIn}>
                <div className="form-group row">
                    <input className="form-control input-medium"
                        id="inputText"
                        type="text"
                        value={
                            userEmail
                        }
                        name="userEmail"
                        placeholder="Email"
                        onChange={handleEmail}></input>
                </div>
                <div className="form-group row">
                    <input className="form-control input-medium" id="inputText" type="password"
                        value={
                            userPassword
                        }
                        name="userPassword"
                        placeholder="Password"
                        onChange={handlePassword}></input>
                </div>
                <div className="form-group row last">
                    <input type="submit" className="btn btn-primary mx-auto" value="Sign In"/>
                </div>
            </form>
        </div>
    );
}
export default SignIn;

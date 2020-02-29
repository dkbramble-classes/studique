import React, {useState} from "react";
import {signUpFirebase} from "../hooks/signUpHooks";
//import { Redirect } from "react-router";
//import Popup from "reactjs-popup";


function SignUp (props){
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userPermission, setPermission] = useState("student");
    const [userDisplay, setDisplay] = useState("");

    function handleEmail(ev) {
      setEmail(ev.target.value);
    }
  
    function handlePassword(ev){
      setPassword(ev.target.value);
    }

    function handlePermission(ev) {
        setPermission(ev.target.value);
      }
    function handleDisplay(ev){
        setDisplay(ev.target.value);
    }
    async function doSignUp(ev) {
        let signed_up = Promise.resolve(null);
        if (userPassword.length < 6)
        {
            console.log("Password must be 6 characters long.")
        }
        else if (userEmail.indexOf("mail.gvsu.edu") !== -1) {
            signed_up = await signUpFirebase(userEmail, userPassword, userPermission, userDisplay);

            if (signed_up !== null){
                //console.log(signed_up);
                props.handleName(signed_up);
                props.handleAuthed(true);
                props.handleType(userPermission);
            }
        }
        return signed_up
    }
        return (
            <div className="container mx-auto text-center pop-up">
                <h2 className="title">Sign-Up</h2>
                <form onSubmit={(e) => {doSignUp().then(function(display) {console.log("Signed in with name: " + display)}); e.preventDefault();}}>
                    <div className="form-group row">
                        <input className="form-control input-medium" id="inputText" type="text"
                            value={
                                userDisplay
                            }
                            name="displayName"
                            placeholder="Full Name"
                            onChange={handleDisplay}></input>
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-medium" type="text"
                            value={
                                userEmail
                            }
                            name="userEmail"
                            placeholder="Email"
                            onChange={handleEmail}></input>
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-medium" type="password"
                            value={
                                userPassword
                            }
                            name="userPassword"
                            placeholder="Password"
                            onChange={handlePassword}
                        ></input>
                    </div>
                    <div className="form-group">
                        <h4 className="text-white">User Type:</h4>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="userType"
                                   value="student"
                                   onChange={handlePermission}/>
                                   <label className="form-check-label">Student</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="userType" value="teacher"
                                onChange={handlePermission}
                              />
                            <label className="form-check-label">
                                Teacher
                            </label>
                        </div>
                    </div>
                    <div className="form-group row last">
                        <input type="submit" className="btn btn-primary mx-auto" value="Sign Up"/>
                    </div>
                </form>
            </div>
        );
}
export default SignUp;


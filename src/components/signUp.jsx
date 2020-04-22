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

        var teach = ev.target.value.includes("@gvsu.edu");
        var learn = ev.target.value.includes("@mail.gvsu.edu")
        if (learn){
            setPermission("student");
        } else if (teach && !learn){
            setPermission("teacher");
        }
        if(ev.target.value.length < 30){
        setEmail(ev.target.value);
        }
    }
  
    function handlePassword(ev){
        if(ev.target.value.length < 30){
            setPassword(ev.target.value);
        }
        else{
            alert("Your password must be less than 30 characters.");
        }
    }

    function handleDisplay(ev){
        if(ev.target.value.length < 30){
            setDisplay(ev.target.value);
           
        }else{
            alert("Your name must be less than 30 characters.");
        }
    }
    async function doSignUp(ev) {
        let signed_up = Promise.resolve(null);
        if (userPassword.length < 6)
        {
            //console.log("Password must be 6 characters long.")
            alert("Password must be atleast 6 characters long. ");
        }
        else if (userEmail.indexOf("@mail.gvsu.edu") !== -1 || userEmail.indexOf("@gvsu.edu") !== -1) {
            signed_up = await signUpFirebase(userEmail, userPassword, userPermission, userDisplay);

            if (signed_up !== null){
                //console.log(signed_up);
                props.handleName(signed_up);
                props.handleAuthed(true);
                props.handleType(userPermission);
            }
        }
        else{
            alert("There was an issue. Please make sure you are using a GVSU authorized email and that your password is longer than 6 characters.");
        }
        return signed_up
    }
        return (
            <div className="container mx-auto text-center pop-up">
                <h2 className="title">Sign-Up</h2>
                <form onSubmit={(e) => {doSignUp().then(function(display) {}); e.preventDefault();}}>
                    <div className="form-group row">
                        <input className="form-control input-medium" id="inputDisplayUp" type="text"
                            value={
                                userDisplay
                            }
                            name="displayName"
                            placeholder="Full Name"
                            onChange={handleDisplay}></input>
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-medium" type="text" id="inputEmailUp"
                            value={
                                userEmail
                            }
                            name="userEmail"
                            placeholder="Email"
                            onChange={handleEmail}></input>
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-medium" type="password" id="inputPasswordUp"
                            value={
                                userPassword
                            }
                            name="userPassword"
                            placeholder="Password"
                            onChange={handlePassword}
                        ></input>
                    </div>
                    <div className="form-group row last">
                        <input type="submit" className="btn btn-primary mx-auto" id="inputSignin" value="Sign Up"/>
                    </div>
                </form>
            </div>
        );
}
export default SignUp;


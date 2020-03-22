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
            // console.log("student");
        } else if (teach && !learn){
            setPermission("teacher");
            // console.log("teacher");
        }
        if(ev.target.value.length < 30){
        setEmail(ev.target.value);
        }
    //   console.log("TEECH" + teach);
    //   console.log("LEARN" + learn);
    }
  
    function handlePassword(ev){
        if(ev.target.value.length < 30){
            setPassword(ev.target.value);
        }
    }

    // function handlePermission(ev) {
    //     setPermission(ev.target.value);
    //   }
    function handleDisplay(ev){
        if(ev.target.value.length < 30){
            setDisplay(ev.target.value);
        }
    }
    async function doSignUp(ev) {
        let signed_up = Promise.resolve(null);
        if (userPassword.length < 6)
        {
            console.log("Password must be 6 characters long.")
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
        return signed_up
    }
        return (
            <div className="container mx-auto text-center pop-up">
                <h2 className="title">Sign-Up</h2>
                <form onSubmit={(e) => {doSignUp().then(function(display) {console.log("Signed in with name: " + display)}); e.preventDefault();}}>
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


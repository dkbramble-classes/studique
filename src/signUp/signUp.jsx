import React, {Component} from "react";
import "./signUp.css";
import {signUpFirebase} from "./signUpHooks";
class SignUp extends Component {
    doSignUp()
    {
        console.log(this.state.userEmail.indexOf("mail.gvsu.edu"));
        if(this.state.userEmail.indexOf("mail.gvsu.edu") !== -1)
        {
            signUpFirebase(this.state.userEmail, this.state.userPassword);
        }
    }
    render(){
        return (
        <div className = "popup">
            <h2 className = "title">Sign-Up</h2>
            <div>
                <div>
                <input
                className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                style={{ width:"80%"}} 
                id="inputText" type="text" 
                value={this.state.displayName}
                name = "displayName"
                placeholder = "Full Name"
                onChange={(e) => this.updateFormData(e)}></input></div>
                <div>
                <input 
                className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                style={{ width:"80%"}} type="text" 
                value={this.state.userEmail}
                name = "userEmail"
                placeholder = "Email"
                onChange={(e) => this.addFormData(e)}></input></div>
                <div>
                <input className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                style={{ width:"80%"}} type="password" 
                value = {this.state.userPassword}
                name = "userPassword"
                placeholder = "Password"
                onChange={(e) => this.addFormData(e)}></input></div>
                <div>
                <h3>User Type:</h3>
                <tbody>
                    <td><input type="radio" name="faculty" />Faculty</td>
                    <td><input type="radio" name="student"/>Student</td>
                    </tbody>
                </div>
                    
                <div>
                        <button className="btn btn-primary mx-auto" onClick={() => this.doSignUp()}>Sign-Up</button>
                </div>
                <div>
                    <button className="btn btn-secondary mx-auto" onClick={() => this.doGoogleSignUp()}>Sign-Up with Google</button>
                </div>
            </div>
        </div>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            userEmail: "",
            userPassword: ""
        }
    }

    addFormData(ev){
        this.setState({[ev.target.name]: ev.target.value});
    }
    
}
export default SignUp;
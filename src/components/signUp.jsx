import React, {Component} from "react";
import {signUpFirebase} from "../hooks/signUpHooks";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";


class SignUp extends Component {
    doSignUp() {
        console.log(this.state.userEmail.indexOf("mail.gvsu.edu"));
        if (this.state.userEmail.indexOf("mail.gvsu.edu") !== -1) {
            signUpFirebase(this.state.userEmail, this.state.userPassword);
        }
    }
    render() {
        return (
            <div className="container mx-auto text-center pop-up">
                <h2 className="title">Sign-Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <input className="form-control input-medium" id="inputText" type="text"
                            value={
                                this.state.displayName
                            }
                            name="displayName"
                            placeholder="Full Name"
                            onChange={
                                (e) => this.addFormData(e)
                        }></input>
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-medium" type="text"
                            value={
                                this.state.userEmail
                            }
                            name="userEmail"
                            placeholder="Email"
                            onChange={
                                (e) => this.addFormData(e)
                        }></input>
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-medium" type="password"
                            value={
                                this.state.userPassword
                            }
                            name="userPassword"
                            placeholder="Password"
                            onChange={
                                (e) => this.addFormData(e)
                        }></input>
                    </div>
                    <div className="form-group">
                        <h4 className="text-white">User Type:</h4>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="userType" id="student" value="student" checked/>
                            <label class="form-check-label" for="student">
                                Student
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="userType" id="teacher" value="teacher"/>
                            <label class="form-check-label" for="teacher">
                                Teacher
                            </label>
                        </div>
                    </div>
                   
                    <Link to="/profile">
                    <div className="form-group row last">
                        <button className="btn btn-primary mx-auto"
                            onClick={() =>{
                                this.doSignUp();
                        }}>Sign-Up</button>
                        </div>
                    </Link>
                </form>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            userType: "student",
            displayName: "",
            userEmail: "",
            userPassword: ""
        }
    }

    addFormData(ev) {
        this.setState({[ev.target.name]: ev.target.value});
    }

}
export default SignUp;

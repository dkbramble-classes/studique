import React, {Component} from "react";
import {signInFirebase} from "../hooks/signInHooks";

class SignIn extends Component {

    doSignIn() {
        signInFirebase(this.state.userEmail, this.state.userPassword);
    }

    render() {
        return (
            <div className="container mx-auto text-center pop-up">
                <link href="./bootstrap.min.css" rel="stylesheet"></link>
                <link href="./font-awesome.min.css" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
                <h2 className="title">Sign-In</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <input className="form-control input-medium"
                            id="inputText"
                            type="text"
                            value={
                                this.state.userEmail
                            }
                            name="userEmail"
                            placeholder="Email"
                            onChange={
                                (e) => this.updateFormData(e)
                        }></input>
                    </div>
                    <div className="form-group row">
                        <input className="form-control input-medium" id="inputText" type="password"
                            value={
                                this.state.userPassword
                            }
                            name="userPassword"
                            placeholder="Password"
                            onChange={
                                (e) => this.updateFormData(e)
                        }></input>
                    </div>
                    <div className="form-group row last">
                        <button className="btn btn-primary mx-auto"
                            onClick={
                                () => this.doSignIn()
                        }>Sign-In</button>
                    </div>
                </form>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            userEmail: "",
            userPassword: ""
        }
    }

    updateFormData(ev) {
        this.setState({[ev.target.name]: ev.target.value});
    }


}
export default SignIn;

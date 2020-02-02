import React, {Component} from "react";
import "./sign-up.css";
class SignUp extends Component {
    render(){
        return (
        <div className = "popup">
            <h2 className = "title">Sign-Up</h2>
            <div>
                <div>
                {/* <label className="label">Email: </label> */}
                <input className="input" type="text" 
                value={this.state.userEmail}
                name = "userEmail"
                placeholder = "Email"
                onChange={(e) => this.addFormData(e)}></input></div>
                <div>
                {/* <label className="label">Password: </label> */}
                <input className="input" type="password" 
                value = {this.state.userPassword}
                name = "userPassword"
                placeholder = "Password"
                onChange={(e) => this.addFormData(e)}></input></div>
                <div>
                        <button className="btn btn-primary mx-auto" onClick={() => this.doSignUp()}>Sign-Up</button>
                </div>
                <div>
                    <button className="btn-google" onClick={() => this.doGoogleSignUp()}>Sign-Up with Google</button>
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
import React, {Component} from "react";
class SignIn extends Component {
    render(){
        return (
        <div className = "popup">
            <h2 className = "title">Sign-In</h2>
            <div>
                <div>
                <input classname = "input" type="text" 
                value={this.state.userEmail}
                name = "userEmail"
                placeholder = "Email"
                onChange={(e) => this.updateFormData(e)}></input></div>
                <div>
                <input classname = "input" type="password" 
                value = {this.state.userPassword}
                name = "userPassword"
                placeholder = "Password"
                onChange={(e) => this.updateFormData(e)}></input></div>
                <div>
                        <button className="btn btn-primary mx-auto" onClick={() => this.doSignIn()}>Sign-In</button>
                </div>
                <div>
                        <button className="btn-google" onClick={() => this.doGoogleSignIn()}>Sign-In with Google</button>
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

    updateFormData(ev){
        this.setState({[ev.target.name]: ev.target.value});
    }

    
    
}
export default SignIn;
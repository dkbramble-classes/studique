import React, {Component} from "react";
import "./sign-up.css";
class SignUp extends Component {
    render(){
        return (
        <div className = "background">
            <h2>Sign-Up</h2>
            <div>
                <label className = "label">Email: </label>
                <input type="text" 
                value={this.state.userEmail}
                name = "userEmail"
                onChange={(e) => this.addFormData(e)}></input>
                <label className = "label">Password: </label>
                <input type="password" 
                value = {this.state.userPassword}
                name = "userPassword"
                onChange={(e) => this.addFormData(e)}></input>
                <div>
                        <button onClick={() => this.doSignUp()}>Sign-Up</button>
                </div>
                <div>
                    <button onClick={() => this.doGoogleSignUp()}>Sign-Up with Google</button>
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
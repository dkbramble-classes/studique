import React, {Component} from "react";
class SignIn extends Component {
    render(){
        return (
        <div>
            <h2>Sign-In</h2>
            <div>
                <label>Email: </label>
                <input type="text" 
                value={this.state.userEmail}
                name = "userEmail"
                onChange={(e) => this.updateFormData(e)}></input>
                <label>Password: </label>
                <input type="password" 
                value = {this.state.userPassword}
                name = "userPassword"
                onChange={(e) => this.updateFormData(e)}></input>
                <div>
                        <button onClick={() => this.doSignIn()}>Sign-In</button>
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
import React, {Component} from "react";
class SignIn extends Component {
    render(){
        return (
        <div className = "popup">
            <link href="./bootstrap.min.css" rel="stylesheet"></link>
            <link href="./font-awesome.min.css" rel="stylesheet"></link>
            <link
                href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap"
                rel="stylesheet"
            ></link>
            <h2 className = "title">Sign-In</h2>
            <div>
                <div>
                <input
                className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                style={{ width:"80%"}} 
                id="inputText" type="text" 
                value={this.state.userEmail}
                name = "userEmail"
                placeholder = "Email"
                onChange={(e) => this.updateFormData(e)}></input></div>
                <div>
                <input className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                id="inputText" type="password" 
                style={{ width:"80%" }} 
                value = {this.state.userPassword}
                name = "userPassword"
                placeholder = "Password"
                onChange={(e) => this.updateFormData(e)}></input></div>
                <div>
                        <button className="btn btn-primary mx-auto" onClick={() => this.doSignIn()}>Sign-In</button>
                </div>
                <div>
                        <button className="btn btn-secondary mx-auto" onClick={() => this.doGoogleSignIn()}>Sign-In with Google</button>
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
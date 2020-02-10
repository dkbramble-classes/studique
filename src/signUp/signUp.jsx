import React, {Component} from "react";
import "./signUp.css";
import  Dropdown from "react-simple-dropdown";
import DropdownTrigger from "react-simple-dropdown";
import DropdownContent from "react-simple-dropdown";
class SignUp extends Component {
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
                 <Dropdown className="dropdown">
                <DropdownTrigger className="dropdown--active">User Type</DropdownTrigger>
                <DropdownContent className="dropdown__content">
                    <ul>
                        <li>
                            <a href="student">Student</a>
                        </li>
                        <li>
                            <a href="faculty">Faculty</a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
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
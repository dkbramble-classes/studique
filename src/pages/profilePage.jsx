import React from 'react';
import '../css/profilePage.css';


function Profile() {
    return (
        <div>
            <h2 className="userDisplayName">User Name</h2>
            <p className="userEmail">Email: test@mail.gvsu.edu</p>
            
            <img
              className="profileImage"
              src={require("../images/profile.png")}
              alt="profilePic"
            />
            
        </div>

    );
}

export default Profile;
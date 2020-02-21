import React from 'react';
import '../css/profilePage.css';

function Profile() {
    return (
        <div>
            <h1>profile page</h1>
            <h2 className="userDisplayName">User Name</h2>
            <p className="userEmail">Email: test@mail.gvsu.edu</p>
            
        </div>

    );
}

export default Profile;
import React from 'react';
import '../css/profilePage.css';
import QCards from '../components/questionCards';


function Profile() {
    return (
        <div className="profile">
            <div className="profileContainer">
                {/* <div className="profileCard"> */}
                    <div className="userInfo">
                        <h2 className="userDisplayName">Display Name</h2>
                        
                        <p className="userEmail">Email: test@mail.gvsu.edu</p>

                        <img className="profileImage"
                            src={
                                require("../images/profile.png")
                            }
                            alt="profilePic"/>
                    </div>
                {/* </div> */}
            </div>


            <div className="qListContainer">
                <div className="myQList">
                    <QCards/>
                    <QCards/>
                    <QCards/>
                    <QCards/>
                    <QCards/>
                    <QCards/>
                </div>
            </div>


        </div>

    );
}

export default Profile;

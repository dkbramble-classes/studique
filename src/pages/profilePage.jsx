import React from 'react';
import '../css/profilePage.css';
import QCards from '../components/questionCards';

function Profile(props) {

    return (
        <div className="profile">
            <div className="profileContainer">
                <div className="userInfo">
    <h2>{props.displayName}</h2>
                    <img className="profileImage"
                        src={
                            require("../images/profile.png")
                        }
                        alt="profilePic"/>
                </div>
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

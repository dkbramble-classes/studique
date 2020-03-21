import React, { useState } from "react";
import "../css/profilePage.css";
import QCards from "../components/questionCards";
import {
  storage,
  updateDisplayName,
  updatePhotoUrl
} from "../hooks/databaseHooks";

function Profile(props) {
  const [imageAsFile, setImageAsFile] = useState("");
  const [tempName, setTempName] = useState(props.displayName);
  const [profileImageURL, setProfileImageURL] = useState("");
  const [isEnabled, setEnabled] = useState(false);

  /*Code adapted from Tallan Groberg
    here is the link to his tutorial https://dev.to/tallangroberg/how-to-do-image-upload-with-firebase-in-react-cpj*/

  const handleImageAsFile = e => {
    const image = e.target.files[0];
    setImageAsFile(imgUrl => image);
    setEnabled(true);
  };

  async function handleTempName(newVal) {
    setTempName(newVal.target.value);
    await updateDisplayName(newVal.target.value);
  }

  function handleNameSubmit(newVal) {
    props.handleName(newVal.target.value);
  }

  const handleFireBaseUpload = async e => {
    let firebase = require("firebase/app");
    let user = firebase.auth().currentUser;
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    if(user){
    storage
      .ref(`/images/${user.email.substring(0, user.email.lastIndexOf("@"))}`)
      .put(imageAsFile);
    var mySubString =
      user.email.substring(0, user.email.lastIndexOf("@")) + "_200x200";

    await updatePhotoUrl(
      storage
        .ref("images")
        .child(mySubString)
        .getDownloadURL()
    );
    }
  };

  // gets the functions from storage refences the image storage in firebase by the children
  // gets the download url then sets the image from firebase as the value for the imgUrl key:
  if (props.displayName !== "") {
    try {
      let firebase = require("firebase/app");
      //let user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
        var mySubString =
          user.email.substring(0, user.email.lastIndexOf("@")) + "_200x200";
        storage
          .ref("images")
          .child(mySubString)
          .getDownloadURL()
          .then(fireBaseUrl => {
            setProfileImageURL(prevObject => ({
              ...prevObject,
              imgUrl: fireBaseUrl
            }));
          });
        }
      });
    } catch (e) {
      return (
        <div>
          <h2>Login in to access your profile</h2>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="profileContainer">
          <div className="userInfo">
            <h2>
              <input
                type="text"
                className="invisible-input"
                maxLength="20"
                value={tempName}
                onChange={handleTempName}
                onBlur={handleNameSubmit}
              />
            </h2>
            <img
              className="profileImage"
              src={profileImageURL.imgUrl}
              alt="Profile"
            />
          </div>
          <div className="edit">
            <form onSubmit={handleFireBaseUpload}>
              {/* <input
                type="button"
                id="loadFile"
                value="Select File"
                onclick="document.getElementById('file').click();"
                className="btn btn-secondary"
              /> */}

              <input id="file" type="file" onChange={handleImageAsFile} />
              <button
                id="upload"
                disabled={!isEnabled}
                className="btn btn-secondary"
              >
                Upload Picture
              </button>
            </form>
          </div>
        </div>

        <div className="qListContainer">
          <div className="myQList">
            <QCards objectID={"-M2u7ipUHZxUPo0cN5S2"} />
            <QCards objectID={"-M2u7ipUHZxUPo0cN5S2"} />
            <QCards objectID={"-M2e51Q3wLz6uViSkt5h"} />
            <QCards objectID={"-M2e51Q3wLz6uViSkt5h"} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Login in to access your profile</h2>
      </div>
    );
  }
}

export default Profile;

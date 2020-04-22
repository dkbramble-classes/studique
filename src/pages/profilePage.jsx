import React, { useState } from "react";
import "../css/profilePage.css";
import {
  storage,
  updateDisplayName,
  updatePhotoUrl
} from "../hooks/databaseHooks";
import AlgoliaSearch from "../components/algoliaSearch";

function Profile(props) {
  const [imageAsFile, setImageAsFile] = useState("");
  const [tempName, setTempName] = useState(props.displayName);
  const [profileImageURL, setProfileImageURL] = useState(
    require("../images/louieLaker.jpg")
  );
  const [isEnabled, setEnabled] = useState(false);
  const [uid, setUid] = useState("");

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

  const handleFireBaseUpload = e => {
    let firebase = require("firebase/app");
    let currUser = firebase.auth().currentUser;

    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      alert(`Not an image, the image file is a ${typeof imageAsFile}`);
    }
    if (currUser) {
      try {
        storage
          .ref(
            `/images/${currUser.email.substring(
              0,
              currUser.email.lastIndexOf("@")
            )}`
          )
          .put(imageAsFile);
        var mySubString =
          currUser.email.substring(0, currUser.email.lastIndexOf("@")) +
          "_200x200";

        storage
          .ref("images")
          .child(mySubString)
          .getDownloadURL()
          .then(function(snapshot) {
            updatePhotoUrl(snapshot).then(function() {
              setTimeout(() => {
                window.location.reload(false)
              }, 2500);
            }).catch(function(error) {
              console.log("Error: " + error.message);
            }).catch(function (error){
              alert(error.message);
            });
          });
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    }
  };

  // gets the functions from storage refences the image storage in firebase by the children
  // gets the download url then sets the image from firebase as the value for the imgUrl key:
  if (props.displayName !== "") {
    try {
      let firebase = require("firebase/app");
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var mySubString =
            user.email.substring(0, user.email.lastIndexOf("@")) + "_200x200";
          try {
            storage
              .ref("images")
              .child(mySubString)
              .getDownloadURL()
              .then(fireBaseUrl => {
                if (fireBaseUrl === "") {
                  setProfileImageURL(require("../images/louieLaker.jpg"));
                } else {
                  setProfileImageURL(fireBaseUrl);
                }
                updatePhotoUrl(fireBaseUrl).catch(function(error) {
                  console.log("Error: " + error.message);
                });
              });
          } catch (e) {
            console.log(e);
            alert(e.message);
          }
        }
      });
    } catch (e) {
      return (
        <div>
          <h2>Login in to access your profile</h2>
        </div>
      );
    }

    if (!uid) {
      let firebase = require("firebase/app");
      let currUser = firebase.auth().currentUser;

      if (currUser) {
        setUid(currUser.uid);
      } else {
        return (
          <div>
            <h2>Login in to access your profile</h2>
          </div>
        );
      }
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
                id="profileNameInput"
                onChange={handleTempName}
                onBlur={handleNameSubmit}
              />
            </h2>
            <img className="profileImage" src={profileImageURL} alt="Profile" />
          </div>
          <div className="edit">
            <form onSubmit={handleFireBaseUpload}>
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
            <AlgoliaSearch userSearchString={uid} sortOption="user" />
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

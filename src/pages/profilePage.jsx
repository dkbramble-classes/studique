import React, {useState} from 'react';
import '../css/profilePage.css';
import QCards from '../components/questionCards';
import {storage, updateDisplayName} from '../hooks/databaseHooks';

function Profile(props) {

    const allInputs = {
        imgUrl: ''
    };
    const [imageAsFile, setImageAsFile] = useState('');
    const [tempName, setTempName] = useState(props.displayName);
    const [imageAsURL, setImageAsUrl] = useState(allInputs);
    const [profileImageURL, setProfileImageURL] = useState('');


    /*Code adapted from Tallan Groberg
    here is the link to his tutorial https://dev.to/tallangroberg/how-to-do-image-upload-with-firebase-in-react-cpj*/

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    async function handleTempName(newVal) {
        setTempName(newVal.target.value);
        await updateDisplayName(newVal.target.value);
    }

    function handleNameSubmit(newVal){
        props.handleName(newVal.target.value);
    }

    const handleFireBaseUpload = e => {
        let firebase = require("firebase/app");
        let user = firebase.auth().currentUser;
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${
                typeof(imageAsFile)
            }`)
        }
        const uploadTask = storage.ref(`/images/${
            user.email
        }`).put(imageAsFile)
        // initiates the firebase side uploading
        uploadTask.on('state_changed', (snapShot) => { // takes a snap shot of the process as it is happening
            console.log(snapShot)
        }, (err) => { // catches the errors
            console.log(err)
        }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            firebase.auth().onAuthStateChanged(function(user) {
            storage.ref('images').child(user.email).getDownloadURL().then(fireBaseUrl => {
                setImageAsUrl(prevObject => ({
                    ...prevObject,
                    imgUrl: fireBaseUrl
                }))
            })});
        })
    }

    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    if (props.displayName !== ""){
        try{
            let firebase = require("firebase/app");
            let user = firebase.auth().currentUser;
            firebase.auth().onAuthStateChanged(function(user) {
                storage.ref('images').child(user.email).getDownloadURL().then(fireBaseUrl => {
                    setProfileImageURL(prevObject => ({
                        ...prevObject,
                        imgUrl: fireBaseUrl
                    }))
                })
            });
            
        }
        catch(e){
            return(
                <div>
                <h2>Login in to access your profile</h2>
            </div>
            )
        }
        

        return (

            <div className="profile">
                <div className="profileContainer">
                    <div className="userInfo">
                        <h2>
                        <input type="text" className="invisible-input" maxLength="20" value={tempName} onChange={handleTempName} onBlur={handleNameSubmit}/>
                        </h2>
                        <img className="profileImage"
                            src={
                                profileImageURL.imgUrl
                            }
                            alt="Profile"/>
                    </div>
                    <div className="edit">
                        <form onSubmit={handleFireBaseUpload}>
                            <input type="file"
                                onChange={handleImageAsFile}/>
                            <button>Upload Profile Picture</button>
                        </form>
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
    } else {
        return (
            <div>
                <h2>Login in to access your profile</h2>
            </div>
        );
    }
}

export default Profile;

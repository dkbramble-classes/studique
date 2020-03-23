// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const ALGOLIA_POSTS_INDEX_NAME = 'Questions';
const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);

exports.updateAlgolia = functions.database.ref('/Questions/{q_id}/').onWrite(async (data, context) => {
        const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);

        // An empty val() signifies deletion.
        if(data.after.val() === null)
        {
            await index.deleteObject(context.params.q_id);
        }
        else {
            const firebaseObject = {
                Body: data.after.val().Body,
                Title: data.after.val().Title,
                Rating: data.after.val().Rating,
                CreationDate: data.after.val().creationDate,
                Tags: data.after.val().Tags,
                //UserType: data.after.val().userType,
                UserID: data.after.val().uid,
                UserDisplayName: data.after.val().UserDisplayName,
                UserPhoto: data.after.val().UserPhoto,
                Comments: data.after.val().Comments,
                objectID: context.params.q_id
            };

            await index.saveObject(firebaseObject);
        }
});
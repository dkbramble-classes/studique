// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

exports.updateAlgolia = functions.database.ref('/Questions').onWrite((snapshot, context) => {
    console.log("In the fucntion");
    const algolia = algoliasearch(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_API_KEY
    );
    console.log("Did algolia search");
    const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);
    const questions = snapshot.after.val();
    console.log(questions);
    const records = [];
    for(let q_id in questions)
    {
        // get the key and data from the snapshot
        const childKey = q_id;
        console.log(q_id);
        const childData = questions[q_id];
        // We set the Algolia objectID as the Firebase .key
        childData.objectID = childKey;
        // Add object for indexing
        records.push(childData);
    }
    // questions.forEach(question => {
    //     // get the key and data from the snapshot
    //     const childKey = question.key;
    //     const childData = question.val();
    //     // We set the Algolia objectID as the Firebase .key
    //     childData.objectID = childKey;
    //     // Add object for indexing
    //     records.push(childData);
    // });

    // Add or update new objects
    index
        .saveObjects(records)
        .then(() => {
            console.log('Questions imported into Algolia');
            return;
        })
        .catch(error => {
            console.error('Error when importing Questions into Algolia', error);
            process.exit(1);
        });
});
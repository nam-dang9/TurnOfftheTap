console.log("In readData.js");

var userBody;
var hair;
var userHairColor;
var userSkin;
var loadedData = false;

function readData() {

    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true };
    firestore.settings(settings);

    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            var uid = firebase.auth().currentUser.uid;
            console.log("uid: " + uid);
            var uName = firebase.auth().currentUser.displayName;
            console.log("name: " + uName);

            var readUserData = db.collection("Users").doc(uid);

            readUserData.get().then(function (doc) {
                if (doc.exists) {

                    userBody = doc.data().body;
                    console.log("In readData, Body: " + userBody);
                    if (userBody == undefined) {
                        console.log("is undefined");
                        userBody = 'shirt1';
                    }

                    hair = doc.data().hair;
                    console.log("hair: " + hair);
                    if (hair == undefined) {
                        console.log("is undefined");
                        hair = 'hair1';
                    }

                    userHairColor = doc.data().hairColor;
                    console.log("hairColor: " + userHairColor);
                    if (userHairColor == undefined) {
                        console.log("is undefined");
                        userHairColor = '0x002aff';
                    }

                    userSkin = doc.data().skin;
                    console.log("Skin " + userSkin);
                    if (userSkin == undefined) {
                        console.log("is undefined");
                        userSkin = '0xdc9556';
                    }

                    loadedData = true;

                } else {

                    userBody = 'shirt1';
                    hair = 'hair6';
                    userHairColor = '0x002aff';
                    userSkin = '0xdc9556';

                    console.log("No such doc!");
                }

                

            }).catch(function (error) {
                console.log("Error getting doc", error);
            });

        } else {
            console.log("Cannot read the data from the db");
        }
    });

}
var userBody;
var hair;
var userHairColor;
var userSkin;
var loadedData = false;
var firestore;

function readData() {

    firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true };
    firestore.settings(settings);

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            var uid = firebase.auth().currentUser.uid;
            var uName = firebase.auth().currentUser.displayName;
            var readUserData = firestore.collection("Users").doc(uid);

            readUserData.get().then(function (doc) {
                if (doc.exists) {

                    userBody = doc.data().body;
                    if (userBody == undefined) {
                        userBody = 'shirt1';
                    }

                    hair = doc.data().hair;
                    if (hair == undefined) {
                        hair = 'hair1';
                    }

                    userHairColor = doc.data().hairColor;
                    if (userHairColor == undefined) {
                        userHairColor = '0x002aff';
                    }

                    userSkin = doc.data().skin;
                    if (userSkin == undefined) {
                        userSkin = '0xdc9556';
                    }

                    loadedData = true;

                } else {

                    userBody = 'shirt1';
                    hair = 'hair6';
                    userHairColor = '0x002aff';
                    userSkin = '0xdc9556';

                    loadedData = true;
                }

                

            }).catch(function (error) {
            });

        } else {
            userBody = 'shirt1';
                    hair = 'hair6';
                    userHairColor = '0x002aff';
                    userSkin = '0xdc9556';
            loadedData = true;
        }
    });

}
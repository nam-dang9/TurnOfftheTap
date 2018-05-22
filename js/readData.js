var userBody;
var hair;
var userHairColor;
var userSkin;

var readData = {
    
    preload: function() {
		
        const firestore = firebase.firestore();
		const settings = {/* your settings... */ timestampsInSnapshots: true};
		firestore.settings(settings);
		
		const db = firebase.firestore();
		
		firebase.auth().onAuthStateChanged(function(user) {	
			
			if (user) {
				
			var uid = firebase.auth().currentUser.uid;
			console.log("uid: " + uid);
			var uName = firebase.auth().currentUser.displayName;
			console.log("name: " + uName);
				
			var readUserData = db.collection("Users").doc(uid);
				
				readUserData.get().then(function(doc){
					if(doc.exists){
						
						userBody = doc.data().body;
						console.log("Body: " + userBody);
						
						hair = doc.data().hair;
						console.log("hair: " + hair);
						
						userHairColor = doc.data().hairColor;
						console.log("hairColor: " + userHairColor);
						userSkin = doc.data().skin;
						console.log("Skin " + userSkin);
					}else{
						console.log("No such doc!");
					}
				}).catch(function(error){
					console.log("Error getting doc", error);
				});
			
			} else {
				console.log("Cannot read the data from the db");
			}
		});
    },
    
    create: function() {
        game.state.start('boot');
    }
};
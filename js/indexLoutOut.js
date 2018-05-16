const config = {
    apiKey: "AIzaSyB9iAfpDb7RZgzYmpz7Gi6lkrV6lLWbr2Q",
    authDomain: "demo2-b13f2.firebaseapp.com",
    databaseURL: "https://demo2-b13f2.firebaseio.com",
    projectId: "demo2-b13f2",
    storageBucket: "demo2-b13f2.appspot.com",
    messagingSenderId: "641975222602"
};

firebase.initializeApp(config);


function log_Out(){
	console.log(firebase.auth().currentUser.displayName);
	
	firebase.auth().signOut()
  .then(function() {
    concole.log("Sign-out successful");
  })
  .catch(function(error) {
    concole.log("Sign-out failed");
  });
	
};
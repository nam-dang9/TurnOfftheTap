
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var db = firebase.firestore();

// Create a variable for list_div to show the data in html
const list_div = document.querySelector("#list_div");

// Set Top 3 in the list with DESC order
db.collection("Users").orderBy("scores").limit(10).onSnapshot(function(snapshot) {
    snapshot.docChanges.forEach(function(change) {

    if(change.type == "added"){
        //Store the name var in limitUser
        var limitUser = change.doc.data().displayName;
        // Store the score var in limitUser
        var limitScore =change.doc.data().scores;

       list_div.innerHTML += "<div class='list-name'><p1>Name: " + limitUser + "</p1></div>"
       list_div.innerHTML += "<div class='list-score'><p2>Score: " + limitScore + "</p2></div><br />"
    }
    });

});

//  Getting currently signed-in user
const login_Detail = document.querySelector("#login_Detail");

var user = firebase.auth().currentUser;
var email;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   //Console for testing. 
   console.log("user", user);
      email = user.displayName;
      login_Detail.innerHTML += "User Email: " + email; 
  } else {
    //Console for testing. 
    console.log("No user is signed in.");
    login_Detail.innerHTML += "No user is signed in.";
  }
});

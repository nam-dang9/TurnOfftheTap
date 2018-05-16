
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

var db = firebase.firestore();

//Function store data by clicking the button
function storeData(){
    
    var inputText = document.getElementById("text").value;
    var score = count;
    
    //Add name and score in database
    db.collection("Users").doc().set({
        name: inputText,
        score: count,
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}

// function to increment value of count variable
var count = 0;
function incrementCount() {
        count++;
        console.log(count);
        var display = document.getElementById("display");
        display.innerHTML = count;
};

// Create a variable for list_div to show the data in html
const list_div = document.querySelector("#list_div");

// Set Top 3 in the list with DESC order
db.collection("Users").orderBy("scores", "desc").limit(3).onSnapshot(function(snapshot) {
    snapshot.docChanges.forEach(function(change) {

    if(change.type == "added"){
        //Store the name var in limitUser
        var limitUser = change.doc.data().name;
        // Store the score var in limitUser
        var limitScore =change.doc.data().score;

       list_div.innerHTML += "<div class='list-name'><p1>Name: " + limitUser + "</p1></div>"
       list_div.innerHTML += "<div class='list-score'><p2>Scores: " + limitScore + "</p2></div>"
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
      email = user.email;
      login_Detail.innerHTML += "User Email: " + email; 
  } else {
    //Console for testing. 
    console.log("No user is signed in.");
    login_Detail.innerHTML += "No user is signed in.";
  }
});

//firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//  // Handle Errors here.
//  var errorCode = error.code;
//  var errorMessage = error.message;
//  // ...
//});

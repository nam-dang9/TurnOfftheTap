  const config = {
    apiKey: "AIzaSyB9iAfpDb7RZgzYmpz7Gi6lkrV6lLWbr2Q",
    authDomain: "demo2-b13f2.firebaseapp.com",
    databaseURL: "https://demo2-b13f2.firebaseio.com",
    projectId: "demo2-b13f2",
    storageBucket: "demo2-b13f2.appspot.com",
    messagingSenderId: "641975222602"
  };
  firebase.initializeApp(config);


//const userName = document.getElementById("userName");
const userName = document.querySelector("#userName");

firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       //Console for testing. 
       console.log("user", user);
       email = user.email;
        userName.innerHTML = "User Email" + email;
       
          
      } else {
        //Console for testing. 
        console.log("No user is signed in.");
        login_Detail.innerHTML += "No user is signed in.";
      }
    });

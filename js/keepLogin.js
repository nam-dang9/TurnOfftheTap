
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

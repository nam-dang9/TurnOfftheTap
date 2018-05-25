const userName = document.querySelector("#userName");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    email = user.email;
    userName.innerHTML = "User Email" + email;

  } else {
    
    login_Detail.innerHTML += "No user is signed in.";
  }
});

var logIn = document.getElementById("login");
var name, email;


//var notlogIn = document.getElementById("notLogIn");
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');

var err_msg = document.getElementById('errMsg');

var hide = document.getElementById("loginHid");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    var checkName = (name != "null")?  name: "friend!";
    logIn.innerHTML += "<h3 class='title titleLogin'>HELLO,   </h3>"
    logIn.innerHTML += "<h3 class='name'>" + checkName + "</h3></br>";
    login.innerHTML += "<p class='loginEmail'>email: " + email + "</p>";
    loginBtns.style.visibility = "visible";
    loginCharDisplay.style.visibility = "visible";
    logIn.style.display = "block";
    document.getElementById("loggedIn").style.display = "block";

  } else {
   document.getElementById("notLoggedIn").style.display = "block";
    hide.style.display = "block";

  }
});

function logOut(){
    firebase.auth().signOut();
	// chnage the URL page.
    window.location.href = 'logIn.html';
};


function logInF(){
    var email = txtEmail.value;
    var password = txtPassword.value;
    var auth = firebase.auth();  
    var promise = auth.signInWithEmailAndPassword(email, password);     

	    promise.then(function(){
            //refresh the page
            window.location.href = 'logIn.html';
		})
        .catch(function(error) {
			// Show error msg in the div html page 
            console.log(error.code);
            err_msg.innerHTML = error.code;
        }); 
    
    
};



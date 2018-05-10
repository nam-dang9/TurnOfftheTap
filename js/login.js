var logIn = document.getElementById("login");
var name, email;


var notlogIn = document.getElementById("notLogIn");
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');

var err_msg = document.getElementById('errMsg');

var hide = document.getElementById("loginHid");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    var checkName = (name != "null")?  name: "Welcome!";
    logIn.innerHTML += checkName + "</br>";
    login.innerHTML += "Email: " + email;
    hide.style.display = "block";
    notLogIn.style.display ="none";
    
  } else {
    hide.style.display = "none";
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
        
        // Show error msg in the div html page 
        promise.catch(function(error) {
            console.log(error.code);
            err_msg.innerHTML = error.code;

        }); 
      

};

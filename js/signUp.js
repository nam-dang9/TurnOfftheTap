// Front-End Reminder: Show the logout Button "realtime" when you login
// Front-End Reminder: Error Message only shows on console now, set the msg on the html (wait for frontEnd)
// DB: Keep login in every pages. 

//Get elements 
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const login = document.getElementById('login');
    const signUp = document.getElementById('signUp');
    const logOut = document.getElementById('logOut');
    const txtName = document.getElementById('txtName');
    const loginUser = document.getElementById('mainDisplay');
    
    // create the div object
    const err_msg = document.querySelector("#err_msg");


	// Create a  variable to hide the div
	var notLogin = document.getElementById("notLoginIn");
	var logOutBtn = document.getElementById("hidebtn");
	var btnSignUp = document.getElementById("btnSignUp");
    
function sign_Up(){
	    const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();  
	
	    const promise = auth.createUserWithEmailAndPassword(email,password);
	       promise.catch(function(error) {
           console.log(error.code);
           err_msg.innerHTML = error.code;
           });  
};

//update the display name
function after_signUp(){
	
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		  const dpName = txtName.value;
		  user.updateProfile({
			  displayName: dpName
			  //      photoURL: "https://example.com/jane-q-user/profile.jpg"
		  }).then(function() {
			  console.log("Update successful.");
		  }).catch(function(error) {
			  console.log("Can not Save the display name.");
		  });
          
		} else {
//			 console.log ('Not logged in');
//			 hide.style.display ="none";
		}
	});	
}

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			btnSignUp.style.display = "none";
			notLogin.style.display ="none";
    		console.log("logged In");
			console.log(user);
			name = user.displayName;
    		email = user.email;
    		var checkName = (name != "null")?  name: "Welcome!";
    		loginUser.innerHTML += checkName + "</br>";
    		loginUser.innerHTML += "Email: " + email + "</br>";
		} else {
			logOutBtn.style.display = "none";
			console.log("Not log in yet.")

		}
	});	


// logout button function
function log_out(){
	firebase.auth().signOut();
	// chnage the URL page.
    window.location.href = 'signUp.html';
}

//    // Add realtime listener
//    firebase.auth().onAuthStateChanged(firebaseUser => {
//        if(firebaseUser){
//            console.log(firebaseUser);
//            hide.style.display = "block";
//            
//                    //code should not go here but testing is it work
//                    var user = firebase.auth().currentUser;
//                    const dpName = txtName.value;
//                    console.log(dpName);
//
//                        user.updateProfile({
//                          displayName: dpName
//                    //      photoURL: "https://example.com/jane-q-user/profile.jpg"
//                        }).then(function() {
//                          console.log("Update successful.");
//                        }).catch(function(error) {
//                          console.log("Can not Save the display name.");
//                        });
//    
//            
//        } else{
//            console.log ('Not logged in');
//            logOut.style.display = "none";
//        }
//    });

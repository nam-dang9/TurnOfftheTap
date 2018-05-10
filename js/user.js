// Front-End Reminder: Show the logout Button realtime when you login
// Front-End Reminder: Error Message only shows on console now, set the msg on the html (wait for frontEnd)
// DB: Keep login in every pages. 

(function() {
    
// Initialize Firebase
  const config = {
    apiKey: "AIzaSyB9iAfpDb7RZgzYmpz7Gi6lkrV6lLWbr2Q",
    authDomain: "demo2-b13f2.firebaseapp.com",
    databaseURL: "https://demo2-b13f2.firebaseio.com",
    projectId: "demo2-b13f2",
    storageBucket: "demo2-b13f2.appspot.com",
    messagingSenderId: "641975222602"
  };
    
  firebase.initializeApp(config);

//Get elements 
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const login = document.getElementById('login');
    const signUp = document.getElementById('signUp');
    const logOut = document.getElementById('logOut');
    const txtName = document.getElementById('txtName');
    
    // create the div object
    const err_msg = document.querySelector("#err_msg");
    


// Add login event
    
    login.addEventListener('click', e=> {

        // Testing: Getting email and password (delete after testing)
        const email = txtEmail.value;
        console.log(email);
        const password = txtPassword.value;
        const auth = firebase.auth();

        // Sign in   
        const promise = auth.signInWithEmailAndPassword(email, password);
        
        // Show error msg in the div html page 
        promise.catch(function(error) {
            console.log(error.code);
            err_msg.innerHTML = error.code;

        });  
    });                   
    

    
    signUp.addEventListener('click', e=> {
    
        // signUp email and password
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();   
    
        const promise = auth.createUserWithEmailAndPassword(email,password);
        
        //Show error msg in the div html page 
        promise.catch(function(error) {
            console.log(error.code);
            err_msg.innerHTML = error.code;
            });      
    });
    
    // logout button function
    logOut.addEventListener('click', e=> {
        firebase.auth().signOut();
    });
    

// Create a  variable to hide the div
var hide = document.getElementById("hidebtn");
    
    // Add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
            hide.style.display = "block";
            
                    //code should not go here but testing is it work
                    var user = firebase.auth().currentUser;
                    const dpName = txtName.value;
                    console.log(dpName);

                        user.updateProfile({
                          displayName: dpName
                    //      photoURL: "https://example.com/jane-q-user/profile.jpg"
                        }).then(function() {
                          console.log("Update successful.");
                        }).catch(function(error) {
                          console.log("Can not Save the display name.");
                        });
    
            
        } else{
            console.log ('Not logged in');
            logOut.style.display = "none";
        }
    });
    
var userName = document.getElementById("user_Name");
    userName.innerHTML
    
    
}());
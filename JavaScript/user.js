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

// Add login event

    login.addEventListener('click', e=> {
        
    // Getting email and password
    const email = txtEmail.value;
    console.log(email);
    const password = txtPassword.value;
    console.log(password);
    const auth = firebase.auth();
    
    // Sign in 
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
        
    });
    
    
    signUp.addEventListener('click', e=> {
    
    // signUp email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();   
    
    const promise = auth.createUserWithEmailAndPassword(email,password);
    promise.catch(e => console.log(e.message));
        
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
            logOut.classList.remove('hidden');
            
        } else{
            console.log ('Not logged in');
            logOut.style.display = "none";
        }
    });
    
    
}());
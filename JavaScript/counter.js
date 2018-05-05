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

const list_div = document.querySelector("#list_div");

db.collection("Users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
       list_div.innerHTML += "<div class='list-name'><p1>Name: " + doc.data().name + "</p1></div>"
        
       list_div.innerHTML += "<div class='list-score'><p2>Scores: " + doc.data().score + "</p2></div>"
        
    });

});

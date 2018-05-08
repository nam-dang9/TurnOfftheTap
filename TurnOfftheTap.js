var countDownDate = new Date("May 25, 2018").getTime();
var countdownfunction = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(countdownfunction);
        document.getElementById("countdown").innerHTML = "IT'S HERE";
    }
}, 1000);

function loadPage() {
$(function(){
    $("div").slice(0, 10).show(); // select the first ten
    $("#load").click(function(e){ // click event for load more
        e.preventDefault();
        $("div:hidden").slice(0, 10).show(); // select next 10 hidden divs and show them
        if($("div:hidden").length == 0){ // check if any hidden divs still exist
            alert("No more divs"); // alert if there are none left
        }
    });
});

 document.getElementById("start").src = "images/PressStart.png";
}
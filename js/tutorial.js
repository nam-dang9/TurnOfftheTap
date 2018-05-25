var counter = 0;
var tut = ['tut1', 'tut2', 'tut3', 'tut4', 'tut5', 'tut6', 'tut7'];

function nextTut() {
    if (counter === 6) {
        counter = 0;
        window.location.href = "index.html";
    } else {
        document.getElementById(tut[counter]).style.display = "none";
        counter++;
        document.getElementById(tut[counter]).style.display = "block";
    }

}

function prevTut() {
    document.getElementById(tut[counter]).style.display = "none";
    counter--;
    document.getElementById(tut[counter]).style.display = "block";
}
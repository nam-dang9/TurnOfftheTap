
var healthDisplay;
var health = 100;
// The rate at which the players health regenerates.
var regenRate = 0.05;

// The starting value of the difficulty, determines spawning interval and number of bubles spawned.
var difficulty = 1;
// The rate at which the difficult is increased, in milliseconds.
var difficultyRate = 5000;

var startTime;
// The base rate at which bubbles will spawn, in milliseconds.
var baseInterval = spawnInterval = 1000;

var bubbleNames = ['sprinkler', 'shower', 'bathtub', 'carwash', 'faucet'];
var bubbles;

var main = {
    create: function() {
        // Setting up background
        var background = game.add.image(0, 0, 'water');
        background.height = game.height;
        background.width = game.width;
        
        // Setting up UI
        var map = game.add.image(540, 960, "map");
        map.anchor.setTo(0.5, 0.5);
        map.scale.setTo(1.1, 1.1);
         
        game.add.image(-15, 1735, "bannerLong"); 
        game.add.image(30, 1775, "logo");
        game.add.image(880, 1740, "settingsBtn");
        game.add.image(680, 1740, "customizeBtn");
        game.add.image(550, 60, "healthDisplayBanner");
        game.add.image(500, 20, "waterDrop");
        game.add.image(0, -190, "charDisplayBanner");
        healthDisplay = game.add.text(800, 147, health + ' / 100', {
                    font: "75px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        healthDisplay.anchor.setTo(0.5, 0.5);
        
        // Setting up bubbles
        bubbles = game.add.group();
        // for (var i = 0; i < 6; i++) {
        //     // Randomly pick an event from the bubbles array
        //     var currentBubble = Math.floor(Math.random() * 5);
        //     var currentEvent = bubbleNames[currentBubble];
            
        //     // Boundary
        //     // x: 120 < --- < 880
        //     // y: 270 < --- < 1200
            
        //     // While the x coordinate exceeds the boundaries, assign it a new value
        //     var currentX = Math.random() * 880 + 15;
        //     while (currentX > 880 || currentX < 120) {
        //         currentX = Math.random() * 880 + 15;
        //     }
                
        //     // While the y coordinate exceeds the boundaries, assign it a new value
        //     var currentY = Math.random() * 1200 + 20
        //     while (currentY > 1200 || currentY < 270) {
        //         currentY = Math.random() * 1200 + 20;
        //     }
            
        //     var bubble =  bubbles.create(currentX, currentY, currentEvent); 
        //     bubble.anchor.setTo(0.5, 0.5);
        //     bubble.inputEnabled = true;
        //     bubble.events.onInputDown.add(tapOnBubble, this);
        // }

        // Initiate bubble spawning
        startTime = Date.now();
        spawnBubbles();
        
    },
    
    update: function() {

        // Recover health
        if(health < 100) {
            health += regenRate;
        }

        // Reduce health based on currently living bubbles
        bubbles.forEachAlive(damageHealth, this);

        // Update difficulty based on elapsed time
        difficulty = Math.round(game.time.elapsedSince(startTime) / 5000);
    },
};

function tapOnBubble(bubble) {
    bubble.kill();
    console.log("tapped on a bubble");
    //createBubble();
}

function createBubble() {
    var currentBubble = Math.floor(Math.random() * 5);
    var currentEvent = bubbleNames[currentBubble];
            
    // Boundary
    // x: 120 < --- < 880
    // y: 270 < --- < 1200
            
    // While the x coordinate exceeds the boundaries, assign it a new value
    var currentX = Math.random() * 880 + 15;
    while (currentX > 880 || currentX < 120) {
        currentX = Math.random() * 880 + 15;
    }
                
    // While the y coordinate exceeds the boundaries, assign it a new value
    var currentY = Math.random() * 1200 + 20
    while (currentY > 1200 || currentY < 270) {
    currentY = Math.random() * 1200 + 20;
    }
            
    var bubble =  bubbles.create(currentX, currentY, currentEvent); 
    bubble.anchor.setTo(0.5, 0.5);
    bubble.inputEnabled = true;
    bubble.events.onInputDown.add(tapOnBubble, this);
    //fix git please

}

function spawnBubbles() {

    var spawnCount = Math.ceil(difficulty / 4);
    if (spawnCount > 4) {
        spawnCount = 4;
    }

    for (var i = 0; i < spawnCount; i++) {
        createBubble();
    }

    // Set interval until next Bubble spawns
    console.log("time is: " + game.time.elapsedSecondsSince(startTime));
    spawnInterval = baseInterval * Math.pow(0.98, difficulty);

    // Initiate timer delay for next bubble spawn
    console.log("spawn interval is: " + spawnInterval);
    game.time.events.add(spawnInterval, spawnBubbles, this);
}

function damageHealth(bubble) {
    health -= 0.02;
    healthDisplay.text = Math.round(health) + ' / 100';
}
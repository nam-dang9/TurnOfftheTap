var healthDisplay;
var health = 100;

var startTime;
var baseInterval = spawnInterval = 2000;

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
        createBubble();
        
    },
    
    update: function() {
        if (typeof bubble !== undefined) {
            healthDisplay.text = Math.round(health) + ' / 100';
            health -= 0.005;
        }
        
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

    // Set interval until next Bubble spawns
    console.log("time is: " + game.time.elapsedSecondsSince(startTime));
    spawnInterval = baseInterval * Math.pow(0.8, Math.round(game.time.elapsedSince(startTime) / 5000));
    console.log("spawn interval is: " + spawnInterval);
    game.time.events.add(spawnInterval, createBubble, this);
}
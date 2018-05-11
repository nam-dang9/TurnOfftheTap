var healthDisplay;
var health = 100;
var healthRegen = 0.05;

var score = 0;
var scoreDisplay;
var startTime;
var baseInterval = 1000;

var difficulty = 1;
var difficultyRate = 5000;

var bubbleNames = ['sprinkler', 'shower', 'bathtub', 'carwash', 'faucet'];
var bubbles;

var character;
var charX = -5;
var charY = +5;



var main = {
    create: function() {

        startTime = Date.now();

        // Setting up background
        var background = game.add.image(0, 0, 'water');
        background.height = game.height;
        background.width = game.width;
        
        // Setting up UI
        var map = game.add.image(540, 960, "map");
        map.anchor.setTo(0.5, 0.5);
        map.scale.setTo(1.1, 1.1);
         
        game.add.image(-15, -25, "bannerLong"); 
        game.add.image(-15, 1735, "bannerLong"); 
        game.add.image(30, 1775, "logo");
        game.add.image(880, 1740, "settingsBtn");
        game.add.image(680, 1740, "customizeBtn");
        game.add.image(550, 60, "healthDisplayBanner");
        game.add.image(500, 20, "waterDrop");
        game.add.image(0, -40, "charDisplayBanner");
        healthDisplay = game.add.text(800, 147, health + ' / 100', {
                    font: "75px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        healthDisplay.anchor.setTo(0.5, 0.5);
        scoreDisplay = game.add.text(500, 147, score, {
                    font: "75px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        scoreDisplay.anchor.setTo(0.5, 0.5);
        character = game.add.group();

        var body = character.create(charX, charY, 'body');
        body.smoothed = false;
        //body.tint = 0xf6f7be;
        character.create(charX, charY, 'shirt').smoothed = false;
        character.create(charX, charY, 'hair').smoothed = false;
        character.create(charX, charY, 'face').smoothed = false;

        character.scale.setTo(8);

        character.smoothed = false;
        
        bubbles = game.add.group();

        spawnBubbles();
        
    },
    
    update: function() {
        if(health < 100) {
            health += healthRegen;
        }
        
        if (typeof bubble !== undefined) {
            healthDisplay.text = Math.round(health) + ' / 100';
            health -= 0.005;
        }
        if (health <= 0) {
            game.state.start('gameover');
        }
        // Reduce health based on currently living bubbles
        bubbles.forEachAlive(damageHealth, this);

        // Update difficulty based on elapsed time
        difficulty = Math.round(game.time.elapsedSince(startTime) / difficultyRate);
    },
    
    
};

function tapOnBubble(bubble) {
    bubble.kill();
    score += 10;
    scoreDisplay.text = score;
    console.log("tapped on a bubble");
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
}

function spawnBubbles() {

    var spawnCount = Math.random() * Math.ceil(difficulty / 4);
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
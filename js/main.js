var healthDisplay;
var health = 100;
var healthRegen = 0.05;

var score = 0;
var scoreDisplay;
var startTime;
var baseInterval = 1000;

var difficulty = 1;
var difficultyRate = 5000;

var bubbleNames = ['sprinkler', 'shower', 'bathtub', 'carwash', 'faucet', 'minigameSprinkler', 
                   'minigameShower', 'minigameFaucet'];
var bubbles;
var bubble;

var character;
var charX = -5;
var charY = +5;

var logo;

var minigame = false;
var pause = false;

var mainPause;
var mainHome;
var overlay;
var unpause;
var replay;
var pausedTime = 0;

var timer;
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
         
        //game.add.image(-15, -25, "bannerLong"); 
        game.add.image(-15, 1735, "bannerLong"); 
        
        logo = game.add.image(30, 1775, "logo");
        logo.inputEnabled = true;
        logo.events.onInputDown.add(tapOnLogo, this);
        logo.taps = 9;
        
        // UI buttons
        mainPause = game.add.image(880, 1740, "pause");
        mainPause.inputEnabled = true;
        mainPause.events.onInputDown.add(pauseBtn, this);
       
        mainHome = game.add.image(680, 1740, "homeBtn");
        mainHome.inputEnabled = true;
        mainHome.events.onInputDown.add(homeBtn, this);
        
        // Health display
        var healthDisplayBanner = game.add.image(960, 110, "healthDisplayBanner");
        healthDisplayBanner.anchor.setTo(0.5, 0.5);
        healthDisplayBanner.scale.setTo(1, 1);
        var waterdrop = game.add.image(840, 110, "waterDrop");
        waterdrop.anchor.setTo(0.5, 0.5);
        waterdrop.scale.setTo(0.7, 0.7);
        game.add.image(0, -40, "charDisplayBanner");
        healthDisplay = game.add.text(970, 110, health + ' / 100', {
                    font: "40px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        healthDisplay.anchor.setTo(0.5, 0.5);
        
        // Score display
        var scoreDisplayBanner = game.add.image(600, 110, "scoreDisplayBanner");
        scoreDisplayBanner.anchor.setTo(0.5, 0.5);
        scoreDisplay = game.add.text(650, 110, score, {
                    font: "45px Arial",
                    fill: "#ffffff",
                    align: "right"
        });
        scoreDisplay.anchor.setTo(0.5, 0.5);
        var trophy = game.add.image(500, 110, "trophy");
        trophy.anchor.setTo(0.5, 0.5);
        
        // Character
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
        if (!pause && !minigame) {
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
            timer = game.time.elapsedSince(startTime) - pausedTime;
            difficulty = Math.round(timer / difficultyRate);
        }
    }
   
};

function tapOnBubble(bubble) {
    if (!pause && !minigame) {
        if (bubble.type == 'minigameSprinkler') {
            minigame = true;
            minigameSprinkler();
        }
        if (bubble.type == 'minigameFaucet') {
            minigame = true;
            minigameFaucet();
        }
        if (bubble.type == 'minigameShower') {
            minigame = true;
            minigameShower();
        }
        bubble.kill();
        score += 10;
        scoreDisplay.text = score;
    }
}

function createBubble() {
    var currentBubble = Math.floor(Math.random() * 8);
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
            
    bubble =  bubbles.create(currentX, currentY, currentEvent); 
    bubble.type = currentEvent;
    bubble.anchor.setTo(0.5, 0.5);
    bubble.inputEnabled = true;
    bubble.events.onInputDown.add(tapOnBubble, this);
}

function spawnBubbles() {
    if (!pause && !minigame) {
    var spawnCount = Math.random() * Math.ceil(difficulty / 4);
    if (spawnCount > 4) {
        spawnCount = 4;
    }

    for (var i = 0; i < spawnCount; i++) {
        createBubble();
    }

    // Set interval until next Bubble spawns
    spawnInterval = baseInterval * Math.pow(0.98, difficulty);

    // Initiate timer delay for next bubble spawn
    game.time.events.add(spawnInterval, spawnBubbles, this);
    }
}

function damageHealth(bubble) {
    health -= 0.02;
    healthDisplay.text = Math.round(health) + ' / 100';
}

function tapOnLogo(logo) {
    logo.taps -= 1;
    
    if(logo.taps < 0) {
        logo.kill();
        logo = game.add.image(5, 1675, "easteregg");
    }
}
function minigameSprinkler() {
    overlay = game.add.image(0, 0, 'overlay');
}

function minigameFaucet() {
    console.log("MINIGAME FUCK YEA");
    minigame = false;
}
function minigameShower() {
    console.log("MINIGAME FUCK YEA");
    minigame = false;
}

function pauseBtn() {
    if (!minigame) {
        pausedTime = Date.now();
        pause = true;
        console.log(difficulty);
        overlay = game.add.image(0, 0, 'overlay');
        mainHome.inputEnabled = false;
        mainPause.inputEnabled = false;
        unpause = game.add.image(540, 800, 'unpause');
        unpause.anchor.setTo(0.5, 0.5);
        unpause.scale.setTo(1.7, 1.7);
        unpause.inputEnabled = true;
        unpause.events.onInputDown.add(unpauseBtn, this);
        replay = game.add.image(540, 1100, 'replay');
        replay.anchor.setTo(0.5, 0.5);
        replay.inputEnabled = true;
        replay.events.onInputDown.add(replayBtn, this);
    }
}

function unpauseBtn() {
    pausedTime = game.time.elapsedSince(pausedTime);
    console.log(difficulty);
    overlay.kill();
    unpause.kill();
    replay.kill();
    pause = false;
    mainHome.inputEnabled = true;
    mainPause.inputEnabled = true;
    spawnBubbles();
}

function replayBtn() {
    window.location.href = "game.html";
}

function homeBtn() {
    if (!minigame) {
        window.location.href = "index.html";
    }
}
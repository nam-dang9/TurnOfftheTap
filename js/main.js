var healthDisplay;
var health = 100;
var healthRegen = 0.05;

var score = 0;
var scoreDisplay;
var startTime;
var baseInterval = 1000;

var difficulty = 1;
var maxDifficulty = 50;
var difficultyRate = 5000;
var debugSpawn1, debugSpawn2, debugSpawn3;
var debugRand;
var debugCount;

var minigameNames = ['minigameSprinkler', 'minigameFaucet', 'minigameShower'];

var bubbleHealth = {
    'sprinkler': 2,
    'shower': 2,
    'bathtub': 2,
    'carwash': 3,
    'faucet': 1
};
var bubbleNames = ['sprinkler', 'shower', 'bathtub', 'carwash', 'faucet'];
var bubbles;
var bubble;

var character;
var charX = -5;
var charY = +5;

var bodyTint = "0xdc9556";
var hairTint = "0x006aff";

var logo;
 

var minigame = false;
var pause = false;
var mainPause;
var mainHome;
var overlay;
var unpause;
var replay;
var pausedTime = 0;
var pauseStart;

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
        var waterdrop = game.add.image(837, 110, "waterDrop");
        waterdrop.anchor.setTo(0.5, 0.5);
        waterdrop.scale.setTo(0.7, 0.7);
        game.add.image(0, -40, "charDisplayBanner");
        healthDisplay = game.add.text(970, 110, health + '/100', {
                    font: "35px Pixelate",
                    fill: "#ffffff",
                    align: "center"
        });
        healthDisplay.anchor.setTo(0.5, 0.5);
        
        // Score display
        var scoreDisplayBanner = game.add.image(600, 110, "scoreDisplayBanner");
        scoreDisplayBanner.anchor.setTo(0.5, 0.5);
        scoreDisplay = game.add.text(650, 110, score, {
                    font: "45px Pixelate",
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
        body.tint = bodyTint;

        var hair = character.create(charX, charY, 'hair');
        hair.smoothed = false;
        hair.tint = hairTint;

        character.create(charX, charY, 'shirt').smoothed = false;
        character.create(charX, charY, 'face').smoothed = false;

        character.scale.setTo(8);
        
        bubbles = game.add.group();
    
        spawnBubbles();
        
    },
    
    update: function() {
        if (!pause && !minigame) {
            if(health < 100) {
                health += healthRegen;
            }

            if (health <= 0) {
                game.state.start('gameover');
            }
            // Reduce health based on currently living bubbles
            bubbles.forEachAlive(damageHealth, this);
            healthDisplay.text = Math.round(health) + ' / 100';

            // Update difficulty based on elapsed time
            timer = game.time.elapsedSince(startTime) - pausedTime;
            difficulty = Math.round(timer / difficultyRate);
        }
    },

    render: function() {

      game.debug.font = "35px Arial";   

      //var minutes = Math.round(timer/60000);

      //game.debug.text("Time: " + minutes + ":" + (Math.round(timer/1000) - (minutes*60)), 530, 200);
      //game.debug.text("Spawn Interval: " + Math.round(spawnInterval)/1000, 530, 250);
      //game.debug.text("Difficulty: " + difficulty, 530, 300);
      //game.debug.text("Spawn Ratios: " + Math.round(debugSpawn1 * 100) + " : " + Math.round(debugSpawn2 * 100) + " : " + Math.round(debugSpawn3 * 100), 530, 350);
      //game.debug.text("Roll: " + Math.round(debugRand * 100), 530, 400);
        

    }
   
};

function tapOnBubble(bubble) {
    if (!pause && !minigame) {
        if (bubble.type == 'minigameSprinkler') {
            game.sound.play('minigameSound');
            bubble.kill();
            minigame = true;
            minigameSprinkler();
            game.sound.play('minigameSound');
        } else if (bubble.type == 'minigameFaucet') {
            minigame = true;
            minigameFaucet();
        } else if (bubble.type == 'minigameShower') {
            game.sound.play('minigameSound');
            minigame = true;
            minigameShower();
        } else {
            game.sound.play('pop');
        }

        bubble.damage(1);
        if(bubble.healthBar != undefined) {
            bubble.healthBar.setPercent((bubble.health / bubble.maxHealth) * 100);
        }
        
        if (!bubble.alive) {

            if(bubble.healthBar != undefined) {
                bubble.healthBar.kill();
            }
            
            bubble.destroy();

            if (bubbleNames.includes(bubble.type)) {
                score += 10;
                scoreDisplay.text = score;
            }
            
        }
    }
}

function createBubble() {
    var currentEvent, currentBubble = Math.floor(Math.random() * 20);
    if (currentBubble == 0) {
        currentBubble = Math.floor(Math.random() * minigameNames.length);
        currentEvent = minigameNames[currentBubble];
    } else {
        currentBubble = Math.floor(Math.random() * bubbleNames.length);
        currentEvent = bubbleNames[currentBubble];
    }
            
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
    while (currentY > 1200 || currentY < 500) {
        currentY = Math.random() * 1200 + 20;
    }
            
    bubble =  bubbles.create(currentX, currentY, currentEvent); 
    bubble.type = currentEvent;
    bubble.anchor.setTo(0.5, 0.5);
    bubble.inputEnabled = true;
    bubble.events.onInputDown.add(tapOnBubble, this);
    if (minigameNames.includes(bubble.type)){
        bubble.health = 1;
    } else {
        bubble.health = bubble.maxHealth = bubbleHealth[bubble.type];
    }

    // bubble.healthBar = game.add.text(bubble.x - 10, bubble.y - bubble.width/2, bubble.health, {
    //     font: "50px Arial",
    //     fill: "#ffffff"
    // });
    var barConfig = {
        width: 100,
        height: 30,
        x: bubble.x, 
        y: bubble.y - 120,
        bg: {
            color: '#1c4167'
        },
        bar: {
            color: '#0d91df'
        },
        animationDuration: 75
    };

    if (bubble.health > 1) {
        bubble.healthBar = new HealthBar(game, barConfig);
        bubble.healthBar.health = bubble.health;
    }
    
}

function spawnBubbles() {
    if (!pause && !minigame) {

        var spawn1 = Math.pow(1.023, 1 - difficulty);
        var spawn3 = Math.pow(1.03, difficulty - maxDifficulty) - 0.33;
        if (spawn3 < 0) {
            spawn3 = 0;
        }
        var spawn2 = 1 - spawn1 - spawn3;

        debugSpawn1 = spawn1, debugSpawn2 = spawn2, debugSpawn3 = spawn3;

        var weights = [spawn1, spawn2, spawn3];

        function bubbleCount(){
            var rand = Math.random();
            debugRand = rand;
            var prev = 0;
            var cur;
            for (i=0; i < weights.length; i++) {
                cur = prev + weights[i];
                if((prev < rand ) && (cur > rand)) {
                    return i + 1;
                }
                prev = cur;
            }
            return 1;
        }

        var toSpawn = bubbleCount();
        


        for (i = 0; i < toSpawn; i++){
            createBubble();
        }
        

        // Set interval until next Bubble spawns
        var adjustment = maxDifficulty * 4 * Math.log2(difficulty/10 + 1);
        spawnInterval = baseInterval - adjustment;


        // Initiate timer delay for next bubble spawn
        game.time.events.add(spawnInterval, spawnBubbles, this);
    }
}

function damageHealth(bubble) {
    health -= 0.01 * bubble.health;
}

// EASTER EGG 
function tapOnLogo(logo) {
    logo.taps -= 1;
    
    if(logo.taps < 0) {
        baseInterval =  750;
        logo.destroy();
        game.sound.play('albertlaugh');
        logo = game.add.image(5, 1675, "easteregg");
    }
}

function pauseBtn() {
    if (!minigame && !pause) {
        game.sound.play('btn');
        pauseStart = Date.now();
        pause = true;
        overlay = game.add.image(0, 0, 'overlay');
        mainHome.inputEnabled = false;
        mainPause.inputEnabled = false;
        unpause = game.add.image(540, 800, 'unpause');
        unpause.anchor.setTo(0.5, 0.5);
        unpause.scale.setTo(1.7, 1.7);
        unpause.inputEnabled = true;
        unpause.events.onInputDown.add(function() {
            game.sound.play('btn');
            pausedTime += game.time.elapsedSince(pauseStart);
            overlay.kill();
            unpause.kill();
            replay.kill();
            pause = false;
            mainHome.inputEnabled = true;
            mainPause.inputEnabled = true;
            spawnBubbles();
        }, this);
        replay = game.add.image(540, 1100, 'replay');
        replay.anchor.setTo(0.5, 0.5);
        replay.inputEnabled = true;
        replay.events.onInputDown.add(replayBtn, this);
    }
}

function replayBtn() {
    game.sound.play('btn');
    window.location.href = "game.html";
}

function homeBtn() {
    if (!minigame && !pause) {
        game.sound.play('btn');
        window.location.href = "index.html";
    }
}
var healthDisplay;
var health = 100;
var healthRegen = 0.05;

var score = 0;
var scoreDisplay;
var startTime;
var baseInterval = 1000;

var difficulty = 1;
var difficultyRate = 5000;
var minigameNames = ['minigameSprinkler', 'minigameFaucet', 'minigameShower'];

var bubbleNames = [minigameNames, 'sprinkler', 'shower', 'bathtub', 'carwash', 'faucet'];
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
        game.sound.play('pop');
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
    var currentBubble = Math.floor(Math.random() * bubbleNames.length);
    if (currentBubble == 0) {
        currentBubble = Math.floor(Math.random() * minigameNames.length);
        var currentEvent = minigameNames[currentBubble];
    } else {
        var currentEvent = bubbleNames[currentBubble];
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
    var spawnCount = Math.random() * Math.ceil(difficulty / 3);
    if (spawnCount > 3) {
        spawnCount = 3;
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
    if (health > 80) {
        health = 100;
    } else {
    health += 20;
    }
    minigame = false;
    //overlay = game.add.image(0, 0, 'overlay');
}

// FAUCET MINIGAME
function minigameFaucet() {
    overlay = game.add.image(0, 0, 'overlay');
    
    // Health bar
    var barConfig = {
        width: 800,
        height: 70,
        x: 540, 
        y: 360,
        bg: {
            color: '#1c4167'
        },
        bar: {
            color: '#0d91df'
        }
        
    };
	var faucetHealthBar = new HealthBar(this.game, barConfig);
    
    // Faucet sprite
    var faucetBoss = game.add.sprite(540, 960, 'faucetBoss');
    faucetBoss.anchor.setTo(0.5, 0.5);
    faucetBoss.scale.setTo(6, 6);
    faucetBoss.inputEnabled = true;
    faucetBoss.health = 10;
    
    // Faucet sprite animation
    var running = faucetBoss.animations.add('running', [0, 1, 2, 3, 4, 5, 6, 7]);
    faucetBoss.animations.play('running', 30, true);
    
    // Timer
    var faucetTimer = game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        if (faucetBoss.health > 0) {
            faucetBoss.kill();
            faucetHealthBar.kill();
            
            var timesup = game.add.image(540, 850, 'timesup');
            timesup.anchor.setTo(0.5, 0.5);
            var updatedscore = game.add.text(540, 1210, '-10', {
                        font: "150px Arial",
                        fill: "#ffffff",
                        align: "center"
            });
            updatedscore.anchor.setTo(0.5, 0.5);
            
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
                timesup.kill();
                updatedscore.kill();
                overlay.kill();
                health -= 10;
                minigame = false;
                spawnBubbles();
            }, this);
        } else {
            faucetBoss.kill();
            faucetHealthBar.kill();
            
            var success = game.add.image(540, 850, 'success');
            success.anchor.setTo(0.5, 0.5);
            var updatedscore = game.add.text(540, 1210, '+20', {
                        font: "150px Arial",
                        fill: "#ffffff",
                        align: "center"
            });
            updatedscore.anchor.setTo(0.5, 0.5);
            
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
                success.kill();
                updatedscore.kill();
                overlay.kill();
                if (health > 80) {
                    health = 100;
                } else {
                    health += 20;
                }
                minigame = false;
                spawnBubbles();
            }, this);
        }
    } , this);
    
    // Handle if faucet gets tapped on
    faucetBoss.events.onInputDown.add(function() {
        if (faucetBoss.health !== 0) {
            faucetBoss.health -= 1;
            console.log(faucetBoss.health);
            faucetHealthBar.setPercent((faucetBoss.health / 10) * 100);
        } else {
            faucetBoss.kill();
            faucetHealthBar.kill();
        }
    }, this);
}
function minigameShower() {
    console.log("MINIGAME FUCK YEA");
    if (health > 80) {
        health = 100;
    } else {
        health += 20;
    }    
    minigame = false;
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
        unpause.events.onInputDown.add(unpauseBtn, this);
        replay = game.add.image(540, 1100, 'replay');
        replay.anchor.setTo(0.5, 0.5);
        replay.inputEnabled = true;
        replay.events.onInputDown.add(replayBtn, this);
    }
}

function unpauseBtn() {
    game.sound.play('btn');
    pausedTime += game.time.elapsedSince(pauseStart);
    overlay.kill();
    unpause.kill();
    replay.kill();
    pause = false;
    mainHome.inputEnabled = true;
    mainPause.inputEnabled = true;
    spawnBubbles();
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
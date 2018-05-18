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
        bubble.healthBar.setPercent((bubble.health / bubble.maxHealth) * 100);
        if(!bubble.alive) {
            bubble.healthBar.kill();
            bubble.destroy();
            score += 10;
            scoreDisplay.text = score;   
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

    bubble.healthBar = new HealthBar(game, barConfig);
    bubble.healthBar.health = bubble.health;
    
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
        logo.kill();
        game.sound.play('albertlaugh');
        logo = game.add.image(5, 1675, "easteregg");
    }
}

// SPRINKLER MINIGAME
// House 1: Bubble = 188, 490, Sprinkler = 377, 796
// House 2: Bubble = 910, 490, Sprinkler = 725, 598
// House 3: Bubble = 188, 990, Sprinkler = 370, 1110
// House 4: Bubble = 910, 990, Sprinkler = 720, 1310
function minigameSprinkler() {
    var sprinklerBackground = game.add.image(0, 0, 'sprinklerBackground');
    var alreadyDone = false;
    
    // Health bar
    var barConfig = {
        width: 1000,
        height: 90,
        x: 540, 
        y: 1700,
        bg: {
            color: '#1c4167'
        },
        bar: {
            color: '#0d91df'
        },
        animationDuration: 200
    };
	var sprinklerHealthBar = new HealthBar(this.game, barConfig);
    sprinklerHealthBar.health = 40;
    
    var startingHealth = Math.floor(Math.random() * 26);
    
    
    // HOUSE 1
    var house1 = {
        health: startingHealth,
        sprinklerStatus: false,
        sprinkler: game.add.sprite(377, 796, 'sprinklerBoss'),
        sprinklerOn: function() {
            if (this.sprinklerStatus) {
                this.sprinkler.animations.add('on', [0, 1, 2, 3, 4]);
                this.sprinkler.animations.play('on', 30, true);
                this.health += 8;
            } else {
                this.sprinkler.animations.add('on', [6]);
                this.sprinkler.animations.play('on', 30, true);
            } 
        },
        status: game.add.sprite(188, 490, 'nothing'),
        waterStatus: function() {
            this.status.anchor.setTo(0.5, 0.5);
            if (this.health > 20) {
                this.status.loadTexture('toomuchwater');
                sprinklerHealthBar.health -= 2.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            } else if (this.health >= 15 && this.health <= 20) {
                this.status.loadTexture('haswater');
            } else if (this.health <= 5 && this.health >= 0) {
                this.status.loadTexture('needswater');
            } else if (this.health < 0) {
                this.status.loadTexture('reallyneedswater');
                sprinklerHealthBar.health -= 2.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            }
        } 
    }
    
    
    house1.sprinkler.anchor.setTo(0.5, 0.5);
    house1.sprinkler.inputEnabled = true;
    var sprinklerSound1 = game.add.audio('sprinklerSound');
    house1.sprinkler.events.onInputDown.add(function(){
        game.sound.play('btn');
        if (house1.sprinklerStatus) {
            house1.sprinklerStatus = false;
            if (sprinklerSound1.play()) {
                sprinklerSound1.pause();
            }
        } else {
            house1.sprinklerStatus = true;
            sprinklerSound1.play();
        }
    }, this);
    
    
    startingHealth = Math.floor(Math.random() * 26);
    
    // HOUSE 2
    var house2 = {
        health: startingHealth,
        sprinklerStatus: false,
        sprinkler: game.add.sprite(725, 598, 'sprinklerBoss'),
        sprinklerOn: function() {
            if (this.sprinklerStatus) {
                this.sprinkler.animations.add('on', [0, 1, 2, 3, 4]);
                this.sprinkler.animations.play('on', 30, true);
                this.health += 8;
            } else {
                this.sprinkler.animations.add('on', [6]);
                this.sprinkler.animations.play('on', 30, true);
            } 
        },
        status: game.add.sprite(910, 490, 'nothing'),
        waterStatus: function() {
            this.status.anchor.setTo(0.5, 0.5);
            if (this.health > 20) {
                this.status.loadTexture('toomuchwater');
                sprinklerHealthBar.health -= 4.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            } else if (this.health >= 15 && this.health <= 20) {
                this.status.loadTexture('haswater');
            } else if (this.health <= 5 && this.health >= 0) {
                this.status.loadTexture('needswater');
            } else if (this.health < 0) {
                this.status.loadTexture('reallyneedswater');
                sprinklerHealthBar.health -= 4.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            }
        } 
    }
    
    house2.sprinkler.anchor.setTo(0.5, 0.5);
    house2.sprinkler.inputEnabled = true;
    var sprinklerSound2 = game.add.audio('sprinklerSound');
    house2.sprinkler.events.onInputDown.add(function(){
        game.sound.play('btn');
        if (house2.sprinklerStatus) {
            house2.sprinklerStatus = false;
            if (sprinklerSound2.play()) {
                sprinklerSound2.pause();
            }
        } else {
            house2.sprinklerStatus = true;
            sprinklerSound2.play();
        }
    }, this);
    
    startingHealth = Math.floor(Math.random() * 26);
    
    // HOUSE 3
    var house3 = {
        health: startingHealth,
        sprinklerStatus: false,
        sprinkler: game.add.sprite(370, 1110, 'sprinklerBoss'),
        sprinklerOn: function() {
            if (this.sprinklerStatus) {
                this.sprinkler.animations.add('on', [0, 1, 2, 3, 4]);
                this.sprinkler.animations.play('on', 30, true);
                this.health += 10;
            } else {
                this.sprinkler.animations.add('on', [6]);
                this.sprinkler.animations.play('on', 30, true);
            } 
        },
        status: game.add.sprite(188, 990, 'nothing'),
        waterStatus: function() {
            this.status.anchor.setTo(0.5, 0.5);
            if (this.health > 20) {
                this.status.loadTexture('toomuchwater');
                sprinklerHealthBar.health -= 5.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            } else if (this.health >= 15 && this.health <= 20) {
                this.status.loadTexture('haswater');
            } else if (this.health <= 5 && this.health >= 0) {
                this.status.loadTexture('needswater');
            } else if (this.health < 0) {
                this.status.loadTexture('reallyneedswater');
                sprinklerHealthBar.health -= 0.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            }
        } 
    }
    
    house3.sprinkler.anchor.setTo(0.5, 0.5);
    house3.sprinkler.inputEnabled = true;
    var sprinklerSound3 = game.add.audio('sprinklerSound');
    house3.sprinkler.events.onInputDown.add(function(){
        game.sound.play('btn');
        if (house3.sprinklerStatus) {
            house3.sprinklerStatus = false;
            if (sprinklerSound3.play()) {
                sprinklerSound3.pause();
            }
        } else {
            house3.sprinklerStatus = true;
            sprinklerSound3.play();
        }
    }, this);
    
    startingHealth = Math.floor(Math.random() * 26);
    
    // HOUSE 4
    var house4 = {
        health: startingHealth,
        sprinklerStatus: false,
        sprinkler: game.add.sprite(720, 1310, 'sprinklerBoss'),
        sprinklerOn: function() {
            if (this.sprinklerStatus) {
                this.sprinkler.animations.add('on', [0, 1, 2, 3, 4]);
                this.sprinkler.animations.play('on', 30, true);
                this.health += 12;
            } else {
                this.sprinkler.animations.add('on', [6]);
                this.sprinkler.animations.play('on', 30, true);
            } 
        },
        status: game.add.sprite(910, 990, 'nothing'),
        waterStatus: function() {
            this.status.anchor.setTo(0.5, 0.5);
            if (this.health > 20) {
                this.status.loadTexture('toomuchwater');
                sprinklerHealthBar.health -= 4.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            } else if (this.health >= 15 && this.health <= 20) {
                this.status.loadTexture('haswater');
            } else if (this.health <= 5 && this.health >= 0) {
                this.status.loadTexture('needswater');
            } else if (this.health < 0) {
                this.status.loadTexture('reallyneedswater');
                sprinklerHealthBar.health -= 0.5;
                sprinklerHealthBar.setPercent((sprinklerHealthBar.health / 30) * 100);
            }
        } 
    }
    
    house4.sprinkler.anchor.setTo(0.5, 0.5);
    house4.sprinkler.inputEnabled = true;
    var sprinklerSound4 = game.add.audio('sprinklerSound');
    house4.sprinkler.events.onInputDown.add(function(){
        game.sound.play('btn');
        if (house4.sprinklerStatus) {
            house4.sprinklerStatus = false;
            if (sprinklerSound4.play()) {
                sprinklerSound4.pause();
            }
        } else {
            house4.sprinklerStatus = true;
            sprinklerSound4.play();
        }
    }, this);
    
    
    
    // The overall loop that reduces the grass health
    game.time.events.loop(Phaser.Timer.SECOND, function() {
        house1.status.anchor.setTo(0.5, 0.5);
        house1.health -= 3;
        house1.sprinklerOn();
        house1.waterStatus();
        
        house2.status.anchor.setTo(0.5, 0.5);
        house2.health -= 4;
        house2.sprinklerOn();
        house2.waterStatus();
        
        house3.status.anchor.setTo(0.5, 0.5);
        house3.health -= 5.5;
        house3.sprinklerOn();
        house3.waterStatus();
        
        house4.status.anchor.setTo(0.5, 0.5);
        house4.health -= 5;
        house4.sprinklerOn();
        house4.waterStatus();
        
        
        if (sprinklerHealthBar.health <= 0) {
            if (!alreadyDone) {
                alreadyDone = true;
                house1.sprinkler.kill();
                house1.status.kill();
                sprinklerSound1.stop();
                sprinklerSound1.destroy();

                house2.sprinkler.kill();
                house2.status.kill();
                sprinklerSound2.stop();
                sprinklerSound2.destroy();

                house3.sprinkler.kill();
                house3.status.kill();
                sprinklerSound3.stop();
                sprinklerSound3.destroy();

                house4.sprinkler.kill();
                house4.status.kill();
                sprinklerSound4.stop();
                sprinklerSound4.destroy();
                
                sprinklerBackground.kill();
                sprinklerHealthBar.kill();


                game.sound.play('timesupSound');

                var overwatered = game.add.image(540, 850, 'overwatered');
                overwatered.anchor.setTo(0.5, 0.5);

                game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                    overwatered.kill();
                    if (health <= 20) {
                        health = 0;
                    } else {
                        health -= 20;
                    }
                    if (score <= 20) {
                        score = 0;
                    } else {
                        score -= 40;
                    }
                    scoreDisplay.text = score;
                    healthDisplay.text = Math.round(health) + ' / 100';
                    minigame = false;
                    spawnBubbles();
                }, this);
                this.stop();   
            }
        }
    }, this);
    
    
    // The overall timer of the minigame 
    game.time.events.add(Phaser.Timer.SECOND * 12.5, function() {
        if (sprinklerHealthBar.health <= 0 & !alreadyDone) {
            alreadyDone = true;
            
            house1.sprinkler.kill();
            house1.status.kill();
            sprinklerSound1.stop();
            sprinklerSound1.destroy();

            house2.sprinkler.kill();
            house2.status.kill();
            sprinklerSound2.stop();
            sprinklerSound2.destroy();

            house3.sprinkler.kill();
            house3.status.kill();
            sprinklerSound3.stop();
            sprinklerSound3.destroy();

            house4.sprinkler.kill();
            house4.status.kill();
            sprinklerSound4.stop();
            sprinklerSound4.destroy();
                
            sprinklerBackground.kill();
            sprinklerHealthBar.kill();
            
            game.sound.play('timesupSound');
            
            var overwatered = game.add.image(540, 850, 'overwatered');
            overwatered.anchor.setTo(0.5, 0.5);
            
            game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                overwatered.kill();
                if (health <= 20) {
                    health = 0;
                } else {
                    health -= 20;
                }
                if (score <= 20) {
                    score = 0;
                } else {
                    score -= 40;
                }
                scoreDisplay.text = score;
                healthDisplay.text = Math.round(health) + ' / 100';
                minigame = false;
                spawnBubbles();
            }, this);
        } else {
            if (!alreadyDone) {
                alreadyDone = true;
                
                house1.sprinkler.kill();
                house1.status.kill();
                sprinklerSound1.stop();
                sprinklerSound1.destroy();

                house2.sprinkler.kill();
                house2.status.kill();
                sprinklerSound2.stop();
                sprinklerSound2.destroy();

                house3.sprinkler.kill();
                house3.status.kill();
                sprinklerSound3.stop();
                sprinklerSound3.destroy();

                house4.sprinkler.kill();
                house4.status.kill();
                sprinklerSound4.stop();
                sprinklerSound4.destroy();
                
                sprinklerBackground.kill();
                sprinklerHealthBar.kill();
                game.sound.play('successSound');

                var success = game.add.image(540, 850, 'success');
                success.anchor.setTo(0.5, 0.5);

                game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                    success.kill();
                    if (health > 80) {
                        health = 100;
                    } else {
                        health += 20;
                    }
                    score += 50;
                    scoreDisplay.text = score;
                    healthDisplay.text = Math.round(health) + ' / 100';
                    minigame = false;
                    spawnBubbles();
                }, this);
            }
        }
    } , this);

}

// FAUCET MINIGAME
function minigameFaucet() {
    overlay = game.add.image(0, 0, 'overlay');
    
    // Health bar
    var barConfig = {
        width: 800,
        height: 70,
        x: 540, 
        y: 600,
        bg: {
            color: '#1c4167'
        },
        bar: {
            color: '#0d91df'
        }
        
    };
	var faucetHealthBar = new HealthBar(this.game, barConfig);
    
    // Faucet sprite
    var faucetBoss = game.add.sprite(540, 1160, 'faucetBoss');
    faucetBoss.anchor.setTo(0.5, 0.5);
    faucetBoss.scale.setTo(6, 6);
    faucetBoss.inputEnabled = true;
    faucetBoss.health = 10;
    
    // Faucet sprite animation
    var running = faucetBoss.animations.add('running', [0, 1, 2, 3, 4, 5, 6, 7]);
    faucetBoss.animations.play('running', 30, true);
    
    // Timer
    game.time.events.add(Phaser.Timer.SECOND * 7, function() {
        if (faucetBoss.health > 0) {
            faucetBoss.kill();
            faucetHealthBar.kill();
             overlay.kill();
            
            game.sound.play('timesupSound');
            
            var timesup = game.add.image(540, 850, 'timesup');
            timesup.anchor.setTo(0.5, 0.5);
            
            game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                timesup.kill();
                if (health <= 20) {
                    health = 0;
                } else {
                    health -= 20;
                }
                if (score <= 20) {
                    score = 0;
                } else {
                    score -= 40;
                }
                scoreDisplay.text = score;
                minigame = false;
                spawnBubbles();
            }, this);
        }
    } , this);
    
    // Handle if faucet gets tapped on
    faucetBoss.events.onInputDown.add(function() {
        game.sound.play('btn');
        if (faucetBoss.health > 0) {
            faucetBoss.health -= 1;
            faucetHealthBar.setPercent((faucetBoss.health / 10) * 100);
        } else {
            faucetBoss.kill();
            faucetHealthBar.kill();
            overlay.kill();
            game.sound.play('successSound');
            
            var success = game.add.image(540, 850, 'success');
            success.anchor.setTo(0.5, 0.5);
            
            game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                success.kill();
                
                if (health > 80) {
                    health = 100;
                } else {
                    health += 20;
                }
                score += 50;
                scoreDisplay.text = score;
                minigame = false;
                spawnBubbles();
            }, this);
        }
    }, this);
    
    // While the faucet health is over 0, keep regenerating it
    game.time.events.loop(10, function() {
        if (faucetBoss.health > 0) {
            if (faucetBoss.health < 10) {
                faucetBoss.health += 0.1;
                faucetHealthBar.setPercent((faucetBoss.health / 10) * 100);
            }
        } else {
            this.stop();
        }
    }, this);
}

// FAUCET MINIGAME
// Bubble position: 540, 690
function minigameShower() {
    var clicked = false;
    var showerSound = game.add.audio('showerSound');
    showerSound.play();
    var showerBackground = game.add.image(0, 0, 'showerBackground');
    showerBackground.inputEnabled = true;
    
    var status = game.add.sprite(540, 690, 'showering');
    status.anchor.setTo(0.5, 0.5);
    
    // Health bar
    var barConfig = {
        width: 1080,
        height: 90,
        x: 540, 
        y: 1700,
        bg: {
            color: '#1c4167'
        },
        bar: {
            color: '#0d91df'
        },
        animationDuration: 10
    };
	var showerHealthBar = new HealthBar(this.game, barConfig);
    showerHealthBar.health = 0;
    showerHealthBar.setPercent(0);
    
    // Marker: (50)300 - 985
    // 51px (width)
    var markerPlace = (Math.random() * 686) + 300;
    var marker = game.add.image(markerPlace, 1700, 'marker');
    marker.anchor.setTo(0.5, 0.5);
    
    var showerHealthSpeed = (Math.random() * 10) + 15;
    // Wait for the health to go to 0 first
    var loop = game.time.events.add(Phaser.Timer.SECOND, function() {
        game.time.events.loop(10, function() {
            if (!clicked) {
               if (showerHealthBar.health >= 1080) {
                    showerHealthSpeed *= -1;
                    showerHealthBar.health += showerHealthSpeed;
                    showerHealthBar.setPercent((showerHealthBar.health / 1080) * 100);
                } else if (showerHealthBar.health < 0) {
                    showerHealthSpeed *= -1;
                    showerHealthBar.health += showerHealthSpeed;
                    showerHealthBar.setPercent((showerHealthBar.health / 1080) * 100);
                } else {
                    showerHealthBar.health += showerHealthSpeed;
                    showerHealthBar.setPercent((showerHealthBar.health / 1080) * 100);
                }
            } else {
                this.stop();   
            }
        }, this);
    }, this);
    
    showerBackground.events.onInputDown.add(function(){
        console.log(showerHealthBar.health);
        console.log(marker.worldPosition.x);
        if (!clicked) {
           checkShowerMinigame(); 
        }
    }, this);
    
    var showerSpeechBubble; 
    function checkShowerMinigame() {
        clicked = true;
        game.sound.play('knock');
        showerSpeechBubble = game.add.image(-50, 1200, 'dontshowertoolong');
    
        game.time.events.add(Phaser.Timer.SECOND * 1.1, function() {
            if (showerHealthBar.health - marker.worldPosition.x >= -35 && 
                showerHealthBar.health - marker.worldPosition.x <= 35) {
                game.sound.play('okaySound');
                status.loadTexture('ok');
                console.log("win");
                game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                    showerBackground.kill();
                    marker.kill();
                    showerHealthBar.kill();
                    showerSpeechBubble.kill();
                    status.kill();
                    
                    showerSound.pause();
                    game.sound.play('successSound');
                    
                    var success = game.add.image(540, 850, 'success');
                    success.anchor.setTo(0.5, 0.5);

                    game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                        success.kill();
                        
                        if (health > 80) {
                            health = 100;
                        } else {
                            health += 20;
                        }
                        score += 50;
                        scoreDisplay.text = score;
                        minigame = false;
                        spawnBubbles();
                    }, this);
                }, this);
            } else {
                status.loadTexture('no');
                game.sound.play('noSound');
                console.log("lose");
                
                game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                    marker.kill();
                    showerBackground.kill();
                    showerHealthBar.kill();
                    showerSpeechBubble.kill();
                    status.kill();
                    
                    showerSound.pause();
                    game.sound.play('timesupSound');
                    
                    var toolong = game.add.image(540, 850, 'showeredtoolong');
                    toolong.anchor.setTo(0.5, 0.5);

                    game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                        toolong.kill();
                        
                        if (health <= 20) {
                            health = 0;
                        } else {
                            health -= 20;
                        }
                        if (score <= 20) {
                            score = 0;
                        } else {
                            score -= 40;
                        }
                        scoreDisplay.text = score;
                        minigame = false;
                        spawnBubbles();
                    }, this);
                }, this);
            }
        }, this);
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
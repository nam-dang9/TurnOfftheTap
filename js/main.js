var winter = false;
var seasonDuration = 25000;
var summerInterval = 1000;
var winterInterval = 1200;
var winterRegen = 0.04;
var summerRegen = 0.02;

var healthDisplay;
var health = 100;
var healthRegen = summerRegen;
var healthBar;

var score = 0;
var scoreDisplay;
var startTime;
var baseInterval = summerInterval;

var difficulty = 1;
var maxDifficulty = 100;
var difficultyRate = 7500;
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
var face;
var charX = -5;
var charY = +5;

var bodyTint = "0xdc9556";
var hairTint = "0x006aff";

var logo;
var map;
var seasonDisplay;

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
    create: function () {

        minigameTimer = game.time.create(false);

        minigameTimer.start();

        startTime = Date.now();

        // Setting up background
        var background = game.add.image(0, 0, "water");
        background.height = game.height;
        background.width = game.width;
        
        // Setting up UI
        map = game.add.image(540, 960, "map");
        map.anchor.setTo(0.5, 0.5);
        map.scale.setTo(1.1, 1.1);

        // Setting up UI
        var ui = game.add.image(0, 0, 'ui');

        logo = game.add.image(30, 1775, "sprites", "TurnOfftheTap Logo1.png");
        logo.inputEnabled = true;
        logo.events.onInputDown.add(tapOnLogo, this);
        logo.taps = 9;

        // UI buttons
        mainPause = game.add.image(880, 1740, "sprites", "btn-pause.png");
        mainPause.inputEnabled = true;
        mainPause.events.onInputDown.add(pauseBtn, this);

        mainHome = game.add.image(680, 1740, "sprites", "Btn-HomeIcon.png");
        mainHome.inputEnabled = true;
        mainHome.events.onInputDown.add(homeBtn, this);

        // Health display
        var healthDisplayBanner = game.add.image(960, 110, "healthDisplayBanner");
        healthDisplayBanner.anchor.setTo(0.5, 0.5);
        healthDisplayBanner.scale.setTo(1, 1);
        var waterdrop = game.add.image(837, 110, "sprites", "Waterdrop.png");
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
        scoreDisplay = game.add.text(650, 110, score, {
            font: "45px Pixelate",
            fill: "#ffffff",
            align: "right"
        });
        scoreDisplay.anchor.setTo(0.5, 0.5);
        var trophy = game.add.image(500, 110, "sprites", "trophy.png");
        trophy.anchor.setTo(0.5, 0.5);
        seasonDisplay = game.add.sprite(200, 470, "summerBanner");
        seasonDisplay.anchor.setTo(0.5, 0.5);
        seasonDisplay.scale.setTo(1.1, 1.1);


        // Health Bar
        var healthBarBanner = game.add.image(540, 1680, "bannerLong");
        healthBarBanner.scale.setTo(0.99, 0.5);
        healthBarBanner.anchor.setTo(0.5);

        var barConfig = {
            width: 1050,
            height: 90,
            x: 540,
            y: 1680,
            bg: {
                color: '#1c4167'
            },
            bar: {
                color: '#0d91df'
            },
            animationDuration: 30
        };
        healthBar = new HealthBar(game, barConfig);
        
        // Character
        character = game.add.group();


        var body = character.create(charX, charY, 'sprites', 'character/body.png');

        console.log(hair);
        console.log(userBody);
        var charHair = character.create(charX, charY, 'sprites', 'character/' + hair + '.png');

        var shirt = character.create(charX, charY, 'sprites', 'character/' + userBody + '.png');
        face = character.create(charX, charY, 'sprites', 'character/face2.png');

        
        body.smoothed = false;
        body.tint = userSkin;
        
        charHair.smoothed = false;
        charHair.tint = userHairColor;

        shirt.smoothed = false;
        face.smoothed = false;

        character.scale.setTo(8);

        bubbles = game.add.group();

        spawnBubbles();

        game.time.events.add(seasonDuration, changeSeason);

        emitter = game.add.emitter(0, 0, 50);
        emitter.makeParticles('sprites', 'waterParticle.png');
        emitter.setScale(1, 2, 1, 2);
        emitter.setAlpha(1, 0.2, 400);
        emitter.setXSpeed(-400, 400);
        emitter.setYSpeed(-150, 500);
        emitter.gravity = 600;
    },

    update: function () {

        if (!pause && !minigame) {
            if (health < 100) {
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

            if(health > 80) {
                face.frameName = 'character/face2.png';
            } else if(health > 60) {
                face.frameName = 'character/face1.png';
            } else if(health > 40) {
                face.frameName = 'character/face3.png';
            } else if(health > 20) {
                face.frameName = 'character/face4.png';
            } else {
                face.frameName = 'character/face5.png';
            }


            healthBar.setPercent((health / 100) * 100);
        }
    },

    render: function () {

        // game.debug.font = "35px Arial";

        // var minutes = Math.floor(timer / 60000);

        
        // game.debug.text("Time: " + minutes + ":" + (Math.floor(timer / 1000) - (minutes * 60)), 530, 500, "yellow");
        // game.debug.text("Spawn Interval: " + Math.round(spawnInterval) / 1000, 530, 250, "cyan");
        // game.debug.text("Difficulty: " + difficulty, 530, 300, "yellow");
        // game.debug.text("Spawn Ratios: " + Math.round(debugSpawn1 * 100) + " : " + Math.round(debugSpawn2 * 100) + " : " + Math.round(debugSpawn3 * 100), 530, 350, "yellow");
        // game.debug.text("Roll: " + Math.round(debugRand * 100), 530, 400, "yellow");
        // game.debug.text("isWinter:" + winter, 530, 450, "yellow");

    }

};

function damageHealth(bubble) {
    health -= 0.005 * bubble.health;
}

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
        if (bubble.healthBar != undefined) {
            bubble.healthBar.setPercent((bubble.health / bubble.maxHealth) * 100);
        }

        if (!bubble.alive) {

            if (bubble.healthBar != undefined) {
                bubble.healthBar.kill();
            }


            emitter.x = bubble.x;
            emitter.y = bubble.y;
            emitter.explode(400, 30);


            bubble.destroy();

            if (bubbleNames.includes(bubble.type)) {
                score += 10;
                scoreDisplay.text = score;
            }

        }
    }
}

function onTap(bubble) {
    if(!pause){
        bubble.scale.setTo(.8);
    }
}

function onRelease(bubble) {
    bubble.scale.setTo(1);
}

function createBubble() {
    var currentEvent, currentBubble = Math.floor(Math.random() * 6);
    if (currentBubble == 0) {
        currentBubble = Math.floor(Math.random() * minigameNames.length);
        currentEvent = minigameNames[0];
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

    bubble = bubbles.create(currentX, currentY, 'sprites', "bubbles/" + currentEvent + '.png');
    bubble.type = currentEvent;
    bubble.anchor.setTo(0.5, 0.5);
    bubble.inputEnabled = true;
    bubble.events.onInputDown.add(tapOnBubble, this);
    bubble.events.onInputDown.add(onTap, this);
    bubble.events.onInputUp.add(onRelease, this);
    if (minigameNames.includes(bubble.type)) {
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

        var spawn1 = Math.pow(1.02, (1 - difficulty) / 3);
        var spawn3 = 1 / 1.8 * Math.pow(1.02, difficulty - maxDifficulty) - 0.2;
        if (spawn3 < 0) {
            spawn3 = 0;
        }
        var spawn2 = 1 - spawn1 - spawn3;

        debugSpawn1 = spawn1, debugSpawn2 = spawn2, debugSpawn3 = spawn3;

        var weights = [spawn1, spawn2, spawn3];

        function bubbleCount() {
            var rand = Math.random();
            debugRand = rand;
            var prev = 0;
            var cur;
            for (i = 0; i < weights.length; i++) {
                cur = prev + weights[i];
                if ((prev < rand) && (cur > rand)) {
                    return i + 1;
                }
                prev = cur;
            }
            return 1;
        }

        var toSpawn = bubbleCount();



        for (i = 0; i < toSpawn; i++) {
            createBubble();
        }


        // Set interval until next Bubble spawns
        var adjustment = maxDifficulty * 3 * Math.log2(difficulty / 10 + 1);
        spawnInterval = baseInterval - adjustment;


        // Initiate timer delay for next bubble spawn
        game.time.events.add(spawnInterval, spawnBubbles, this);
    }
}

function changeSeason() {

    if (winter) {
        winter = false;
        baseInterval = summerInterval;
        healthRegen = summerRegen;
        map.loadTexture('map');
        seasonDisplay.loadTexture('summerBanner');
    } else {
        winter = true;
        baseInterval = winterInterval;
        healthRegen = winterRegen;
        map.loadTexture('snowMap');
        seasonDisplay.loadTexture('winterBanner');
    }

    game.time.events.add(seasonDuration, changeSeason);
}

// EASTER EGG 
function tapOnLogo(logo) {
    logo.taps -= 1;

    if (logo.taps < 0) {
        baseInterval = 750;
        logo.destroy();
        game.sound.play('albertlaugh');
        logo = game.add.image(5, 1675, "easteregg");
    }
}

function pauseTime() {
    pauseStart = Date.now();
    game.time.events.pause();
    pause = true;
}

function unpauseTime() {
    pausedTime += game.time.elapsedSince(pauseStart);
    game.time.events.resume();
    pause = false;
}

function pauseBtn() {
    if (!minigame && !pause) {
        game.sound.play('btn');
        pauseTime();
        overlay = game.add.image(0, 0, 'overlay');
        mainHome.inputEnabled = false;
        mainPause.inputEnabled = false;
        unpause = game.add.image(540, 800, 'sprites', 'btn-unpause.png');
        unpause.anchor.setTo(0.5, 0.5);
        unpause.scale.setTo(1.7, 1.7);
        unpause.inputEnabled = true;
        unpause.events.onInputDown.add(function () {
            game.sound.play('btn');
            unpauseTime();
            overlay.kill();
            unpause.kill();
            replay.kill();
            mainHome.inputEnabled = true;
            mainPause.inputEnabled = true;
            spawnBubbles();
        }, this);
        replay = game.add.image(540, 1100, 'sprites', 'btn-replay.png');
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
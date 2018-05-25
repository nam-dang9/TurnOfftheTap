// SPRINKLER MINIGAME
// House 1: Bubble = 188, 490, Sprinkler = 377, 796
// House 2: Bubble = 910, 490, Sprinkler = 725, 598
// House 3: Bubble = 188, 990, Sprinkler = 370, 1110
// House 4: Bubble = 910, 990, Sprinkler = 720, 1310
function minigameSprinkler() {
    pauseTime();
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
                    this.sprinkler.animations.add('on', [5, 6]);
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

    function destroyAll() {
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
    }
    

    // The overall loop that reduces the grass health
    minigameTimer.loop(Phaser.Timer.SECOND, function() {
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
                destroyAll();
 
                game.sound.play('timesupSound');
 
                var overwatered = game.add.image(540, 850, 'overwatered');
                overwatered.anchor.setTo(0.5, 0.5);
 
                minigameTimer.add(Phaser.Timer.SECOND * 1, function() {
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
                    unpauseTime();
                    //spawnBubbles();
                }, this);
                this.stop();   
            }
        }
    }, this);

    var count=13;

    var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

    function timer() {
        count=count-1;
        if (count <= 0) {
            clearInterval(counter);
            return;
        }
        document.getElementById("timer").innerHTML=count + " secs"; // watch for spelling
    }

    // The overall timer of the minigame 
    minigameTimer.add(Phaser.Timer.SECOND * 12.5, function() {
        if (sprinklerHealthBar.health <= 0 & !alreadyDone) {
            timer();
            alreadyDone = true;
            destroyAll();
            
            game.sound.play('timesupSound');
            
            var overwatered = game.add.image(540, 850, 'overwatered');
            overwatered.anchor.setTo(0.5, 0.5);
            
            minigameTimer.add(Phaser.Timer.SECOND * 1, function() {
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
                unpauseTime();
                //spawnBubbles();
            }, this);
        } else {
            if (!alreadyDone) {
                alreadyDone = true;
                destroyAll();
                
                game.sound.play('successSound');
 
                var success = game.add.image(540, 850, 'success');
                success.anchor.setTo(0.5, 0.5);
 
                minigameTimer.add(Phaser.Timer.SECOND * 1, function() {
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
                    unpauseTime();
                    //spawnBubbles();
                }, this);
            }
        }
    } , this);
}


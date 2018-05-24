// SHOWER MINIGAME
// Bubble position: 540, 690
function minigameShower() {
    pauseTime();
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
    var loop = minigameTimer.add(Phaser.Timer.SECOND, function() {
        minigameTimer.loop(10, function() {
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
    
        minigameTimer.add(Phaser.Timer.SECOND * 1.1, function() {
            if (showerHealthBar.health - marker.worldPosition.x >= -35 && 
                showerHealthBar.health - marker.worldPosition.x <= 35) {
                game.sound.play('okaySound');
                status.loadTexture('ok');
                console.log("win");
                minigameTimer.add(Phaser.Timer.SECOND * 2, function() {
                    showerBackground.destroy();
                    marker.destroy();
                    showerHealthBar.kill();
                    showerSpeechBubble.destroy();
                    status.destroy();
                    
                    showerSound.pause();
                    game.sound.play('successSound');
                    
                    var success = game.add.image(540, 850, 'success');
                    success.anchor.setTo(0.5, 0.5);

                    minigameTimer.add(Phaser.Timer.SECOND * 1, function() {
                        success.destroy();
                        
                        if (health > 80) {
                            health = 100;
                        } else {
                            health += 20;
                        }
                        score += 50;
                        scoreDisplay.text = score;
                        minigame = false;
                        unpauseTime();
                        //spawnBubbles();
                    }, this);
                }, this);
            } else {
                status.loadTexture('no');
                game.sound.play('noSound');
                console.log("lose");
                
                minigameTimer.add(Phaser.Timer.SECOND * 2, function() {
                    marker.kill();
                    showerBackground.destroy();
                    showerHealthBar.kill();
                    showerSpeechBubble.destroy();
                    status.destroy();
                    
                    showerSound.pause();
                    game.sound.play('timesupSound');
                    
                    var toolong = game.add.image(540, 850, 'showeredtoolong');
                    toolong.anchor.setTo(0.5, 0.5);

                    minigameTimer.add(Phaser.Timer.SECOND * 1, function() {
                        toolong.destroy();
                        
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
                        unpauseTime();
                        //spawnBubbles();
                    }, this);
                }, this);
            }
        }, this);
    }

}
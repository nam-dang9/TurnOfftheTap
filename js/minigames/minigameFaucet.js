function minigameFaucet() {
    pauseTime();
    overlay = game.add.image(0, 0, 'faucetBackground');
    
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
    minigameTimer.add(Phaser.Timer.SECOND * 7, function() {
        if (faucetBoss.health > 0) {
            faucetBoss.kill();
            faucetHealthBar.kill();
             overlay.destroy();
            
            game.sound.play('timesupSound');
            
            var timesup = game.add.image(540, 850, 'timesup');
            timesup.anchor.setTo(0.5, 0.5);
            
            minigameTimer.add(Phaser.Timer.SECOND * 1, function() {
                timesup.destroy();
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
            overlay.destroy();
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
                minigame = false;
                unpauseTime();
                //spawnBubbles();
            }, this);
        }
    }, this);
    
    // While the faucet health is over 0, keep regenerating it
    minigameTimer.loop(10, function() {
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
var gameover = {
    create: function() {
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        
        var gameover = game.add.image(540,560, "gameover");
        gameover.anchor.setTo(0.5, 0.5);
        
        var scoreDisplay = game.add.image(540,860, "score");
        scoreDisplay.anchor.setTo(0.5, 0.5);
        
        var replay = game.add.image(540,1190, "replay");
        replay.anchor.setTo(0.5, 0.5);
        replay.inputEnabled = true;
        replay.events.onInputDown.add(replayBtn, this);
        
        var home = game.add.image(540,1500, "homeBtn");
        home.anchor.setTo(0.5, 0.5);
        home.scale.setTo(1.599, 1.599);
        home.inputEnabled = true;
        home.events.onInputDown.add(homeBtn, this);
        
        
        var scoreNumber = game.add.text(540, 970, score, {
                    font: "75px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        scoreNumber.anchor.setTo(0.5, 0.5);
        
    }
};
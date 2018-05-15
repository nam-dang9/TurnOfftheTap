
var gameover = {
    create: function() {
		
		const db = firebase.firestore();
		const settings = {/* your settings... */ timestampsInSnapshots: true};
		db.settings(settings);
		var highScore;
		
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        var gameover = game.add.image(540,560, "gameover");
        gameover.anchor.setTo(0.5, 0.5);
        highScore = score;
        var scoreDisplay = game.add.image(540,860, "score");
        scoreDisplay.anchor.setTo(0.5, 0.5);
        
        replay = game.add.image(540,1190, "replay");
        replay.anchor.setTo(0.5, 0.5);
        replay.inputEnabled = true;
        // the replayBtn function is in main.js
        replay.events.onInputDown.add(replayBtn, this);
        
        var home = game.add.image(540,1500, "homeBtn");
        home.anchor.setTo(0.5, 0.5);
        home.scale.setTo(1.599, 1.599);
        home.inputEnabled = true;
        // the homeBtn function is in main.js
        home.events.onInputDown.add(homeBtn, this);
        
        
        var scoreNumber = game.add.text(540, 970, highScore, {
                    font: "75px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        scoreNumber.anchor.setTo(0.5, 0.5);
        
        game.sound.play('gameoverSound');
		
		
		console.log("highScore: " + highScore);
	
		var uid = firebase.auth().currentUser.uid;
		console.log("Uid: " +uid);
		
		var updateScore = db.collection("Users").doc(uid);
		
		updateScore.update({
		
			"scores": highScore
		})
		.then(function() {
			console.log("Document successfully updated!");
		});

	}
}






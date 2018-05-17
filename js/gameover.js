
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
        // importing the twitter API
        window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };
            return t;
            }(document, "script", "twitter-wjs"));
        
        document.getElementById('hideTwitter').innerHTML = 
            '<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20score:' + highScore + ' %20on%20Turn%20Off%20the%20Tap%0A"data-size="large" data-url="https://TurnOfftheTap.today" id="twitter-wjs">Tweet</a>';
        
           var scoreNumber = game.add.text(540, 970, highScore, {
                    font: "75px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        scoreNumber.anchor.setTo(0.5, 0.5);
        
        game.sound.play('gameoverSound');
		console.log("highScore: " + highScore);
        
		firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
		var uid = firebase.auth().currentUser.uid;
		//testing please delete it after the game done (console)
		console.log("Uid: " +uid);
		console.log(firebase.auth().currentUser.displayName);
		
		var updateScore = db.collection("Users").doc(uid);
		
		updateScore.update({
		
			"scores": highScore
		})
		.then(function() {
			console.log("Document successfully updated!");
		});
		}else{
			console.log("User have not login");
		}

	   });
    }
}






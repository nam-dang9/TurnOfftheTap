var tutorial = {
    create: function() {
        // Setting up background
        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;
        
        var banner = game.add.image(540, 960, 'tutorialBanner');
        banner.anchor.setTo(0.5, 0.5);
        
        var btn = game.add.image(540, 1750, 'letsgoBtn');
        btn.anchor.setTo(0.5, 0.5);
        btn.inputEnabled = true;
        btn.events.onInputDown.add(startGame, this);
    }
}

function startGame() {
    game.state.start('main');
}
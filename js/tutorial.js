var tutorial = {
    create: function() {
        // Setting up background
        var background = game.add.image(0, 0, 'water');
        background.height = game.height;
        background.width = game.width;
        var map = game.add.image(540, 960, 'map');
        map.anchor.setTo(0.5, 0.5);
        map.scale.setTo(1.1, 1.1);
        
        var banner = game.add.image(540, 960, 'bannerLight');
        banner.anchor.setTo(0.5, 0.5);
        var intro = game.add.text(800, 147, health + ' / 100', {
                    font: "75px Arial",
                    fill: "#ffffff",
                    align: "center"
        });
        intro.anchor.setTo(0.5, 0.5);
        
        var btn = game.add.image(540, 1400, 'letsgoBtn');
        btn.anchor.setTo(0.5, 0.5);
        btn.inputEnabled = true;
        btn.events.onInputDown.add(startGame, this);
    }
}

function startGame() {
    game.state.start('main');
}
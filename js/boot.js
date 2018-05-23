var boot = {
    init: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
    },

    preload: function () {
        game.load.image('loadingLogo', 'Images/TurnOfftheTap Logo2.png');
        game.load.image('background', 'Images/VancouverBackground.png');
    },

    create: function () {

        readData();

        // Loading screen
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        var logo = game.add.image(540, 960, "loadingLogo");
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(2, 2);
        
        
    }, 

    update: function() {

        if(loadedData) {
            game.state.start('load');
        }
    }
};
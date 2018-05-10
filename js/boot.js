var boot = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true; 
    },
    
    preload: function() {
        game.load.image('loadingLogo', 'Images/TurnOfftheTap Logo2.png');
        game.load.image('background', 'Images/VancouverBackground.png');
    },
    
    create: function() {
        game.state.start('load');
    }
};
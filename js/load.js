var load = {
    preload: function() {

        // Loading screen
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        var logo = game.add.image(540, 960, "loadingLogo");
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(2, 2);

        
        game.load.atlasJSONHash('sprites', 'Images/sprites.png', 'Images/sprites.json');
        
        // General
        game.load.image('map', 'Images/Map.png');
        game.load.image('snowMap', 'Images/Map-Snow.png');
        game.load.image('water', 'Images/Water.png');
        game.load.image('easteregg', 'Images/easteregg.png');
        game.load.image('gameover', 'Images/gameover.png');
        game.load.image('score', 'Images/score.png');
        game.load.image('overlay', 'Images/overlay.png');
        game.load.image('ui', 'Images/ui.png');
        
        // Banners
        game.load.image('banner', 'Images/banners/Banner.png');
        game.load.image('bannerDark', 'Images/banners/Banner-Dark.png');
        game.load.image('bannerLong', 'Images/banners/Banner-Long.png');
        game.load.image('bannerLight', 'Images/banners/banner-Light.png');
        game.load.image('bannerHidden', 'Images/banners/HiddenBanner.png');
        game.load.image('tutorialBanner', 'Images/banners/tutorialbanner.png');

        
        // endBanners    
        game.load.image('timesup', 'Images/endBanners/timesup.png');
        game.load.image('success', 'Images/endBanners/success.png');
        game.load.image('showeredtoolong', 'Images/endBanners/showeredtoolong.png');
        game.load.image('overwatered', 'Images/endBanners/overwatered.png');
        
        // Faucet Minigame Assets
        game.load.image('faucetBackground', 'Images/faucetMinigame/faucetminigameBackground.png');
        
        // Sprinkler Minigame Assets
        game.load.image('sprinklerBackground', 'Images/sprinklerMinigame/sprinklerminigameBackground.png');
        
        // Shower Minigame Assets
        game.load.image('showerBackground', 'Images/showerMinigame/showerminigameBackground.png');
        game.load.image('dontshowertoolong', 'Images/showerMinigame/dontshowertoolong.png');
        game.load.image('showertime', 'Images/showerMinigame/showertime.png');
        
        // Sounds
        game.load.audio('pop', 'sounds/pop.wav');
        game.load.audio('btn', 'sounds/btn.wav')
        game.load.audio('minigameSound', 'sounds/minigame.wav');
        game.load.audio('gameoverSound', 'sounds/gameover.wav');
        game.load.audio('successSound', 'sounds/success.wav');
        game.load.audio('timesupSound', 'sounds/timesup.wav');
        game.load.audio('albertlaugh', 'sounds/albertlaugh.wav');
        game.load.audio('sprinklerSound', 'sounds/sprinkler.wav');
        game.load.audio('showerSound', 'sounds/shower.wav');
        game.load.audio('knock', 'sounds/knock.wav');
        game.load.audio('okaySound', 'sounds/okay.wav');
        game.load.audio('noSound', 'sounds/no.wav');
        game.load.audio('bgmusic', 'sounds/bgmusic.wav');
        
    },
    
    create: function() {



        game.state.start('main');
    }
};
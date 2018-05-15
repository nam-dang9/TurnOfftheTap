var load = {
    preload: function() {
        // Loading screen
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        var logo = game.add.image(540, 960, "loadingLogo");
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(2, 2);
        
        game.load.image('arrowLeft', 'Images/Arrow-left.png');
        game.load.image('arrowRight', 'Images/Arrow-Right.png');
        game.load.image('banner', 'Images/Banner.png');
        game.load.image('bannerDark', 'Images/Banner-Dark.png');
        game.load.image('bannerLong', 'Images/Banner-Long.png');
        game.load.image('bannerLight', 'Images/banner-Light.png');
        game.load.image('backBtn', 'Images/Btn-Back.png');
        game.load.image('customizeBtn', 'Images/Btn-CustomizeIcon.png');
        game.load.image('homeBtn', 'Images/Btn-HomeIcon.png');
        game.load.image('looksGoodBtn', 'Images/Btn-LooksGood.png');
        game.load.image('settingsBtn', 'Images/Btn-SettingsIcon.png');
        game.load.image('healthBar', 'Images/HealthBar.png');
        game.load.image('healthBarData', 'Images/HealthBar-Health.png');
        game.load.image('healthDisplayBanner', 'Images/HealthDisplayBanner.png');
        game.load.image('charDisplayBanner', 'Images/charDisplayBanner.png');
        game.load.image('map', 'Images/Map.png');
        game.load.image('bannerHidden', 'Images/HiddenBanner.png');
        game.load.image('bannerInput', 'Images/InputBanner.png');
        game.load.image('letsgoBtn', 'Images/btn-letsgo.png');
        game.load.image('logo', 'Images/TurnOfftheTap Logo1.png');
        game.load.image('water', 'Images/Water.png');
        game.load.image('waterDrop', 'Images/Waterdrop.png');
        game.load.image('tutorialBanner', 'Images/tutorialbanner.png');
        game.load.image('easteregg', 'Images/easteregg.png');
        game.load.image('gameover', 'Images/gameover.png');
        game.load.image('replay', 'Images/btn-replay.png');
        game.load.image('score', 'Images/score.png');
        game.load.image('trophy', 'Images/trophy.png');
        game.load.image('scoreDisplayBanner', 'Images/scoredisplaybanner.png');
        game.load.image('overlay', 'Images/overlay.png');
        game.load.image('pause', 'Images/btn-pause.png');
        game.load.image('unpause', 'Images/btn-unpause.png');
        
        // Event bubbles
        game.load.image('shower', 'Images/shower.png');
        game.load.image('faucet', 'Images/faucet.png');
        game.load.image('carwash', 'Images/carwash.png');
        game.load.image('sprinkler', 'Images/sprinkler.png');
        game.load.image('bathtub', 'Images/bathtub.png');
        game.load.image('minigameSprinkler', 'Images/minigameSprinkler.png');
        game.load.image('minigameShower', 'Images/minigameShower.png');
        game.load.image('minigameFaucet', 'Images/minigameFaucet.png');
        // Character
        game.load.image('body', 'Images/character/body.png');
        game.load.image('face', 'Images/character/face.png');
        game.load.image('hair', 'Images/character/hair02.png');
        game.load.image('shirt', 'Images/character/shirt02.png');
        
        // Sounds
        game.load.audio('pop', 'sounds/pop.wav');
        game.load.audio('btn', 'sounds/btn.wav')
        game.load.audio('minigameSound', 'sounds/minigame.wav');
        game.load.audio('gameoverSound', 'sounds/gameover.wav');
        
        // Minigame sprites
        game.load.spritesheet('minigameFaucetAnimation', 'Images/faucetspritesheet.png', 21, 28, )
    },
    
    create: function() {
        game.state.start('main');
    }
};
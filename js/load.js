var load = {
    preload: function() {
        // Loading screen
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        var logo = game.add.image(540, 960, "loadingLogo");
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(2, 2);
        
        game.load.image('banner', 'Images/Banner.png');
        game.load.image('bannerDark', 'Images/Banner-Dark.png');
        game.load.image('bannerLong', 'Images/Banner-Long.png');
        game.load.image('bannerLight', 'Images/banner-Light.png');
        game.load.image('backBtn', 'Images/Btn-Back.png');
        game.load.image('customizeBtn', 'Images/Btn-CustomizeIcon.png');
        game.load.image('homeBtn', 'Images/Btn-HomeIcon.png');
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
        game.load.image('timesup', 'Images/timesup.png');
        game.load.image('success', 'Images/success.png');
        
        
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
        game.load.image('hair', 'Images/character/hair2.png');
        game.load.image('shirt', 'Images/character/shirt2.png');
        
        // Sounds
        game.load.audio('pop', 'sounds/pop.wav');
        game.load.audio('btn', 'sounds/btn.wav')
        game.load.audio('minigameSound', 'sounds/minigame.wav');
        game.load.audio('gameoverSound', 'sounds/gameover.wav');
        game.load.audio('successSound', 'sounds/success.wav');
        game.load.audio('timesupSound', 'sounds/timesup.wav');
        game.load.audio('albertlaugh', 'sounds/albertlaugh.wav');
        game.load.audio('sprinklerSound', 'sounds/sprinkler.wav');
        
        // Faucet Minigame Assets
        game.load.spritesheet('faucetBoss', 'Images/sprites/faucetBoss-spritesheet.png', 105, 140, 16);
        
        // Sprinkler Minigame Assets
        game.load.image('sprinklerBackground', 'Images/sprinklerminigameBackground.png');
        game.load.image('needswater', 'Images/needswater.png');
        game.load.image('reallyneedswater', 'Images/reallyneedswater.png');
        game.load.image('haswater', 'Images/haswater.png');
        game.load.image('toomuchwater', 'Images/toomuchwater.png');
        game.load.image('overwatered', 'Images/overwatered.png');
        game.load.spritesheet('sprinklerBoss', 'Images/sprites/sprinklerBoss-spritesheet.png', 288, 265, 7);
        game.load.image('nothing', 'Images/nothing.png');
    },
    
    create: function() {
        game.state.start('main');
    }
};
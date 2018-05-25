var load = {
    preload: function() {
        // Loading screen
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        var logo = game.add.image(540, 960, "loadingLogo");
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(2, 2);
        
        // General
        game.load.image('map', 'Images/Map.png');
        game.load.image('snowMap', 'Images/Map-Snow.png');
        game.load.image('logo', 'Images/TurnOfftheTap Logo1.png');
        game.load.image('easteregg', 'Images/easteregg.png');
        game.load.image('gameover', 'Images/gameover.png');
        game.load.image('score', 'Images/score.png');
        game.load.image('overlay', 'Images/overlay.png');
        game.load.image('particle', 'Images/waterParticle.png');
        game.load.image('summerBanner', 'Images/summer.png');
        game.load.image('winterBanner', 'Images/winter.png');
        game.load.image('ui', 'Images/ui.png');
        game.load.image('water', 'Images/water.png');
        
        // Banners
        game.load.image('banner', 'Images/banners/Banner.png');
        game.load.image('bannerDark', 'Images/banners/Banner-Dark.png');
        game.load.image('bannerLong', 'Images/banners/Banner-Long.png');
        game.load.image('bannerLight', 'Images/banners/banner-Light.png');
        game.load.image('bannerHidden', 'Images/banners/HiddenBanner.png');
        game.load.image('tutorialBanner', 'Images/banners/tutorialbanner.png');
        
        // Btns
        game.load.image('backBtn', 'Images/btns/Btn-Back.png');
        game.load.image('customizeBtn', 'Images/btns/Btn-CustomizeIcon.png');
        game.load.image('homeBtn', 'Images/btns/Btn-HomeIcon.png');
        game.load.image('settingsBtn', 'Images/btns/Btn-SettingsIcon.png');
        game.load.image('letsgoBtn', 'Images/btns/btn-letsgo.png');
        game.load.image('replay', 'Images/btns/btn-replay.png');
        game.load.image('pause', 'Images/btns/btn-pause.png');
        game.load.image('unpause', 'Images/btns/btn-unpause.png');
        game.load.image('twitterIcon', 'Images/btns/btn-twitter.png');
        
        // Bubbles
        game.load.image('shower', 'Images/bubbles/shower.png');
        game.load.image('faucet', 'Images/bubbles/faucet.png');
        game.load.image('carwash', 'Images/bubbles/carwash.png');
        game.load.image('sprinkler', 'Images/bubbles/sprinkler.png');
        game.load.image('bathtub', 'Images/bubbles/bathtub.png');
        game.load.image('minigameSprinkler', 'Images/bubbles/minigameSprinkler.png');
        game.load.image('minigameShower', 'Images/bubbles/minigameShower.png');
        game.load.image('minigameFaucet', 'Images/bubbles/minigameFaucet.png');
        
        // endBanners    
        game.load.image('timesup', 'Images/endBanners/timesup.png');
        game.load.image('success', 'Images/endBanners/success.png');
        game.load.image('showeredtoolong', 'Images/endBanners/showeredtoolong.png');
        game.load.image('overwatered', 'Images/endBanners/overwatered.png');
        
        // Character
        game.load.image('body', 'Images/character/body.png');
        game.load.image('face', 'Images/character/face.png');
        game.load.image('hair', 'Images/character/' + hair + '.png');
        game.load.image('shirt', 'Images/character/' + userBody + '.png');
        
        // Faucet Minigame Assets
        game.load.spritesheet('faucetBoss', 'Images/sprites/faucetBoss-spritesheet.png', 105, 140, 16);
        game.load.image('faucetBackground', 'Images/faucetMinigame/faucetminigameBackground.png');
        
        // Sprinkler Minigame Assets
        game.load.image('sprinklerBackground', 'Images/sprinklerMinigame/sprinklerminigameBackground.png');
        game.load.image('needswater', 'Images/sprinklerMinigame/needswater.png');
        game.load.image('reallyneedswater', 'Images/sprinklerMinigame/reallyneedswater.png');
        game.load.image('haswater', 'Images/sprinklerMinigame/haswater.png');
        game.load.image('toomuchwater', 'Images/sprinklerMinigame/toomuchwater.png');
        game.load.spritesheet('sprinklerBoss', 'Images/sprites/sprinklerBoss-spritesheet.png', 288, 265, 7);
        game.load.image('nothing', 'Images/nothing.png');
        
        // Shower Minigame Assets
        game.load.image('showerBackground', 'Images/showerMinigame/showerminigameBackground.png');
        game.load.image('showering', 'Images/showerMinigame/showering.png');
        game.load.image('ok', 'Images/showerMinigame/ok.png');
        game.load.image('no', 'Images/showerMinigame/no.png');
        game.load.image('marker', 'Images/showerMinigame/marker.png');
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
        
    },
    
    create: function() {
        game.state.start('main');
    }
};
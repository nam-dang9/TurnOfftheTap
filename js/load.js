var load = {
    preload: function() {

        game.load.image('loadingLogo', 'Images/TurnOfftheTap Logo2.png');
        game.load.image('background', 'Images/VancouverBackground.png');
        
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
        
        // Event bubbles
        game.load.image('shower', 'Images/shower.png');
        game.load.image('faucet', 'Images/faucet.png');
        game.load.image('carwash', 'Images/carwash.png');
        game.load.image('sprinkler', 'Images/sprinkler.png');
        game.load.image('bathtub', 'Images/bathtub.png');

        // Character
        game.load.image('body', 'Images/character/body.png');
        game.load.image('face', 'Images/character/face.png');
        game.load.image('hair', 'Images/character/hair02.png');
        game.load.image('shirt', 'Images/character/shirt02.png');
    },
    
    create: function() {
        game.state.start('main');
    }
};
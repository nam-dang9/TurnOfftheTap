var creatorMain = {
    preload: function() {

        hairArr = ['hair1', 'hair2', 'hair3', 'hair4', 'hair5', 'hair6'];
        shirtArr = ['shirt1', 'shirt2', 'shirt3', 'shirt4', 'shirt5'];
        hairTint = userHairColor;
        skinTint = userSkin;

        hairIndex = hairArr.findIndex(function(cur){
            return cur == hair;
        });
        shirtIndex = shirtArr.findIndex(function(cur){
            return cur == userBody;
        });

        game.load.image('loadingLogo', 'Images/TurnOfftheTap Logo2.png');
        game.load.image('background', 'Images/VancouverBackground.png');
        game.load.image('arrowLeft', 'Images/btns/Arrow-Left.png');
        game.load.image('arrowRight', 'Images/btns/Arrow-Right.png');
        game.load.image('banner', 'Images/banners/banner-Light.png');
        game.load.image('displayBanner', 'Images/banners/banner-charDisplay.png');
        game.load.image('looksgood', 'Images/btns/Btn-LooksGood.png');
        game.load.image('back', 'Images/btns/Btn-Back.png');
        
        game.load.image('body', 'Images/character/body.png');
        game.load.image('face', 'Images/character/face.png');
        game.load.image('hair1', 'Images/character/hair1.png');
        game.load.image('hair2', 'Images/character/hair2.png');
        game.load.image('hair3', 'Images/character/hair3.png');
        game.load.image('hair4', 'Images/character/hair4.png');
        game.load.image('hair5', 'Images/character/hair5.png');
        game.load.image('hair6', 'Images/character/hair6.png');
        game.load.image('shirt1', 'Images/character/shirt1.png');
        game.load.image('shirt2', 'Images/character/shirt2.png');
        game.load.image('shirt3', 'Images/character/shirt3.png');
        game.load.image('shirt4', 'Images/character/shirt4.png');
        game.load.image('shirt5', 'Images/character/shirt5.png');
    
    },

    create: function() {

        //UI
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);
        
        var banner = game.add.image(540, 960, "banner");
        banner.anchor.setTo(0.5, 0.5);
        
        var displayBanner = game.add.image(540, 670, "displayBanner");
        displayBanner.anchor.setTo(0.5, 0.5);
        
        var looksgood = game.add.image(650, 1070, "looksgood");
        looksgood.inputEnabled = true;
        looksgood.events.onInputDown.add(looksgoodBtn, this);
        
        var back = game.add.image(650, 1270, "back");
        back.inputEnabled = true;
        back.events.onInputDown.add(backBtn, this);
        
        //Customization Buttons
        var arrowL_Skin = game.add.image(150, 1030, "arrowLeft");
        var arrowR_Skin = game.add.image(450, 1030, "arrowRight");
    
        arrowL_Skin.inputEnabled = true;
        arrowR_Skin.inputEnabled = true;
    
        arrowL_Skin.events.onInputDown.add(function() {
    
            skinTint = shiftHueSkin(skinTint, -12);
            console.log(skinTint);
        });
    
        arrowR_Skin.events.onInputDown.add(function() {
    
            skinTint = shiftHueSkin(skinTint, 12);
            console.log(skinTint);
        });
    
        
        var arrowL_HairCol = game.add.image(150, 1180, "arrowLeft");
        var arrowR_HairCol = game.add.image(450, 1180, "arrowRight");
    
        arrowL_HairCol.inputEnabled = true;
        arrowR_HairCol.inputEnabled = true;
    
        arrowL_HairCol.events.onInputDown.add(function() {
    
            hairTint = shiftHueHair(hairTint, -15);
        });
    
        arrowR_HairCol.events.onInputDown.add(function() {
    
            hairTint = shiftHueHair(hairTint, 15);
        });
        
        var arrowL_Hair = game.add.image(150, 1330, "arrowLeft");
        var arrowR_Hair = game.add.image(450, 1330, "arrowRight");
    
        arrowL_Hair.inputEnabled = true;
        arrowR_Hair.inputEnabled = true;
    
        arrowL_Hair.events.onInputDown.add(function() {
            if(hairIndex == 0) {
                hairIndex = hairArr.length - 1;
            } else {
                hairIndex--;
            }
        });
    
        arrowR_Hair.events.onInputDown.add(function() {
            if(hairIndex == hairArr.length - 1) {
                hairIndex = 0;
            } else {
                hairIndex++;
            }
        });
        
        var arrowL_Shirt = game.add.image(150, 1480, "arrowLeft");
        var arrowR_Shirt = game.add.image(450, 1480, "arrowRight");
    
        arrowL_Shirt.inputEnabled = true;
        arrowR_Shirt.inputEnabled = true;
    
        arrowL_Shirt.events.onInputDown.add(function() {
            if(shirtIndex == 0) {
                shirtIndex = shirtArr.length - 1;
            } else {
                shirtIndex--;
            }
        }, this);
    
        arrowR_Shirt.events.onInputDown.add(function() {
            if(shirtIndex == shirtArr.length - 1) {
                shirtIndex = 0;
            } else {
                shirtIndex++;
            }
        }, this);
    
        //Menu Labels
    
        game.add.text(290, 1040, "Skin\nColour", {
            font: "45px Pixilate",
            fill: "#ffffff",
            align: "center"
        });
    
        game.add.text(290, 1180, "Hair\nColour", {
            font: "45px Pixilate",
            fill: "#ffffff",
            align: "center"
        });
    
        game.add.text(310, 1350, "Hair", {
            font: "45px Pixilate",
            fill: "#ffffff",
            align: "right"
        });
    
        game.add.text(310, 1500, "Shirt", {
            font: "45px Pixilate",
            fill: "#ffffff",
            align: "right"
        });
    
        // Character
        character = game.add.group();
    
        body = character.create(0, 0, 'body');
        body.smoothed = false;
    
        shirt = character.create(0, 0, shirtArr[shirtIndex]);
        shirt.smoothed = false;
    
        hair = character.create(0, 0, hairArr[hairIndex]);
        hair.smoothed = false;
    
        face = character.create(0, 0, 'face');
        face.smoothed = false;
    
        character.x = 165;
        character.y = 404;
    
        character.scale.setTo(12);
    },

    update: function() {

        shirt.loadTexture(shirtArr[shirtIndex]);
        hair.loadTexture(hairArr[hairIndex]);
    
        hair.tint = hairTint;
        body.tint = skinTint;
        
    }

};
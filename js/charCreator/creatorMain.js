var creatorMain = {
    preload: function () {

        hairArr = ['hair1', 'hair2', 'hair3', 'hair4', 'hair5', 'hair6'];
        shirtArr = ['shirt1', 'shirt2', 'shirt3', 'shirt4', 'shirt5'];
        hairTint = userHairColor;
        skinTint = userSkin;

        hairIndex = hairArr.findIndex(function (cur) {
            return cur == hair;
        });
        shirtIndex = shirtArr.findIndex(function (cur) {
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

        game.load.atlasJSONHash('sprites', 'Images/sprites.png', 'Images/sprites.json');

    },

    create: function () {

        //UI
        var background = game.add.image(540, 960, "background");
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(10, 10);

        var banner = game.add.image(540, 960, "banner");
        banner.anchor.setTo(0.5, 0.5);

        var displayBanner = game.add.image(540, 670, "displayBanner");
        displayBanner.anchor.setTo(0.5, 0.5);

        var looksgood = game.add.image(645, 1275, "looksgood");
        looksgood.scale.setTo(0.9);
        looksgood.inputEnabled = true;
        looksgood.events.onInputDown.add(looksgoodBtn, this);

        var back = game.add.image(645, 1445, "back");
        back.scale.setTo(0.9);
        back.inputEnabled = true;
        back.events.onInputDown.add(backBtn, this);

        //Customization Buttons Setup
        var xColLeft = 150;
        var xDiff = 300;
        var xColRight = xColLeft + xDiff + 150;

        var yBase = 1050;
        var yDiff = 150;

        // Arrows for changing Hue of skin
        var arrowL_SkinHue = game.add.image(xColLeft, yBase, "arrowLeft");
        var arrowR_SkinHue = game.add.image(xColLeft + xDiff, yBase, "arrowRight");

        arrowL_SkinHue.inputEnabled = true;
        arrowR_SkinHue.inputEnabled = true;
        arrowL_SkinHue.anchor.setTo(0.5);
        arrowR_SkinHue.anchor.setTo(0.5);

        arrowL_SkinHue.events.onInputDown.add(function () {

            skinTint = shiftHue(skinTint, -12);
            console.log(skinTint);
        });

        arrowR_SkinHue.events.onInputDown.add(function () {

            skinTint = shiftHue(skinTint, 12);
            console.log(skinTint);
        });

        arrowL_SkinHue.events.onInputDown.add(onTap, this);
        arrowL_SkinHue.events.onInputUp.add(onRelease, this);
        arrowR_SkinHue.events.onInputDown.add(onTap, this);
        arrowR_SkinHue.events.onInputUp.add(onRelease, this);


        // Arrows for changing Luminosity of Skin
        var arrowL_SkinLum = game.add.image(xColRight, yBase, "arrowLeft");
        var arrowR_SkinLum = game.add.image(xColRight + xDiff, yBase, "arrowRight");

        arrowL_SkinLum.inputEnabled = true;
        arrowR_SkinLum.inputEnabled = true;
        arrowL_SkinLum.anchor.setTo(0.5);
        arrowR_SkinLum.anchor.setTo(0.5);

        arrowL_SkinLum.events.onInputDown.add(function () {

            skinTint = shiftLuminosity(skinTint, -12);
            console.log(skinTint);
        });

        arrowR_SkinLum.events.onInputDown.add(function () {

            skinTint = shiftLuminosity(skinTint, 12);
            console.log(skinTint);
        });

        arrowL_SkinLum.events.onInputDown.add(onTap, this);
        arrowL_SkinLum.events.onInputUp.add(onRelease, this);
        arrowR_SkinLum.events.onInputDown.add(onTap, this);
        arrowR_SkinLum.events.onInputUp.add(onRelease, this);


        // Arrows for changing Hue of hair
        var arrowL_HairHue = game.add.image(xColLeft, yBase + yDiff, "arrowLeft");
        var arrowR_HairHue = game.add.image(xColLeft + xDiff, yBase + yDiff, "arrowRight");

        arrowL_HairHue.inputEnabled = true;
        arrowR_HairHue.inputEnabled = true;
        arrowL_HairHue.anchor.setTo(0.5);
        arrowR_HairHue.anchor.setTo(0.5);

        arrowL_HairHue.events.onInputDown.add(function () {

            hairTint = shiftHue(hairTint, -10);
        });

        arrowR_HairHue.events.onInputDown.add(function () {

            hairTint = shiftHue(hairTint, 10);
        });

        arrowL_HairHue.events.onInputDown.add(onTap, this);
        arrowL_HairHue.events.onInputUp.add(onRelease, this);
        arrowR_HairHue.events.onInputDown.add(onTap, this);
        arrowR_HairHue.events.onInputUp.add(onRelease, this);


        // Arrows for changing Luminosity of hair
        var arrowL_HairLum = game.add.image(xColRight, yBase + yDiff, "arrowLeft");
        var arrowR_HairLum = game.add.image(xColRight + xDiff, yBase + yDiff, "arrowRight");

        arrowL_HairLum.inputEnabled = true;
        arrowR_HairLum.inputEnabled = true;
        arrowL_HairLum.anchor.setTo(0.5);
        arrowR_HairLum.anchor.setTo(0.5);

        arrowL_HairLum.events.onInputDown.add(function () {

            hairTint = shiftLuminosity(hairTint, -15);
        });

        arrowR_HairLum.events.onInputDown.add(function () {

            hairTint = shiftLuminosity(hairTint, 15);
        });

        arrowL_HairLum.events.onInputDown.add(onTap, this);
        arrowL_HairLum.events.onInputUp.add(onRelease, this);
        arrowR_HairLum.events.onInputDown.add(onTap, this);
        arrowR_HairLum.events.onInputUp.add(onRelease, this);


        // Arrows for changing hair style
        var arrowL_Hair = game.add.image(xColLeft, yBase + 2 * yDiff, "arrowLeft");
        var arrowR_Hair = game.add.image(xColLeft + xDiff, yBase + 2 * yDiff, "arrowRight");

        arrowL_Hair.inputEnabled = true;
        arrowR_Hair.inputEnabled = true;
        arrowL_Hair.anchor.setTo(0.5);
        arrowR_Hair.anchor.setTo(0.5);


        arrowL_Hair.events.onInputDown.add(function () {
            if (hairIndex == 0) {
                hairIndex = hairArr.length - 1;
            } else {
                hairIndex--;
            }
        });

        arrowR_Hair.events.onInputDown.add(function () {
            if (hairIndex == hairArr.length - 1) {
                hairIndex = 0;
            } else {
                hairIndex++;
            }
        });

        arrowL_Hair.events.onInputDown.add(onTap, this);
        arrowL_Hair.events.onInputUp.add(onRelease, this);
        arrowR_Hair.events.onInputDown.add(onTap, this);
        arrowR_Hair.events.onInputUp.add(onRelease, this);


        // Arrows for changing shirt style
        var arrowL_Shirt = game.add.image(xColLeft, yBase + 3 * yDiff, "arrowLeft");
        var arrowR_Shirt = game.add.image(xColLeft + xDiff, yBase + 3 * yDiff, "arrowRight");

        arrowL_Shirt.inputEnabled = true;
        arrowR_Shirt.inputEnabled = true;
        arrowL_Shirt.anchor.setTo(0.5);
        arrowR_Shirt.anchor.setTo(0.5);

        arrowL_Shirt.events.onInputDown.add(function () {
            if (shirtIndex == 0) {
                shirtIndex = shirtArr.length - 1;
            } else {
                shirtIndex--;
            }
        }, this);

        arrowR_Shirt.events.onInputDown.add(function () {
            if (shirtIndex == shirtArr.length - 1) {
                shirtIndex = 0;
            } else {
                shirtIndex++;
            }
        }, this);

        arrowL_Shirt.events.onInputDown.add(onTap, this);
        arrowL_Shirt.events.onInputUp.add(onRelease, this);
        arrowR_Shirt.events.onInputDown.add(onTap, this);
        arrowR_Shirt.events.onInputUp.add(onRelease, this);


        //Menu Labels

        var skinHueText = game.add.text(xColLeft + xDiff / 2, yBase, "Skin\nHue", {
            font: "45px Pixelate",
            fill: "#ffffff",
            align: "center"
        });

        skinHueText.anchor.setTo(0.5);

        var skinLumText = game.add.text(xColRight + xDiff / 2, yBase, "Skin\nLightness", {
            font: "45px Pixelate",
            fill: "#ffffff",
            align: "center"
        });

        skinLumText.anchor.setTo(0.5);

        var hairHueText = game.add.text(xColLeft + xDiff / 2, yBase + yDiff, "Hair\nHue", {
            font: "45px Pixelate",
            fill: "#ffffff",
            align: "center"
        });

        hairHueText.anchor.setTo(0.5);

        var hairLumText = game.add.text(xColRight + xDiff / 2, yBase + yDiff, "Hair\nLightness", {
            font: "45px Pixelate",
            fill: "#ffffff",
            align: "center"
        });

        hairLumText.anchor.setTo(0.5);

        var hairText = game.add.text(xColLeft + xDiff / 2, yBase + 2 * yDiff, "Hair", {
            font: "45px Pixelate",
            fill: "#ffffff",
            align: "right"
        });

        hairText.anchor.setTo(0.5);

        var shirtText = game.add.text(xColLeft + xDiff / 2, yBase + 3 * yDiff, "Shirt", {
            font: "45px Pixelate",
            fill: "#ffffff",
            align: "right"
        });

        shirtText.anchor.setTo(0.5);

        // Character
        character = game.add.group();

        body = character.create(0, 0, 'sprites', 'character/body.png');
        body.smoothed = false;

        shirt = character.create(0, 0, 'sprites', 'character/' + shirtArr[shirtIndex] + '.png');
        shirt.smoothed = false;

        hair = character.create(0, 0, 'sprites', 'character/' + hairArr[hairIndex] + '.png');
        hair.smoothed = false;

        face = character.create(0, 0, 'sprites', 'character/face2.png');
        face.smoothed = false;

        character.x = 165;
        character.y = 404;

        character.scale.setTo(12);
    },

    update: function () {

        shirt.frameName = 'character/' + shirtArr[shirtIndex] + '.png';
        hair.frameName = 'character/' + hairArr[hairIndex] + '.png';

        hair.tint = hairTint;
        body.tint = skinTint;

    }

};
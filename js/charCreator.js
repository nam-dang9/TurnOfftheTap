console.log("in charCreator.js");
console.log(hair);
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB9iAfpDb7RZgzYmpz7Gi6lkrV6lLWbr2Q",
    authDomain: "demo2-b13f2.firebaseapp.com",
    databaseURL: "https://demo2-b13f2.firebaseio.com",
    projectId: "demo2-b13f2",
    storageBucket: "demo2-b13f2.appspot.com",
    messagingSenderId: "641975222602"
};

firebase.initializeApp(config);
var db = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);


var config = {
    width: 1080,
    height: 1920,
    renderer: Phaser.AUTO,
    antialias: false,
    state: {
        init: init,
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    //readData();
}


var hairArr = ['hair1', 'hair2', 'hair3', 'hair4', 'hair5', 'hair6'];
var shirtArr = ['shirt1', 'shirt2', 'shirt3', 'shirt4', 'shirt5'];
var hairTint = '0x002aff';
var skinTint = '0xdc9556';

//var hairIndex = hairArr.findIndex(hair);
//var shirtIndex = shirtArr.findIndex(userBody);
var hairIndex = 0;
var shirtIndex = 0;

var character;

var body;
var shirt;
var hair;
var face;

function preload() {
    game.load.image('loadingLogo', 'Images/TurnOfftheTap Logo2.png');
    game.load.image('background', 'Images/VancouverBackground.png');

    game.load.image('arrowLeft', 'Images/btns/Arrow-Left.png');
    game.load.image('arrowRight', 'Images/btns/Arrow-Right.png');
    game.load.image('banner', 'Images/banners/banner-Light.png');
    game.load.image('displayBanner', 'Images/banners/banner-charDisplay.png');
    game.load.image('looksgood', 'Images/btns/btn-LooksGood.png');
    game.load.image('back', 'Images/btns/btn-Back.png');


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

}

function create() {

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
}

function update() {

    shirt.loadTexture(shirtArr[shirtIndex]);
    hair.loadTexture(hairArr[hairIndex]);

    hair.tint = hairTint;
    body.tint = skinTint;
    
}

function looksgoodBtn() {
				
    var uid = firebase.auth().currentUser.uid;
    var uName = firebase.auth().currentUser.displayName;
    var uemail = firebase.auth().currentUser.email;
//			testing db /delete after the game done 
    
//				alert("user name: " + uName);
//				alert("User email: " + uemail);
//				alert("hairArr[hairIndex]: " + hairArr[hairIndex]);
//				alert("shirtArr[shirtIndex]: " + shirtArr[shirtIndex]);
//				alert("hairTint: " + hairTint);
//				alert("skinTint: " +skinTint);
    
    
    firebase.auth().onAuthStateChanged(function(user) {

            if (user){
                db.collection("Users").doc(uid).update({
                    hair: hairArr[hairIndex],
                    hairColor: hairTint,
                    body: shirtArr[shirtIndex],
                    skin: skinTint
                }).then(function() {
                    //alert("Update data successful.");
                }).catch(function(error) {
                    //alert("Update data failed.");
                });
            }
    });	

    game.time.events.add(200, function() {
        window.location.href = "game.html";
    });

    
}

function backBtn() {
    window.location.href = "index.html";
}



function shiftHueHair(hex, degree) {
    var hsl = rgbToHsl(hexToRgb(hex));

    console.log("Hue Before: " + hsl.h);

    hsl.h += degree;

    console.log("Hue After: " + hsl.h);

    var rgb = hslToRgb(hsl);
    return "0x" + rgbToHex(rgb);
}

function shiftHueSkin(hex, degree) {
    var hsl = rgbToHsl(hexToRgb(hex));

    console.log("Hue Before: " + hsl.h + " Light After: " + hsl.l);

    hsl.h += degree;

    hsl.l = 0.48 + (hsl.h/1440);

    console.log("Hue After: " + hsl.h + " Light After: " + hsl.l);

    var rgb = hslToRgb(hsl);
    return "0x" + rgbToHex(rgb);
}

function hexToRgb(hex) {
    var result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(rgb) {

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    return componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
}

function rgbToHsl(rgb) {
    var r = rgb.r /= 255; 
    var g = rgb.g /= 255; 
    var b = rgb.b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }
    
    return { 
        h: Math.round(h * 360),
        s: s, 
        l: l 
    };
}

function hslToRgb(hsl) {
    var r, g, b;

    var h = hsl.h / 360;
    var s = hsl.s;
    var l = hsl.l;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }


    return {
        r: Math.round(r * 255), 
        g: Math.round(g * 255), 
        b: Math.round(b * 255) 
    };
}
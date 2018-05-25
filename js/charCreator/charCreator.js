var gameConfig = {
    width: 1080,
    height: 1920,
    renderer: Phaser.AUTO,
    antialias: false
}

var hairArr;
var shirtArr;
var hairTint;
var skinTint;

var hairIndex;
var shirtIndex;

var character;

var body;
var shirt;
var hair;
var face;

var game = new Phaser.Game(gameConfig);

game.state.add('boot', charBoot);
game.state.add('creator', creatorMain);

game.state.start('boot');

function onTap(button) {
    button.scale.setTo(.8);
}

function onRelease(button) {
    button.scale.setTo(1);
}

function looksgoodBtn() {
				
    var uid = firebase.auth().currentUser.uid;
    var uName = firebase.auth().currentUser.displayName;
    var uemail = firebase.auth().currentUser.email;
    
    firebase.auth().onAuthStateChanged(function(user) {

            if (user){
                firestore.collection("Users").doc(uid).update({
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

    game.time.events.add(1000, function() {
        window.location.href = "game.html";
    });
    
}

function backBtn() {
    window.location.href = "index.html";
}

function shiftHue(hex, degree) {
    var hsl = rgbToHsl(hexToRgb(hex));

    hsl.h += degree;

    var rgb = hslToRgb(hsl);
    return "0x" + rgbToHex(rgb);
}

function shiftLuminosity(hex, degree) {
    var hsl = rgbToHsl(hexToRgb(hex));

    hsl.l += (degree/100);

    if (hsl.l < 0.1) {
        hsl.l = 0.1;
    } else if (hsl.l > 0.9) {
        hsl.l = 0.9;
    }

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
// skrypt generuje przykłady niektórych pól na planszy, które są w grze

$(document).ready(function() {

    var thisArg = {
        ctx: $("#obstacle-example")[0].getContext("2d"),
        position: {
            col: 0,
            row: 0
        }
    };
    ObstacleField.prototype.draw.call(thisArg);

    thisArg.ctx = $("#healthy-apple-example")[0].getContext("2d");
    thisArg.peelColor = "red";
    thisArg.leafColor = "#0c0";
    AppleField.prototype.draw.call(thisArg);

    thisArg.ctx = $("#poisoned-apple-example")[0].getContext("2d");
    thisArg.peelColor = "#624C20";
    thisArg.leafColor = "#980";
    PoisonedAppleField.prototype.draw.call(thisArg);

    thisArg.ctx = $("#mouse-example")[0].getContext("2d");
    thisArg.orientation = "right";
    MouseField.prototype.draw.call(thisArg);

});
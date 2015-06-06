if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

var game;
var gameHandler = $("#game");
var settingsHandler = $("#settings");

function startGame(event) {
    gameHandler.find(".game-starter").hide();
    gameHandler.find("canvas").show();
    settingsHandler.find("input, button").prop("disabled", true);
    settingsHandler.find("h3").addClass("locked");
    game = new Game( {
        handler: gameHandler,
        size: {
            cols: Number(settingsHandler.find(".cols").val().replace(",", ".")),
            rows: Number(settingsHandler.find(".rows").val().replace(",", "."))
        },
        healthyApples: Number(settingsHandler.find(".healthy-apples").val().replace(",", ".")),
        maxPoisonedApples: Number(settingsHandler.find(".max-poisoned-apples").val().replace(",", ".")),
        poisonedApplesChangeProbability: Number(settingsHandler.find(".poisoned-apples-change-probability").val().replace(",", ".")),
        obstacles: Number(settingsHandler.find(".obstacles").val().replace(",", ".")),
        interval: Number(settingsHandler.find(".interval").val().replace(",", "."))
    });
}

function stopGame(event) {
    gameHandler.find(".game-starter").show();
    gameHandler.find("canvas").hide();
    settingsHandler.find("input, button").prop("disabled", false);
    settingsHandler.find("h3").removeClass("locked");
    game.destruct();
    game = null;
}

$(document).ready(function() {

    $(window).resize(function(event) {
        var maxWidth = $(this).width();
        var maxHeight = $(this).height();
        gameHandler.find("canvas").css( {
            maxWidth: Math.floor(maxWidth * 0.9) + "px",
            maxHeight: Math.floor(maxHeight * 0.9) + "px"
        });
    }).resize();

    $(".percent-range").change(function() {
        var value = Number($(this).val().replace(",", "."));
        value = (value * 100).toFixed(0) + "%";
        $(this).parent().find(".range-label").text(value);
    }).change();

    $(".non-clickable").click(function(event) {
        event.stopPropagation();
    });

});
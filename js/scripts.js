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
var isGameRunning = false;
$("input").prop("disabled", false);

function toggleGame() {
    var handler = $(this).closest("section");
    if (isGameRunning) {
        game.canvas.css({
            backgroundImage: "none"
        });
        $("#game-canvas, #game-controls").css( {
            display: "none"
        });
        handler.find("input").prop("disabled", false);
        game.destruct();
        game = null;
        handler.find(".trigger").text("Rozpocznij grę");
        isGameRunning = false;
    } else {
        $("#game-canvas, #game-controls").css( {
            display: "block"
        });
        handler.find("input").prop("disabled", true);
        game = new Game( {
            canvasID: "game-canvas",
            size: {
                cols: Number(handler.find(".cols").val().replace(",", ".")),
                rows: Number(handler.find(".rows").val().replace(",", "."))
            },
            healthyApples: Number(handler.find(".healthy-apples").val().replace(",", ".")),
            maxPoisonedApples: Number(handler.find(".max-poisoned-apples").val().replace(",", ".")),
            poisonedApplesChangeProbability: Number(handler.find(".poisoned-apples-change-probability").val().replace(",", ".")),
            obstacles: Number(handler.find(".obstacles").val().replace(",", ".")),
            interval: Number(handler.find(".interval").val().replace(",", "."))
        });
        handler.find(".trigger").text("Zakończ grę");
        isGameRunning = true;
    }
}

$(document).ready(function() {

    $(window).resize(function() {
        var maxWidth = $(this).width();
        var maxHeight = $(this).height();
        $("#game-canvas").css( {
            maxWidth: Math.floor(maxWidth * 0.8) + "px",
            maxHeight: Math.floor(maxHeight * 0.8) + "px"
        });
    }).resize();

    $(".percent-range").change(function(){
        var value = Number($(this).val().replace(",", "."));
        value = (value * 100).toFixed(0) + "%";
        $(this).parent().find(".range-label").text(value);
    }).change();

});
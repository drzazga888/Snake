importScripts(
    "LightBoard.js",
    "Randomizer.js",
    "ObjectGenerator.js"
);

var lightBoard = new LightBoard();
var isBoardUsed = false;
var configMessageReceived = false;
var config;

this.onmessage = function(event) {
    if (!isBoardUsed) {
        isBoardUsed = true;
        if (!configMessageReceived) {
            config = JSON.parse(event.data);
            configMessageReceived = true;
        } else {
            lightBoard.refresh(event.data);
            HealthyApplesGenerator(lightBoard, config.healthyApples);
            PoisonedApplesGenerator(lightBoard, config.maxPoisonedApples, config.poisonedApplesChangeProbability);
            this.postMessage(JSON.stringify(lightBoard.board));
        }
        isBoardUsed = false;
    }
};
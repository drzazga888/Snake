importScripts(
    "LightBoard.js",
    "Randomizer.js",
    "ObjectGenerator.js"
);

var lightBoard = new LightBoard();
var isBoardUsed = false;

this.onmessage = function(event) {
    this.postMessage("[DEBUG] od poczatku");
    if (!isBoardUsed) {
        isBoardUsed = true;
        lightBoard.refresh(event.data);
        HealthyApplesGenerator(lightBoard, 2);
        PoisonedApplesGenerator(lightBoard, 3);
        this.postMessage(JSON.stringify(lightBoard.board));
        isBoardUsed = false;
    } else {
        this.postMessage("[DEBUG] WebWorker potrzebuje jescze czasu...");
    }
};
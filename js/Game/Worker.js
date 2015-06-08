// skrypt WebWorkera

importScripts(
    "LightBoard.js",
    "Randomizer.js",
    "MouseGenerator.js",
    "ApplesGenerator.js"
);

var lightBoard = new LightBoard();
var isBoardUsed = false;
var configMessageReceived = false;
var config;

this.onmessage = function(event) {
    // sprawdzanie, czy poprzednia aktualizacja planszy zostałą ukończona
    if (!isBoardUsed) {
        isBoardUsed = true;
        if (!configMessageReceived) {
            // operacje wykonywane po dostaniu konfiguracji (ilość jabłek zatrutych, zdrowych itd..)
            config = JSON.parse(event.data);
            configMessageReceived = true;
        } else {
            // operacje wykonywane po dostaniu okrojonej wersji planszy od głównego rdzenia aplikacji
            lightBoard.refresh(event.data);
            HealthyApplesGenerator(lightBoard, config.healthyApples);
            PoisonedApplesGenerator(lightBoard, config.maxPoisonedApples, config.poisonedApplesChangeProbability);
            MouseGenerator(lightBoard);
            this.postMessage(JSON.stringify(lightBoard.board));
        }
        isBoardUsed = false;
    }
};
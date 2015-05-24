importScripts(
    "LightBoard.js",
    "Obstables.js"
);

var board = new LightBoard();

this.onmessage = function(event) {
    board.refresh(event.data);
    this.postMessage(JSON.stringify(board.stats));
};
function Randomizer() {
}

Randomizer.NWD = function(a, b) {
    var temp;
    while (b) {
        temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

Randomizer.generateCoprime = function(a) {
    var coprimers = [];
    for (var b = 1; b < a; ++b) {
        if (Randomizer.NWD(a, b) == 1)
            coprimers.push(b);
    }
    if (coprimers.length)
        return coprimers[Math.floor(Math.random() * coprimers.length)];
};

Randomizer.getValidField = function(board, validator) {
    var position = {
        col: Math.floor(Math.random() * board[0].length),
        row: Math.floor(Math.random() * board.length)
    };
    while (validator(board[position.row][position.col]) == false) {
        var offset = Randomizer.generateCoprime(board.length * board[0].length);
        var rowOffset = (offset + position.row) % board[0].length;
        var colOffset = (offset + position.col) - (rowOffset * board[0].length);
        rowOffset %= board.length;
        position.col = colOffset;
        position.row = rowOffset;
    }
    if (position.col < 0 || position.row < 0 || position.col > board[0].length || position.row > board.length)
        if (typeof this.postMessage == "function")
            this.postMessage("[DEBUG] masz problem nr 2");
        else
            console.log("[DEBUG] masz problem nr 2");
    return position;
};
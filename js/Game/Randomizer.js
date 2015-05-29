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
    if (validator(board[position.row][position.col]) == false) {
        var offset = Randomizer.generateCoprime(board.length * board[0].length);
        var iterator = 0;
        while (validator(board[position.row][position.col]) == false) {
            if (++iterator >= board.length * board[0].length)
                throw "All board items are invalid!";
            var overflows = Math.floor((position.col + offset) / board[0].length);
            position.col = (position.col + offset) - (overflows * board[0].length);
            position.row = (position.row + overflows) % board.length;
        }
    }
    return position;
};
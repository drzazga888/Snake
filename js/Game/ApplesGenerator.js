function HealthyApplesGenerator(lightBoard, n) {
    var toGenerate = n - lightBoard.stats.healthyApples;
    while (toGenerate > 0) {
        var position = Randomizer.getValidField(lightBoard.board, function(id) {
            return id == 0;
        });
        lightBoard.board[position.row][position.col] = 3;
        --toGenerate;
    }
}

function PoisonedApplesGenerator(lightBoard, n, probability) {
    var desiredApples = Math.random() > probability ? Math.floor(Math.random() * (n + 1)) : lightBoard.stats.poisonedApples;
    var applesToAdd = desiredApples - lightBoard.stats.poisonedApples;
    var position;
    if (applesToAdd > 0) {
        while (applesToAdd > 0) {
            position = Randomizer.getValidField(lightBoard.board, function(id) {
                return id == 0;
            });
            lightBoard.board[position.row][position.col] = 4;
            --applesToAdd;
        }
    } else if (applesToAdd < 0) {
        while (applesToAdd < 0) {
            position = Randomizer.getValidField(lightBoard.board, function(id) {
                return id == 4;
            });
            lightBoard.board[position.row][position.col] = 0;
            ++applesToAdd;
        }
    }
}
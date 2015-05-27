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

function PoisonedApplesGenerator(lightBoard, n) {
    var desiredApples = Math.random() > 0.9 ? Math.floor(Math.random() * (n + 1)) : lightBoard.stats.poisonedApples;
    //this.postMessage("[DEBUG] zamiarzona ilość jabłek: " + desiredApples);
    //this.postMessage("[DEBUG] ilość jabłek: " + lightBoard.stats.poisonedApples);
    var applesToAdd = desiredApples - lightBoard.stats.poisonedApples;
    var position;
    if (applesToAdd > 0) {
        //this.postMessage("[DEBUG] trzeba dodać " + applesToAdd + " jabłek");
        while (applesToAdd > 0) {
            //this.postMessage("[DEBUG] dodaje jabłko");
            position = Randomizer.getValidField(lightBoard.board, function(id) {
                return id == 0;
            });
            lightBoard.board[position.row][position.col] = 4;
            this.postMessage("[DEBUG] chore pole na " + JSON.stringify(position));
            --applesToAdd;
        }
    } else if (applesToAdd < 0) {
        //this.postMessage("[DEBUG] trzeba usunąć " + (-applesToAdd) + " jabłek");
        while (applesToAdd < 0) {
            //this.postMessage("[DEBUG] usuwam jabłko");
            position = Randomizer.getValidField(lightBoard.board, function(id) {
                return id == 4;
            });
            lightBoard.board[position.row][position.col] = 0;
            this.postMessage("[DEBUG] ustawiłem puste pole na " + JSON.stringify(position));
            ++applesToAdd;
        }
    }
    lightBoard.generateStats();
    if (lightBoard.stats.poisonedApples != desiredApples)
        this.postMessage("[DEBUG] masz problem");
}
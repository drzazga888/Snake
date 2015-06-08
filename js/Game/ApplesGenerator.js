/**
 * Obiekt ten analizuje ile zdrowych jabłek jest na planszy i w razie potrzeby je dodaje
 * @param lightBoard - zredukowana plansza (dla WebWorkera) wraz z wygrenerowanymi statystykami
 * @param n - docelowa ilość jabłek na planszy
 * @constructor
 */
function HealthyApplesGenerator(lightBoard, n) {
    var toGenerate = n - lightBoard.stats.healthyApples;
    while (toGenerate > 0) {
        var position = Randomizer.getValidField(lightBoard.board, function(id) {
            return id == 0;
        });
        if (position)
            lightBoard.board[position.row][position.col] = 3;
        --toGenerate;
    }
}

/**
 * Obiekt ten analizuje ile chorych jabłek jest na planszy i w razie potrzeby je dodaje
 * @param lightBoard - zredukowana plansza (dla WebWorkera) wraz z wygrenerowanymi statystykami
 * @param n - docelowa maksymalna ilość jabłek na planszy
 * @param probability - prawdopodobieństwo zachowania danego ustawienia chorych jabłek, wartości od 0 do 1
 * @constructor
 */
function PoisonedApplesGenerator(lightBoard, n, probability) {
    var desiredApples = Math.random() > probability ? Math.floor(Math.random() * (n + 1)) : lightBoard.stats.poisonedApples;
    var applesToAdd = desiredApples - lightBoard.stats.poisonedApples;
    var position;
    if (applesToAdd > 0) {
        while (applesToAdd > 0) {
            position = Randomizer.getValidField(lightBoard.board, function(id) {
                return id == 0;
            });
            if (position)
                lightBoard.board[position.row][position.col] = 4;
            --applesToAdd;
        }
    } else if (applesToAdd < 0) {
        while (applesToAdd < 0) {
            position = Randomizer.getValidField(lightBoard.board, function(id) {
                return id == 4;
            });
            if (position)
                lightBoard.board[position.row][position.col] = 0;
            ++applesToAdd;
        }
    }
}
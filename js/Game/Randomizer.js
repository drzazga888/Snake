/**
 * Konstruktor obiektu Randomizer, który losuje pole
 * @constructor
 */
function Randomizer() {
}

/**
 * Funckja liczy największy wspólny dzielnik
 * @param a - pierwsza liczba
 * @param b - druga liczba
 * @returns {*} - NWD(a, b)
 */
Randomizer.NWD = function(a, b) {
    var temp;
    while (b) {
        temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

/**
 * Funckja generuje losową liczbę względnie pierwszą do podanej
 * @param a - liczba, dla której ma być wylosowana liczba względnie pierwsza
 * @returns {*} - wylosowana liczba względnie pierwsza
 */
Randomizer.generateCoprime = function(a) {
    var coprimers = [];
    for (var b = 1; b < a; ++b) {
        if (Randomizer.NWD(a, b) == 1)
            coprimers.push(b);
    }
    if (coprimers.length)
        return coprimers[Math.floor(Math.random() * coprimers.length)];
};

/**
 * Metoda losująca, losuje pole na planszy tak, że mamy pewność, że po [ilość pól na planszy] próbach odnalezienia odpowiedniego pola przejdziemy je wszystkie.
 * @param board - zredukowana plansza dla WebWorkera
 * @param validator - funkcja walidująca, zwraca true, jeśli pole jest poprawne i może zostać przyjęte
 * @returns {*} - poprawna pozycja (obiekt {row, col}), lub null, gdy nie ma na planszy pola spełniającego wymagania funkcji validator
 */
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
                return null;
            var overflows = Math.floor((position.col + offset) / board[0].length);
            position.col = (position.col + offset) - (overflows * board[0].length);
            position.row = (position.row + overflows) % board.length;
        }
    }
    return position;
};
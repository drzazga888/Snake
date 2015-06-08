/**
 * Konstruktor obiektu LightBoard - obiekt ten zawiera interfejs dla okrojonej wersji planszy (dla WebWorkera)
 * @constructor
 */
function LightBoard() {
}

/**
 * Inicjuje / zeruje zmienne używane do zbierania informacji o planszy
 */
LightBoard.prototype.initStats = function() {
    this.stats = {
        healthyApples: 0,
        poisonedApples: 0,
        mice: []
    };
};

/**
 * Metoda parsuje planszę w postaci JSON i generuje statystyki dla tej planszy
 * @param stringifiedBoard
 */
LightBoard.prototype.refresh = function(stringifiedBoard) {
    this.board = JSON.parse(stringifiedBoard);
    this.generateStats();
};

/**
 * Metoda generuje statystyki takie jak:
 *  - ilość zatrutych jabłek na planszy
 *  - ilość zdrowych jabłek
 *  - ilość myszy, ich pozycja i orientacja
 */
LightBoard.prototype.generateStats = function() {
    this.initStats();
    for (var row_i = 0; row_i < this.board.length; ++row_i) {
        for (var col_i = 0; col_i < this.board[row_i].length; ++col_i) {
            if (this.board[row_i][col_i] > 2) {
                var position = {
                    row: row_i,
                    col: col_i
                };
                switch (this.board[row_i][col_i]) {
                    case 3:
                        ++this.stats.healthyApples;
                        break;
                    case 4:
                        ++this.stats.poisonedApples;
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        this.stats.mice.push({
                            position: position,
                            orientation: MouseGenerator.mouseIdToOrientation[this.board[row_i][col_i]]
                        });
                        break;
                }
            }
        }
    }
};
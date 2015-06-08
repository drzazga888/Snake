/**
 * Board służy do przechowywania informacji o głównej planszy, używana do namalowania planszy na płótnie
 * @param params - obiekt zbiorczy, który zawiera:
 *  - ctx - obiekt CanvasRenderingContext2D, który się używa do rysowania
 *  - size - obiekt który zawiera pola cols i rows, rozmiar planszy
 *  - healthyApples - ilość zdrowych jabłek, które mają znajdować się na planszy
 *  - maxPoisonedApples - makszymalna ilość chorych jabłek na planszy
 *  - obstacles - ilość przeszkód na planszy
 * @constructor
 */
function Board(params) {
	this.ctx = params.ctx;
    this.size = params.size;
    this.healthyApples = params.healthyApples;
    this.maxPoisonedApples = params.maxPoisonedApples;
    this.obstacles = params.obstacles;
	this.fields = [];
	for (var row_i = 0; row_i < this.size.rows; ++row_i) {
		this.fields[row_i] = [];
		for (var col_i = 0; col_i < this.size.cols; ++col_i)
			this.setField({
                row: row_i,
                col: col_i
            }, EmptyField);
	}
}

/**
 * Pozwala ustawić pole na planszy
 * @param position - obiekt zawierający col i row, pozycja pola
 * @param fieldType - typ pola, jako parametr podaje się konstruktor obiektu
 * @param orientation - orientacja myszy lub węża, dla innych pól parametr zbędny, możliwe wartości:
 *  - "top"
 *  - "bottom"
 *  - "left"
 *  - "right"
 *  - kombinacja powyższych wartości według wzoru: [war1]-[war2], tylko dla snake'a, używany do zagięć ciała
 * @param spriteType - typ węża, dla innych pól parametr zbędny, możliwe wartości:
 *  - "head" - głowa
 *  - "body" - ciało
 *  - "tail" - ogon
 * @param part - nr odcinka węża, dla innych pól parametr zbędny
 */
Board.prototype.setField = function(position, fieldType, orientation, spriteType, part) {
    this.fields[position.row][position.col] = new fieldType(this.ctx, position, orientation, spriteType, part);
};

/**
 * Pobiera pole z planszy
 * @param position - obiekt zawierający col i row, pozycja pola
 * @returns {*} - zwraca obiekt na podanej pozycji lub undefined, gdy pole o danej pozycji nie istnieje
 */
Board.prototype.getField = function(position) {
	if (this.fields[position.row] !== undefined)
		return this.fields[position.row][position.col];
	else
		return undefined;
};

/**
 * Metoda, która przechodzi po wszystkich polach planszy i wykonuje na nich zadaną funckcję
 * @param context - kontekst wywołania, dzięki temu możemy odwoływać się poprzez this w funckji callback
 * @param callback - funckcja, która ma być wykonana na polu
 */
Board.prototype.foreach = function(context, callback) {
	for (var row_i = 0; row_i < this.size.rows; row_i++) {
		for (var col_i = 0; col_i < this.size.cols; col_i++)
            callback.call(context, this.getField({
                col: col_i,
                row: row_i
            }));
	}
};

/**
 * Metoda rysuje planszę
 */
Board.prototype.draw = function() {
	this.foreach(this, function(field) {
		field.draw();
	});
};

/**
 * Generowanie pól typu "przeszkoda" na planszy
 */
Board.prototype.putObstacles = function() {
    var itemsToGenerate = this.obstacles;
    var lightBoard = JSON.parse(this.stringify());
    while (itemsToGenerate--) {
        var position = Randomizer.getValidField(lightBoard, function (id) {
            return id == 0;
        });
        if (position)
            this.setField(position, ObstacleField);
    }
};

/**
 * Przekształcanie planszy na typ string, pozwala to na przesłanie wiadomości do WebWorkera
 * @return plansza (tablica 2D numerów identyfikacyjnych pola) przekształcona na string, rozpiska:
 *  - 0 - EmptyField (puste pole)
 *  - 1 - SnakeField (wąż)
 *  - 2 - SnakeField (wąż - głowa)
 *  - 3 - HealthyAppleField (zdrowe jabłko)
 *  - 4 - PoisonedAppleField (zatrute jabłko)
 *  - 5 - ObstacleField (przeszkoda)
 *  - 6 - MouseField (mysz - orientacja: right)
 *  - 7 - MouseField (mysz - orientacja: left)
 *  - 8 - MouseField (mysz - orientacja: up)
 *  - 9 - MouseField (mysz - orientacja: down)
 */
Board.prototype.stringify = function() {
    return JSON.stringify(this.fields, function(key, value) {
        if (value instanceof Array)
            return value;
        else if (value instanceof Field)
            return value.id;
        else
            return undefined;
    });
};

/**
 * Metoda pomocnicza, ustawia pola o podanym id na podanej pozycji
 * @param position - pozycja pola, obiekt zawiera pole col i row
 * @param id - numer identyfikacyjny dla typu pola
 */
Board.prototype.convertIdToField = function(position, id) {
    var type = undefined;
    var additionalParams = null;
    switch (id) {
        case 0:
            type = EmptyField;
            break;
        case 3:
            type = HealthyAppleField;
            break;
        case 4:
            type = PoisonedAppleField;
            break;
        case 5:
            type = ObstacleField;
            break;
        case 6:
            type = MouseField;
            additionalParams = [
                "right"
            ];
            break;
        case 7:
            type = MouseField;
            additionalParams = [
                "left"
            ];
            break;
        case 8:
            type = MouseField;
            additionalParams = [
                "up"
            ];
            break;
        case 9:
            type = MouseField;
            additionalParams = [
                "down"
            ];
            break;
    }
    if (!(this.getField(position) instanceof SnakeField) && type != undefined) {
        if (additionalParams != undefined && additionalParams[0] != undefined)
            this.setField(position, type, additionalParams[0]);
        else
            this.setField(position, type);
    }
};

/**
 * Metoda dekoduje planszę, która przyszła od WebWorkera i odpowiednio zmienia pola na planszy bazowej
 * @param stringifiedBoard - okrojona wersja planszy w postaci string
 */
Board.prototype.parse = function(stringifiedBoard) {
	var parsed = JSON.parse(stringifiedBoard);
    for (var row_i = 0; row_i < this.size.rows; ++row_i) {
        for (var col_i = 0; col_i < this.size.cols; ++col_i) {
            this.convertIdToField({
                col: col_i,
                row: row_i
            }, parsed[row_i][col_i]);
        }
    }
};
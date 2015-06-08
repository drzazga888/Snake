/**
 * Konstruktor obiektu wąż, m. in. ustawia węża na planszę
 * @param board - plansza
 * @param handler - uchwyt biblioteki jQuery, który zawiera element HTML z canvasem i warstwami nakładanymi na niego
 * @constructor
 */
function Snake(board, handler) {
    this.bodyLength = 0;
    this.directions = [
        "right",
        "right"
    ];
    this.newDirection = "right";
	this.board = board;
    this.board.setField({
        col: 0,
        row: 0
    }, SnakeField, "right", "tail", ++this.bodyLength);
    this.board.setField({
        col: 1,
        row: 0
    }, SnakeField, "right", "body", ++this.bodyLength);
    this.board.setField({
        col: 2,
        row: 0
    }, SnakeField, "right", "head", ++this.bodyLength);
    this.head = [
        {
            col: 1,
            row: 0
        }, {
            col: 2,
            row: 0
        }
    ];
    this.points = 0;
    this.pointsHandler = handler.find(".points");
    this.appleSound = $(".apple-sound");
    this.mouseSound = $(".mouse-sound");
}

/**
 * Dodaje punkty
 * @param forWhat - napis, który mówi za comamy dodać (odjąć) punkty:
 * - "healthyApple" - za zjedzenie zdrowego jabłka
 * - "poisonedApple" - za zjedzenie chorego jabłka
 * - "mouse" - za zjedzenie myszy
 * - cokolwiek innego lub brak parametru - za przeżycie
 */
Snake.prototype.addPoints = function(forWhat) {
    switch (forWhat) {
        case "healthyApple":
            this.points += 30;
            break;
        case "poisonedApple":
            this.points -= 100;
            break;
        case "mouse":
            this.points += 100;
            break;
        default:
            this.points += 1;
    }
    if (this.points < 0)
        this.points = 0;
    this.pointsHandler.text(this.points);
};

/**
 * Metoda gra dźwięk gdy wąż coś zje
 * @param forWhat - napis, który mówi jakiego typu dźwięk ma zagrać:
 * - "healthyApple" - dżwięk za zjedzenie zdrowego jabłka
 * - "poisonedApple" - dźwięk za zjedzenie chorego jabłka
 * - "mouse" - dźwięk za zjedzenie myszy
 */
Snake.prototype.playSound = function(forWhat) {
    switch (forWhat) {
        case "healthyApple":
        case "poisonedApple":
            this.appleSound[Math.floor(Math.random() * this.appleSound.length)].play();
            break;
        case "mouse":
            this.mouseSound[Math.floor(Math.random() * this.appleSound.length)].play();
            break;
    }
};

/**
 * Metoda porusza węża w kierunku this.directions[1]
 * @returns {*} - zwraca napisz "win", gdy wygraliśmy, "loss" gdy przegraliśmy lub null, gdy nic się nie stało
 */
Snake.prototype.move = function() {
    this.board.getField(this.head[1]).id = 1;
    this.refreshDirection();
	var newPosition = {
        col: this.head[1].col,
        row: this.head[1].row
    };
	switch (this.directions[1]) {
		case "left":
			--newPosition.col;
			break;
		case "right":
			++newPosition.col;
			break;
		case "up":
			--newPosition.row;
			break;
		case "down":
			++newPosition.row;
			break;
	}
	if (this.isGoodMove(newPosition)) {
		var whatEat = this.fieldToString(newPosition);
		this.board.setField(newPosition, SnakeField, this.directions[1], "head", ++this.bodyLength);
        this.makeCorner();
		if (whatEat == "healthyApple")
            this.eat();
        else if (whatEat == "mouse")
            this.eat();
		else if (whatEat == "poisonedApple")
            this.schrink();
        else
            this.crawl();
        this.addPoints(whatEat);
        this.playSound(whatEat);
		this.board.draw();
        this.head.shift();
        this.head[1] = newPosition;
	} else if (this.bodyLength == this.board.size.cols * this.board.size.rows)
        return "win";
    else
        return "loss";
    return null;
};

/**
 * Metoda ustawia kierunek pełzania węża
 * @param direction - kierunek pełzania ("left", "right", "up", "down")
 */
Snake.prototype.setDirection = function(direction) {
	this.newDirection = direction;
};

/**
 * Metoda na podstawie tego, jaki kierunek pełzania węża wybrał użytkownik, odpowiednio ustawia kierunek, w jakim wąż rzeczywiście ma iść (w nast. odświeżeniu planszy)
 */
Snake.prototype.refreshDirection = function() {
    this.directions.shift();
    if (
        (this.newDirection == "left" && this.directions[0] == "up") ||
        (this.newDirection == "up" && this.directions[0] == "left") ||
        (this.newDirection == "right" && this.directions[0] == "up") ||
        (this.newDirection == "up" && this.directions[0] == "right") ||
        (this.newDirection == "right" && this.directions[0] == "down") ||
        (this.newDirection == "down" && this.directions[0] == "right") ||
        (this.newDirection == "left" && this.directions[0] == "down") ||
        (this.newDirection == "down" && this.directions[0] == "left")
    )
        this.directions[1] = this.newDirection;
    else
        this.directions[1] = this.directions[0];
};

/**
 * Metoda pomocnicza, która ustawia pole na planszy jako zagięte ciało węża
 */
Snake.prototype.makeCorner = function() {
    if (this.directions[0] != this.directions[1]) {
        this.board.getField(this.head[1]).orientation = this.directions[0] + "-" + this.directions[1];
    }
};

/**
 * Metoda mówi, czy określona pozycja poruszenia się węża nie wywoła jego śmierci
 * @param position - pozycja węża {col, row}
 * @returns {boolean} - prawda, gdy ruch jest bezpieczny, fałszy, gdy wąż po takim ruchu zginie
 */
Snake.prototype.isGoodMove = function(position) {
	if (this.board.getField(position) === undefined)
		return false;
    else if (this.board.getField(position) instanceof ObstacleField)
        return false;
	else if (this.board.getField(position) instanceof SnakeField)
        return false;
    return true;
};

/**
 * Metoda wywołana, gdy wąż coś zje
 */
Snake.prototype.eat = function() {
    this.board.getField(this.head[1]).spriteType = "body";
};

/**
 * Metoda służąca za kurczenie się węża, gdy zje zatrute jabłko
 */
Snake.prototype.schrink = function() {
    for (var i = 0; this.bodyLength > 2 && i < 4; ++i)
        this.crawl();
};

/**
 * Przekształcanie podanej pozaycji pola na napis, mówiący jakie pożywienie jest pod danym polem
 * @param position - {row, col}, badana pozycja na planszy
 * @returns {*} - typ pożywienia pod określoną pozycją ("healthyApple", "poisonedApple", "mouse") bądź null, gdy nie ma tam jedzenia
 */
Snake.prototype.fieldToString = function(position) {
    var ref = this.board.getField(position);
    if (ref instanceof HealthyAppleField)
        return "healthyApple";
    else if (ref instanceof PoisonedAppleField)
        return "poisonedApple";
    else if (ref instanceof MouseField)
        return "mouse";
    else
        return null;
};

/**
 * Metoda, który kurczy węża o 1 pole, wraz z metodą eat pozwala na wrażenie pełzania węża po planszy
 */
Snake.prototype.crawl = function() {
    --this.bodyLength;
	this.board.foreach(this, function(field) {
		if (field instanceof SnakeField) {
			--field.part;
            if (field.part == 0)
                this.board.setField(field.position, EmptyField);
            else if (field.part == 1)
                field.spriteType = "tail";
            else if (field.part < this.bodyLength)
                field.spriteType = "body";
		}
	});
};
function Snake(board) {
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
    this.pointsHandler = $(".canvas-wrapper").find(".points");
    this.appleSound = $(".apple-sound");
    this.mouseSound = $(".mouse-sound");
}

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
    this.pointsHandler.text(this.points);
};

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

Snake.prototype.setDirection = function(direction) {
	this.newDirection = direction;
};

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

Snake.prototype.makeCorner = function() {
    if (this.directions[0] != this.directions[1]) {
        this.board.getField(this.head[1]).orientation = this.directions[0] + "-" + this.directions[1];
    }
};

Snake.prototype.isGoodMove = function(position) {
	if (this.board.getField(position) === undefined)
		return false;
    else if (this.board.getField(position) instanceof ObstacleField)
        return false;
	else if (this.board.getField(position) instanceof SnakeField)
        return false;
    return true;
};

Snake.prototype.eat = function() {
    this.board.getField(this.head[1]).spriteType = "body";
};

Snake.prototype.schrink = function() {
    for (var i = 0; this.bodyLength > 2 && i < 4; ++i)
        this.crawl();
};

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
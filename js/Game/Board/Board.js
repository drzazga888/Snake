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

Board.prototype.setField = function(position, fieldType, orientation, spriteType, part) {
    this.fields[position.row][position.col] = new fieldType(this.ctx, position, orientation, spriteType, part);
};

Board.prototype.getField = function(position) {
	if (this.fields[position.row] !== undefined)
		return this.fields[position.row][position.col];
	else
		return undefined;
};

Board.prototype.foreach = function(context, callback) {
	for (var row_i = 0; row_i < this.size.rows; row_i++) {
		for (var col_i = 0; col_i < this.size.cols; col_i++)
            callback.call(context, this.getField({
                col: col_i,
                row: row_i
            }));
	}
};

Board.prototype.draw = function() {
	this.foreach(this, function(field) {
		field.draw();
	});
};

Board.prototype.putObstacles = function() {
    var itemsToGenerate = this.obstacles;
    var lightBoard = JSON.parse(this.stringify());
    while (itemsToGenerate--)
        this.setField(Randomizer.getValidField(lightBoard, function(id){
            return id == 0;
        }), ObstacleField);
};

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
    if (this.getField(position) instanceof SnakeField && type != undefined)
        console.log("nic nie dodano!");
};

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
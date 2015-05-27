function LightBoard() {
}

LightBoard.mouseIdToOrientation = function(id) {
    switch (id) {
        case 6:
            return "right";
        case 7:
            return "left";
        case 8:
            return "up";
        case 9:
            return "down";
    }
};

LightBoard.prototype.initStats = function() {
    this.stats = {
        healthyApples: 0,
        poisonedApples: 0,
        mice: []
    };
};

LightBoard.prototype.refresh = function(stringifiedBoard) {
    this.board = JSON.parse(stringifiedBoard);
    this.generateStats();
};

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
                            orientation: LightBoard.mouseIdToOrientation(this.board[row_i][col_i])
                        });
                        break;
                }
            }
        }
    }
};
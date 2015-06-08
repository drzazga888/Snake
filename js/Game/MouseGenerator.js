/**
 * Obiekt ten analizuje czy mysz jest na planszy i w razie potrzeby dodaje ją bądź ją porusza / obraca
 * @param lightBoard - zredukowana plansza (dla WebWorkera) wraz z wygrenerowanymi statystykami
 * @constructor
 */
function MouseGenerator(lightBoard) {
    // 1) upewnienie się, czy mysz istnieje
    if (lightBoard.stats.mice.length == 0) {
        var position = Randomizer.getValidField(lightBoard.board, function(id) {
            return id == 0;
        });
        if (position)
            lightBoard.board[position.row][position.col] = Math.floor(Math.random() * 4) + 6;
        MouseGenerator.isDangerous = false;
        MouseGenerator.timeInFear = 0;
    } else {
        // 2) przyjrzenie się okolicy
        // na razie mamy tylko jedną mysz w nasej grze
        var mouse = lightBoard.stats.mice[0];
        var spotted = [];
        for (var row = 0; row < lightBoard.board.length; ++row) {
            for (var col = 0; col < lightBoard.board[row].length; ++col) {
                if (MouseGenerator.isFieldInViewArea(col, row, 3, mouse)) {
                    spotted.push( {
                        position: {
                            col: col,
                            row: row
                        },
                        fear: MouseGenerator.calculateFearLevel(lightBoard.board[row][col])
                    });
                }
            }
        }
        // 3) ocena sytuacji
        var generalFears = MouseGenerator.getFearsOfAreas(mouse, spotted, lightBoard.board.length);
        // this.postMessage("[DEBUG] " + JSON.stringify(generalFears));
        // 4) podjęcie działania
        if (MouseGenerator.isDangerous) {
            if (MouseGenerator.timeInFear == 15) {
                // mysz przestaje biec bo nie wie czy jeszcze trzeba
                MouseGenerator.isDangerous = false;
                MouseGenerator.timeInFear = 0;
                //this.postMessage("[DEBUG] mysz przestaje sie bac");
            } else {
                // akcje wykonywane gdy mysz się boi
                //this.postMessage("[DEBUG] mysz sie boi, " + MouseGenerator.timeInFear);
                var moved = MouseGenerator.move("forward", mouse, lightBoard.board);
                if (!moved)
                    MouseGenerator.move(Math.random() >= 0.5 ? "left" : "right", mouse, lightBoard.board);
                ++MouseGenerator.timeInFear;
            }
        } else {
            if (generalFears.left + generalFears.forward + generalFears.right > 0) {
                // mysz zaczyna się bać
                MouseGenerator.isDangerous = true;
                //this.postMessage("[DEBUG] mysz zaczyna sie bac");
                var notMoveThere = MouseGenerator.getTheMostDangerousMove(generalFears);
                switch (notMoveThere) {
                    case "left":
                        MouseGenerator.stampedeDir = "right";
                        break;
                    case "right":
                        MouseGenerator.stampedeDir = "left";
                        break;
                    case "up":
                        MouseGenerator.stampedeDir = "down";
                        break;
                    case "down":
                        MouseGenerator.stampedeDir = "up";
                        break;
                }
                // obrót w odpowiednią stronę do ucieczki
                lightBoard.board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId[MouseGenerator.stampedeDir];
            } else {
                // akcje wykonywane gdy nic myszy nie zagraża
                //this.postMessage("[DEBUG] mysz sie nie boi");
                switch (Math.floor(Math.random() * 6)) {
                    case 0:
                        MouseGenerator.move("forward", mouse, lightBoard.board);
                        break;
                    case 1:
                        MouseGenerator.move("left", mouse, lightBoard.board);
                        break;
                    case 2:
                        MouseGenerator.move("right", mouse, lightBoard.board);
                        break;
                }
            }
        }
    }
}

/**
 * Metoda pomocnicza, porusza myszą
 * @param how - sposób poruszenia mysz:
 *  - "forward" - pójście do przodu
 *  - "left" - skręt ciałem w lewo
 *  - "right" - skręt w prawo
 * @param mouse - obiekt, który zawiera pozycję myszy: {col, row}, oraz jej orientację (kierunek patrzenia)
 * @param board - plansza, na której metoda będzie działać
 * @returns {boolean} - true, jeśli mysz się poruszyła, w przeciwnym wypadku false
 */
MouseGenerator.move = function(how, mouse, board) {
    switch (how) {
        case "forward":
            //console.log("ide do przodu");
            var nextMove = {
                row: mouse.position.row,
                col: mouse.position.col
            };
            switch (mouse.orientation) {
                case "left":
                    --nextMove.col;
                    break;
                case "right":
                    ++nextMove.col;
                    break;
                case "up":
                    --nextMove.row;
                    break;
                case "down":
                    ++nextMove.row;
                    break;
            }
            if (board[nextMove.row] !== undefined && board[nextMove.row][nextMove.col] === 0) {
                //console.log("tutaj");
                board[mouse.position.row][mouse.position.col] = 0;
                board[nextMove.row][nextMove.col] = MouseGenerator.orientationToMouseId[mouse.orientation];
                return true;
            } else
                return false;
        case "left":
            switch (mouse.orientation) {
                case "left":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["down"];
                    return true;
                case "right":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["up"];
                    return true;
                case "up":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["left"];
                    return true;
                case "down":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["right"];
                    return true;
            }
            return false;
        case "right":
            switch (mouse.orientation) {
                case "left":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["up"];
                    return true;
                case "right":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["down"];
                    return true;
                case "up":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["right"];
                    return true;
                case "down":
                    board[mouse.position.row][mouse.position.col] = MouseGenerator.orientationToMouseId["left"];
                    return true;
            }
            return false;
    }
};

MouseGenerator.isDangerous = false;
MouseGenerator.timeInFear = 0;
MouseGenerator.stampedeDir = "right";

MouseGenerator.mouseIdToOrientation = {
    6: "right",
    7: "left",
    8: "up",
    9: "down"
};

MouseGenerator.orientationToMouseId = {
    "right": 6,
    "left": 7,
    "up": 8,
    "down": 9
};

/**
 * Metoda pomocnicza, na podstawie poziomu strachu w kierunku lewym, prawym i na wprost myszy wybiera kierunek, który jest najbardziej niebezpieczny
 * @param fears - obiekt, reprezentuje poziom strachu, zawiera pola left, right i forward, wartością ich jest właśnie ten poziom strachu
 * @returns {string|direction|*} - zwracany jest kierunek, który jest najbardziej niebezpieczny
 */
MouseGenerator.getTheMostDangerousMove = function(fears) {
    // konwertowanie elementów obiektu na tablicę
    var tab = [];
    for (var direction in fears)
        tab.push( {
            direction: direction,
            fear: fears[direction]
        });
    tab.sort(function(a, b) {
        return b.fear - a.fear;
    });
    return tab[0].direction;
};

/**
 * Metoda pomocnicza, która oblicza pola, które widzi mysz
 * @param x - nr kolumny pola
 * @param y - nr wiersza pola
 * @param r - promień zasięgu myszy
 * @param mouse - obiekt zawierający pozycję myszy i jej kierunek patrzenia
 * @returns {boolean} - true, jeśli podane pole znajduje się w zasięgu widzenia myszy, false w przeciwnym wypadku
 */
MouseGenerator.isFieldInViewArea = function(x, y, r, mouse) {
    var xOffset = 0;
    var yOffset = 0;
    switch (mouse.orientation) {
        case "right":
            xOffset = -r;
            break;
        case "left":
            xOffset = r;
            break;
        case "up":
            yOffset = r;
            break;
        case "down":
            yOffset = -r;
            break;
    }
    var xPart = x - mouse.position.col + xOffset;
    var yPart = y - mouse.position.row + yOffset;
    return (xPart * xPart) + (yPart * yPart) <= (r * r);
};

/**
 * Oblicza poziom strachu dla pola z planszy
 * @param id - pole naszej okrojonej planszy, czyli nr ID pola
 * @returns {number} - poziom strachu
 */
MouseGenerator.calculateFearLevel = function(id) {
    switch (id) {
        case 2:
            return 5;
        case 1:
            return 1;
    }
    return 0;
};

/**
 * Metoda pomocnicza, która oblicza poziom strachu w kierunku patrzenia myszy na wprost, na lewo i na prawo
 * @param mouse - mysz, czyli obiekt zawierający jej pozycję i orientację
 * @param spotted - tablica z pozycjami pól, które mysz zaobserwowała
 * @returns {{left, forward: number, right}} - poziomy strachu dla różnych kierunków
 */
MouseGenerator.getFearsOfAreas = function(mouse, spotted) {
    var totalSum = MouseGenerator.sumFears(spotted, function() {
        return true;
    });
    var functions = MouseGenerator.getDivisionalLinearFunctions(mouse);
    var leftSum = MouseGenerator.sumFears(spotted, function(pos) {
        return functions.leftSided.sider * pos.row >= functions.leftSided.sider * (functions.leftSided.a * pos.col + functions.leftSided.b);
    });
    var rightSum = MouseGenerator.sumFears(spotted, function(pos) {
        return functions.rightSided.sider * pos.row >= functions.rightSided.sider * (functions.rightSided.a * pos.col + functions.rightSided.b);
    });
    return {
        left: leftSum,
        forward: totalSum - leftSum - rightSum,
        right: rightSum
    };
};

/**
 * Metoda sumuje poziomy strachu
 * @param range - tablica z pozycjami pól, które mysz zaobserwowała
 * @param validator - funkcja, która zwraca true, gdy pole należy zliczyć, false w przeciwnym wypadku
 * @returns {number} - suma wsyzstkich strachów
 */
MouseGenerator.sumFears = function(range, validator) {
    var sumOfFears = 0;
    for (var i = 0; i < range.length; ++i) {
        if (validator(range[i].position))
            sumOfFears += range[i].fear;
    }
    return sumOfFears;
};

/**
 * Funkcja pomocnicza, zwraca prametry funkcji liniowych, które oddzielają zaobserwowane pola przez myszę na te, które są na lewo, na wprost i na prawo od niej
 * @param mouse - mysz, czyli obiekt zawierający jej pozycję i orientację
 * @returns {{leftSided: {}, rightSided: {}}} - obiekt z parametrami funkcji liniowych:
 *  - leftSided - dzieli obszar na lewo od myszy na obsza na wprost
 *  - rightSided - analogicznie, obszar na wprost i obszar na prawo,
 *  Każde takie pole zawiera pola:
 *  - a
 *  - b
 *  - sider
 *  ... które tworzą funkcję liniową: y * sider >= sider * (a * x + b), gdzie (x, y) - zmienne
 */
MouseGenerator.getDivisionalLinearFunctions = function(mouse) {
    var functions = {
        leftSided: {},
        rightSided: {}
    };
    switch (mouse.orientation) {
        case "right":
            functions.leftSided.a = -0.5;
            functions.leftSided.sider = -1;
            functions.rightSided.a = 0.5;
            functions.rightSided.sider = 1;
            break;
        case "left":
            functions.leftSided.a = -0.5;
            functions.leftSided.sider = 1;
            functions.rightSided.a = 0.5;
            functions.rightSided.sider = -1;
            break;
        case "up":
            functions.leftSided.a = 2;
            functions.leftSided.sider = 1;
            functions.rightSided.a = -2;
            functions.rightSided.sider = 1;
            break;
        case "down":
            functions.leftSided.a = 2;
            functions.leftSided.sider = -1;
            functions.rightSided.a = -2;
            functions.rightSided.sider = -1;
            break;
    }
    functions.leftSided.b = mouse.position.row - functions.leftSided.a * mouse.position.col;
    functions.rightSided.b = mouse.position.row - functions.rightSided.a * mouse.position.col;
    return functions;
};
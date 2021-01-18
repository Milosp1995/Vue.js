const app = Vue.createApp({
    data() {
        return {
            matrix: [                   //Declaring tic-tac-toe fields as matrix
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            playerSwitcher: 0, //Used to switch players
            picked: 'X', //For choosing a player sign at the beginning 
            disablePicker: false, 
            gameEnded: false
        }
    },
    computed: {
        rowChecker () {
           return this.matrix.reduce((acc, e) => {
                if(e.every(element => element == "X")) {
                    acc.hasWon += true;
                    acc.element = "X";
                    return acc;
                } else if (e.every(element => element == "O")) {
                    acc.hasWon += true;
                    acc.element = "O";
                    return acc;
                }
                return acc
            }, {hasWon: false, element: null, row: 0});
        },
        columnChecker () {
            var elementWon = {hasWon: false, element: null, column: null}
            for (var i = 0; i < this.matrix.length; i++) {
                elementWon.column = i; 
                if (
                    this.matrix[0][i] == "X" &&
                    this.matrix[1][i] == "X" && 
                    this.matrix[2][i] == "X"
                ) {
                    elementWon.hasWon += true;
                    elementWon.element = "X";
                    break;
                } else if (
                    this.matrix[0][i] == "O" &&
                    this.matrix[1][i] == "O" &&
                    this.matrix[2][i] == "O"
                ) {
                    elementWon.hasWon += true;
                    elementWon.element = "O";
                    break;
                }
            }
            return elementWon;
        },
        diagonalChecker () {
            var hasWon = false;
            var element = null;
            var diagonal = null;

            if (this.matrix[0][0] == "X" && this.matrix[1][1] == "X" && this.matrix[2][2] == "X") {
                hasWon = true;
                element = "X";
                diagonal = 0;
            } else if (this.matrix[0][0] == "O" && this.matrix[1][1] == "O" && this.matrix[2][2] == "O") {
                hasWon = true;
                element = "O";
                diagonal = 0;
            } else if (this.matrix[0][2] == "X" && this.matrix[1][1] == "X" && this.matrix[2][0] == "X") {
                hasWon = true;
                element = "X";
                diagonal = 1;
            } else if (this.matrix[0][2] == "O" && this.matrix[1][1] == "O" && this.matrix[2][0] == "O") {
                hasWon = true;
                element = "O";
                diagonal = 1;
            }

            return {hasWon: hasWon, element: element, diagonal: diagonal}
        }
    },
    methods: {
        setSign(x,y){
            if(this.matrix[x][y] == null && !this.gameEnded) {
                
                this.disablePicker = true;
                var currentInput = this.playerSwitcher % 2 === 0 ? this.picked : this.getAnotherVal(this.picked);
                this.matrix[x][y] = currentInput;
                this.playerSwitcher++;
            }

            if (this.rowChecker.hasWon || this.columnChecker.hasWon || this.diagonalChecker.hasWon) {
                this.gameEnded = true;
                var newGame = confirm("Game has Ended. Do you want to play a new one?");
            
                if (newGame) {
                     this.newGameInit();
                }
            }
        },
        getAnotherVal () {
            return this.picked == 'X' ? 'O' : 'X';
        },
        newGameInit () {
            this.matrix = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            this.playerSwitcher = 0;
            this.disablePicker = false;
            this.gameEnded = false;

        }
    },
    
});

app.mount("#app");
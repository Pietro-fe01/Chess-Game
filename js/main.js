const { createApp } = Vue

createApp({
    data() {
        return {
            chessCoords: [
                "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
                "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
                "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
                "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
                "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
                "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
                "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
                "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",
            ],
            initialGame: {
                'a8': 'black_rook',
                'b8': 'black_knight',
                'c8': 'black_bishop',
                'd8': 'black_queen',
                'e8': 'black_king',
                'f8': 'black_bishop',
                'g8': 'black_knight',
                'h8': 'black_rook',
                'a7': 'black_pawn',
                'b7': 'black_pawn',
                'c7': 'black_pawn',
                'd7': 'black_pawn',
                'e7': 'black_pawn',
                'f7': 'black_pawn',
                'g7': 'black_pawn',
                'h7': 'black_pawn',
                
                'a1': 'white_rook',
                'b1': 'white_knight',
                'c1': 'white_bishop',
                'd1': 'white_queen',
                'e1': 'white_king',
                'f1': 'white_bishop',
                'g1': 'white_knight',
                'h1': 'white_rook',
                'a2': 'white_pawn',
                'b2': 'white_pawn',
                'c2': 'white_pawn',
                'd2': 'white_pawn',
                'e2': 'white_pawn',
                'f2': 'white_pawn',
                'g2': 'white_pawn',
                'h2': 'white_pawn',
            },
            piecesImages: {
                'white_pawn': './img/WhitePawn.png',
                'white_rook': './img/WhiteRook.png',
                'white_knight': './img/WhiteKnight.png',
                'white_bishop': './img/WhiteBishop.png',
                'white_king': './img/WhiteKing.png',
                'white_queen': './img/WhiteQueen.png',
                'black_pawn': './img/BlackPawn.png',
                'black_rook': './img/BlackRook.png',
                'black_knight': './img/BlackKnight.png',
                'black_bishop': './img/BlackBishop.png',
                'black_king': './img/BlackKing.png',
                'black_queen': './img/BlackQueen.png',
            },
            isWhiteTurn: true,
        }
    },
    methods: {
        changeTurn(){
            if(this.isWhiteTurn){
                return this.isWhiteTurn = false;
            } else {
                return this.isWhiteTurn = true;
            }
        },
        cleanColors(){
            const allCells = document.querySelectorAll(".chess-cell");
            allCells.forEach(element => {
                if(element.classList.contains('green-cell')){
                    element.classList.remove('green-cell')
                }
            });
        },
        selectPieces(event){
            altImage = event.path[0].alt;
            cellId = event.path[1].id;
            console.log(cellId)
            const cell = document.getElementById(cellId);
            
            this.cleanColors();

            if(this.isWhiteTurn && altImage.includes("white_") || !this.isWhiteTurn && altImage.includes("black_")){
                cell.classList.add('green-cell');
                altImage.includes('pawn') ? this.pawnsMoving(altImage, cellId) : '';
            }
        },
        pawnsMoving(altImage, cellId){
            // Prendendo l'id della casella selezionata calcolo uno o due caselle del pedone
            let array = cellId.split("")
            let mov1, mov2;
            if(altImage.includes('white_pawn')){
                mov1 = array[0] + (+array[1] + 1);
                mov2 = array[0] + (+array[1] + 2);
            } else if (altImage.includes('black_pawn')){
                mov1 = array[0] + (+array[1] - 1);
                mov2 = array[0] + (+array[1] - 2);
            };

            // Logica del primo passo del pedone
            let nextCell = document.getElementById(mov1);
            nextCell.classList.add('green-cell');
            nextCell.addEventListener("click", () => {
                document.querySelector(`#${cellId} img`).remove();
                let newElm = document.createElement("img");
                if(this.isWhiteTurn){
                    newElm.setAttribute("src", './img/WhitePawn.png');
                } else {
                    newElm.setAttribute("src", './img/BlackPawn.png');
                }
                nextCell.append(newElm);
                this.changeTurn();
                this.cleanColors();
            });

            // Logica del secondo passo del pedone
            let nextCellTwo = document.getElementById(mov2);
            nextCellTwo.classList.add('green-cell');
            nextCellTwo.addEventListener("click", () => {
                document.querySelector(`#${cellId} img`).remove();
                let newElm = document.createElement("img");
                if(this.isWhiteTurn){
                    newElm.setAttribute("src", './img/WhitePawn.png');
                } else {
                    newElm.setAttribute("src", './img/BlackPawn.png');
                }
                nextCellTwo.append(newElm);
                this.changeTurn();
                this.cleanColors();
            });
        }
    }
}).mount('#app')
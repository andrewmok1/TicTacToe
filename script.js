//Add event listeners for user input screen (intro page)
const loadingScreen = (function() {
    const img = document.getElementById("player2images");
    const startmodalEl = document.getElementById("modalForm");
    const startbuttonEl = document.getElementById("startButton");
    startbuttonEl.addEventListener("click", startGame);
    function startGame () {
        startmodalEl.style.display = "none";
        startbuttonEl.addEventListener("click", gameboardModule);
    }
})();

//Add event listeners for end result screen
const endScreen = (function() {
    const modalEl = document.getElementById("modalEl");
    const okButtonEl = document.getElementById("okButtonEl");
    const displayTurn = document.querySelector(".displayTurn");
    const titleContainer = document.querySelector(".titleContainer");
    const resetButton = document.getElementById("resetButton");
    const returnButton = document.getElementById("returnButton");
    const playArea = document.querySelector(".playArea");
    okButtonEl.addEventListener("click", okButton);
    function okButton () {
       modalEl.style.display = "none";
       titleContainer.style.display = "flex";
       displayTurn.style.display = "flex";
       returnButton.style.display = "block";
       resetButton.style.display = "block";
       playArea.style.display = "grid";
    }
})();
  

//GameBoard Module 
//Set variables equal to a string. The string needs to contain letter x and o based on how I created the name for my circles and x's in CSS
//Have a winning logic for tic tac toe (based on index)
//connected HTML to JS, selected all "data-cell" divs to obtain all data, which allowed the marks to be obtained from CSS
//For each square, there will be an event listener and only one square can be filled out and clicked once
const gameboardModule = (function() {
    const X_Class = "x";
    const O_Class = "o";
    let circleTurn = false;
    const winArrays = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    //Add event listeners for resetting whole board and taking user to the user input screen to change settings. 
    const squares = document.querySelectorAll("[data-cell]");
    squares.forEach(square => {
        square.addEventListener("click",handleClick,{once:true})
    })
    const resetButton = document.getElementById("resetButton");
    const returnButton = document.getElementById("returnButton");
    const displayTurn = document.querySelector(".displayTurn");
    const results = document.getElementById("modalscoreEl");
    const startmodalEl = document.getElementById("modalForm");
    const startbuttonEl = document.getElementById("startButton");
    const modalEl = document.getElementById("modalEl");
    const titleContainer = document.querySelector(".titleContainer");
    const playArea = document.querySelector(".playArea");
    resetButton.addEventListener("click", resetBoard);
    returnButton.addEventListener("click", newBoard);
    function resetBoard () {
        squares.forEach(square => {
            circleTurn = false;
            displayTurn.innerHTML = "PLAYER 1's TURN";
            square.classList.remove(X_Class);
            square.classList.remove(O_Class);
            square.addEventListener("click",handleClick,{once:true});
    })
    }

    function newBoard () {
        squares.forEach(square => {
            circleTurn = false;
            displayTurn.innerHTML = "PLAYER 1's TURN";
            square.classList.remove(X_Class);
            square.classList.remove(O_Class); 
            square.addEventListener("click",handleClick,{once:true});
            startmodalEl.style.display = "flex";
            startbuttonEl.addEventListener("click", gameboardModule);
            startbuttonEl.style.display = "block";
        })
    }

    //This function targets a specified square
    //If it is circle's turn, return to circle class; if not, return to x class.
    //placeMark function adds the current class (allowed marks to be placed on the board) and swapTurns allow each click to swap between circle and x
    //Set winning and draw functions    
    function handleClick (e) {    
        const square = e.target;
        const currentClass = circleTurn ? O_Class : X_Class;
        placeMark(square,currentClass);
        swapTurns();
        if (checkWin(currentClass)) {
            modalEl.style.display = "block";
            titleContainer.style.display = "none";
            displayTurn.style.display = "none";
            returnButton.style.display = "none";
            resetButton.style.display = "none";
            playArea.style.display = "none";
            results.innerHTML =  `${!circleTurn ? "O's" : "X's"} Wins!`;
            return resetBoard();
        }
            else if (draw()) {
            modalEl.style.display = "block";
            titleContainer.style.display = "none"
            displayTurn.style.display = "none";
            returnButton.style.display = "none";
            resetButton.style.display = "none";
            playArea.style.display = "none";
            results.innerHTML = "Draw!";
            return resetBoard();
            } 
    }

    function placeMark (square,currentClass) {
        square.classList.add(currentClass);
    }

    function swapTurns () { 
        circleTurn = !circleTurn;
        if (!circleTurn) {
            displayTurn.innerHTML = "PLAYER 1's TURN";
        }
            else {
                displayTurn.innerHTML = "PLAYER 2's TURN";
            }
    }

    //Goes through the winArray combination for each mark (X and O)
    function checkWin (currentClass) {
        return winArrays.some(combination => {
            return combination.every(index => {
                return squares[index].classList.contains(currentClass);
            })
        })
    }

    //If board is filled with Xs or Os, and no winner is determined.
    function draw () {
        return [...squares].every(square => {
            return square.classList.contains(X_Class) || square.classList.contains(O_Class);
        })
    }
})();

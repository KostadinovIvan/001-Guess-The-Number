const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let petersNum = 0;
let shots = 0;
let difficultyLevel = "";
let guess = 0;

let firstTime = true;
let playAgain = false;

let playedGames = 0;
let peterScores = 0;
let playerScores = 0;
let top = 100;
let bottom = 0;

let peterWinScores = 0;
let playerWinScores = 0;

function start() {
    if (firstTime) {
        console.log("------------------------------");
        console.log(`Hey there! \nI'm Peter the sly snake, wanna play a game of guess my number? \nI promise it'll be slithering with fun!`);
        console.log("------------------------------");
    }
    readline.question("[Y]es: or [N]o: ", str => {
        let agree = str.toLowerCase();

        if (agree === "y" || agree === "yes") {
            console.log("------------------------------");
            console.log("OK! Lets GO!");
            top = 100;
            bottom = 0;

            petersNum = Math.floor(Math.random() * 100);
            firstTime = false;
            chooseGameType();

        } else if (agree === "n" || agree === "no") {
            console.log("------------------------------");
            console.log(`No problem, slither back anytime for a game of guess my number. \nHave a good one!`);
            console.log("------------------------------");
            console.log(`${playedGames} ${playedGames > 1 ? "Games" : "Game"} Played \nYour Scores: ${playerScores} \nMy Scores: ${peterScores}`);
            console.log("------------------------------");
            return readline.close();
        } else {
            console.log("------------------------------");
            console.log("Invalid input! Try again");
            start();
        }
    });
}
start();

function chooseGameType() {
    console.log(`Who's gonna guess the number`);
    readline.question("The [S]nake or The [P]layer: ", str => {
        let playerChoise = str.toLowerCase();

        if (playerChoise === "s" || playerChoise === "snake") {
            console.log("------------------------------");
            console.log("Prepare to be amazed");
            playedGames++
            ready();
        } else if (playerChoise === "p" || playerChoise === "player") {
            console.log("------------------------------");
            console.log("I do hope to give you the slipperiest of challenges, my friend!");
            if (playAgain) {
                console.log(`${playedGames} ${playedGames > 1 ? "Games" : "Game"} Played \nYour Scores: ${playerScores} \nMy Scores: ${peterScores}`);
                console.log("------------------------------");
            }
            playedGames++
            setDifficulty();
        } else {
            console.log("------------------------------");
            console.log("Invalid input! Try again");
            chooseGameType();
        }
    });
}

function setDifficulty() {
    readline.question("Choose difficulty: [E]asy, [M]edium, [H]ard: ", str => {
        difficultyLevel = str.toLowerCase();

        switch (difficultyLevel) {
            case "e":
            case "easy":
                shots = 10;
                difficultyLevel = "Easy";
                peterWinScores = 20;
                playerWinScores = 1;
                console.log("------------------------------");
                console.log(`What's easy for you, is a tricky challenge for me. \nSo if you're lucky enough to beat me, you'll earn a mere point. \nBut if I outsmart you, I'll slither away with 20 pointss`);
                playerGuessTheNum();
                break;
            case "m":
            case "medium":
                shots = 7;
                difficultyLevel = "Medium";
                peterWinScores = 5;
                playerWinScores = 5;
                console.log("------------------------------");
                console.log(`It's a fair game. \nIf you're skilled enough to beat me, you'll earn 5 points, \nso if I slither away victorious, I'll claim the same amount.`);
                playerGuessTheNum();
                break;
            case "h":
            case "hard":
                shots = 5;
                difficultyLevel = "Hard";
                peterWinScores = 1;
                playerWinScores = 20;
                console.log("------------------------------");
                console.log(`It's easy for me to beat you in this game, \nbut if I don't manage to outsmart you, you'll earn 20 points. \nOf course, to be fair, if I win, I'll only take 1 point.`);
                playerGuessTheNum();
                break;
            default:
                console.log("Invalid input! Try again");
                setDifficulty();
                break;
        }
    });
}

function playerGuessTheNum() {
    if (shots > 0) {
        console.log(`${difficultyLevel} mode. You have ${shots} attempts!`);
        console.log("------------------------------");

        readline.question(`Guess the number (${bottom} - ${top}): `, number => {
            guess = Number(number);

            if (guess <= top && guess >= bottom) {
                if (guess === petersNum) {
                    playerScores += playerWinScores;
                    playAgain = true;
                    console.log("You guess it!");
                    console.log("------------------------------");
                    start();
                } else if (guess > petersNum) {
                    console.log("Too High!");
                    top = guess;
                    shots--;
                    playerGuessTheNum();
                } else if (guess < petersNum) {
                    console.log("Too Low!");
                    bottom = guess;
                    shots--;
                    playerGuessTheNum();
                }
            } else {
                console.log("Invalid input! Try again");
                playerGuessTheNum();
            }
        });
    } else {
        peterScores += peterWinScores;
        playAgain = true;
        console.log("------------------------------");
        console.log(`My number was ${petersNum}. You loose! Good luck next time!`);
        console.log("------------------------------");
        console.log("Wanna play again?");
        start();
    }
}

function peterGuessTheNum() {

    readline.question("Too [H]igh / Too [L]ow / [Y]es you [G]uess it ", str => {
        let directions = str.toLowerCase();

        if (directions === "too high" || directions === "high" || directions === "h") {
            top = guess;
            if (top - bottom <= 1) {
                console.log(`There Is No Such Number!`);
                console.log("------------------------------");
                console.log("Wanna play again?");
                start();
            }
            if (top - bottom !== 2) {
                guess = Math.floor(Math.random() * (top - bottom - 1)) + bottom + 1;
                console.log("------------------------------");
                console.log(`So your number lies within the range of ${bottom !== -1 ? bottom: 0} and ${top !== 101 ? top : 100}!`);
                console.log(`Is it ${guess}`);
                console.log("------------------------------");
                peterGuessTheNum();
            } else {
                console.log("------------------------------");
                console.log(`Your number is ${top - 1}.`);
                console.log("------------------------------");
                console.log("Wanna play again?");
                start();
            }
        } else if (directions === "too low" || directions === "low" || directions === "l") {
            bottom = guess;
            if (top - bottom <= 1) {
                console.log(`There Is No Such Number!`);
                console.log("------------------------------");
                console.log("Wanna play again?");
                playAgain = false;
                start();

            }
            if (top - bottom !== 2) {
                guess = Math.floor(Math.random() * (top - bottom - 1)) + bottom + 1;
                console.log("------------------------------");
                console.log(`So your number lies within the range of ${bottom !== -1 ? bottom: 0} and ${top !== 101 ? top : 100}!`);
                console.log(`Is it ${guess}`);
                console.log("------------------------------");
                peterGuessTheNum();
            } else {
                console.log("------------------------------");
                console.log(`Your number is ${top - 1}.`);
                console.log("------------------------------");
                console.log("Wanna play again?");
                playAgain = false;

                start();
            }

        } else if (directions === "you guess it" || directions === "guess" || directions === "g" || directions === "y" || directions === "yes") {
            console.log("------------------------------");
            console.log("Wanna play again?");
            start();

        } else {
            console.log("------------------------------");
            console.log(`Invalid input! Try again! Is your number ${guess}?`);
            peterGuessTheNum();
        }
    });
}

function ready() {
    console.log(`This game is for fun. I bet I can guess your number in less than 10 tries, \nbut I don't want to get points for it.`);
    readline.question(`Thing of a number an press [R]eady: `, str => {
        let agree = str.toLowerCase();

        if (agree === "r" || agree === "ready") {
            console.log("------------------------------");
            console.log(`Is it 50`);
            console.log("------------------------------");

            top = 101;
            bottom = -1;
            guess = 50;
            peterGuessTheNum();

        } else {
            console.log("------------------------------");
            console.log("Invalid input! Try again");
            ready();
        }
    });
}
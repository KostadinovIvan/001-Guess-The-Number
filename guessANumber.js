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

let peterWinScores = 0;
let playerWinScores = 0;

function start() {
    if (firstTime) {
        console.log("------------------------------");
        console.log(`Hey there! \nI'm Peter the sly snake, wanna play a game of guess my number? \nI promise it'll be slithering with fun!`);
        console.log("------------------------------");
        firstTime = false;
    }

    readline.question("[Y]es: or [N]o: ", str => {
        let agree = str.toLowerCase();

        if (agree === "y" || agree === "yes") {
            console.log("------------------------------");
            console.log("OK! Lets GO!");
            if (playAgain) {
                console.log(`${playedGames} ${playedGames > 1 ? "Games": "Game"} Played \nYour Scores: ${playerScores} \nMy Scores: ${peterScores}`);
                console.log("------------------------------");
            }
            petersNum = Math.floor(Math.random() * 100);
            setDifficulty();
        } else if (agree === "n" || agree === "no") {
            console.log("------------------------------");
            console.log(`No problem, slither back anytime for a game of guess my number. \nHave a good one!`);
            console.log("------------------------------");
            console.log(`${playedGames} ${playedGames > 1 ? "Games": "Game"} Played \nYour Scores: ${playerScores} \nMy Scores: ${peterScores}`);
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

function setDifficulty() {
    readline.question("Choose difficulty: [E]asy, [M]edium, [H]ard: ", str => {
        difficultyLevel = str.toLowerCase();

        switch (difficultyLevel) {
            case "e":
            case "easy":
                shots = 20;
                difficultyLevel = "Easy";
                peterWinScores = 20;
                playerWinScores = 1;
                console.log("------------------------------");
                console.log(`What's easy for you, is a tricky challenge for me. \nSo if you're lucky enough to beat me, you'll earn a mere point. \nBut if I outsmart you, I'll slither away with 20 pointss`);
                guessNum();
                break;
            case "m":
            case "medium":
                shots = 10;
                difficultyLevel = "Medium";
                peterWinScores = 5;
                playerWinScores = 5;
                console.log("------------------------------");
                console.log(`It's a fair game. \nIf you're skilled enough to beat me, you'll earn 5 points, \nso if I slither away victorious, I'll claim the same amount.`);
                guessNum();
                break;
            case "h":
            case "hard":
                shots = 5;
                difficultyLevel = "Hard";
                peterWinScores = 1;
                playerWinScores = 20;
                console.log("------------------------------");
                console.log(`It's easy for me to beat you in this game, \nbut if I don't manage to outsmart you, you'll earn 20 points. \nOf course, to be fair, if I win, I'll only take 1 point.`);
                guessNum();
                break;
            default:
                console.log("Invalid input! Try again");
                setDifficulty();
                break;
        }
    });
}

function guessNum() {
    if (shots > 0) {
        console.log(`${difficultyLevel} mode. You have ${shots} attempts!`);
        console.log("------------------------------");

        readline.question(`Guess the number (0 - 100): `, number => {
            guess = Number(number);

            if (guess <= 100 && guess >= 0) {
                if (guess === petersNum) {
                    playedGames++;
                    playerScores += playerWinScores;
                    playAgain = true;
                    console.log("You guess it!");
                    console.log("------------------------------");
                    start();
                } else if (guess > petersNum) {
                    console.log("Too High!");
                    shots--;
                    guessNum();
                } else if (guess < petersNum) {
                    console.log("Too Low!");
                    shots--;
                    guessNum();
                }
            } else {
                console.log("Invalid input! Try again");
                guessNum();
            }
        });
    } else {
        playedGames++;
        peterScores += peterWinScores;
        playAgain = true;
        console.log("------------------------------");
        console.log(`My number was ${petersNum}. You loose! Good luck next time!`);
        console.log("------------------------------");
        console.log("Wanna play again?");
        start();
    }
}
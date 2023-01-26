const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let CPUNum = Math.floor(Math.random() * 100)
let shots = 0;
let difficultyLevel = "";

function setDifficulty() {
    readline.question("Choose difficulty: [E]asy, [M]edium, [H]ard: ", str => {
        difficultyLevel = str.toLowerCase();

        switch (difficultyLevel) {
            case "e":
            case "easy":
                shots = 20;
                difficultyLevel = "Easy";
                guessNum();
                break;
            case "m":
            case "medium":
                shots = 10;
                difficultyLevel = "Medium";
                guessNum();
                break;
            case "h":
            case "hard":
                shots = 5;
                difficultyLevel = "Hard";
                guessNum();
                break;
            default:
                console.log("Invalid input! Try again");
                setDifficulty();
                break;
        }
    });
}
setDifficulty();

function guessNum() {
    if (shots > 0) {
        console.log(`${difficultyLevel} mode. You have ${shots} attempts!`);
        console.log("---------------------------");

        readline.question(`Guess the number (0 - 100): `, number => {
            let guess = Number(number);
            
            if (guess <= 100 && guess >= 0) {
                if (guess === CPUNum) {
                    console.log("You guess it!");
                    return readline.close();
                } else if (guess > CPUNum) {
                    console.log("---------------------------");
                    console.log("Too High!");
                    shots--
                    guessNum();
                } else if (guess < CPUNum) {
                    console.log("---------------------------");
                    console.log("Too Low!");
                    shots--
                    guessNum();
                }
            } else {
                console.log("Invalid input! Try again");
                guessNum();
            }
        });
    } else {
        console.log(`My number was ${CPUNum}. You loose! Good luck next time!`);
        return readline.close();
    }
}
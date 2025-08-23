const wordList = {
easy: ["cat", "dog", "sun", "box", "red", "cup", "ball"],
medium: ["apple", "banana", "cherry", "dragon", "flower", "yellow", "cat", "dog", "sun", "box", "red",
     "cup", "ball", "elephant", "pineapple", "difficult", "javascript", "mountain", "computer"],
};

let currentWord = "";
let score = 0;
let missed = 0;
let time = 30;
let timer;
let gameStarted= false;
let currentDifficulty = "medium";

const wordDisplay =
document.getElementById("word-display");
const wordInput =
document.getElementById("word-input");
const timeDisplay =
document.getElementById("time");
const scoreDisplay =
document.getElementById("score");
const missedDisplay =
document.getElementById("missed");
const startButton =
document.getElementById("start-button");
const gameOverScreen =
document.getElementById("game-over");
const finalScore=
document.getElementById("final-score");

const missedWords =
document.getElementById("missed-words");
const restartButton =
document.getElementById("restart-button");

const correctSound =
document.getElementById("correct-sound");
const wrongSound =
document.getElementById("wrong-sound");
const difficultSelect =
document.getElementById("difficult");

const highScoreDisplay  =
document.getElementById("high-score");

let highScore = 
localStorage.getItem("highScore") || 0;

highScoreDisplay.textContent = highScore;
highScoreDisplay.style.color = "limegreen";
highScoreDisplay.style.fontSize = "20px";

function startGame() {
gameStarted = true;
score = 0;
missed = 0;
time = 30;

wordInput.disabled = false;
wordInput.value = "";
wordInput.focus();

gameOverScreen.classList.add("hidden");

updateDisplays();
nextWord();

clearInterval(timer);
timer = setInterval(() => {
time--;
timeDisplay.textContent = time;
if (time <=0) {
endGame();
}
}, currentDifficulty === "easy" ? 1200 : currentDifficulty === "medium" ? 1000 : 700);
}

function nextWord() {
const words =
wordList[currentDifficulty];
currentWord =
words[Math.floor(Math.random() *
words.length)];
wordDisplay.textContent = currentWord;
wordDisplay.style.color = "limegreen";
wordDisplay.style.fontSize = "35px"
wordDisplay.style.fontWeight = "bold";
wordInput.value = "";
}

function checkWord() {
if (!gameStarted) return;

if
(wordInput.value.trim(). toLowerCase() === currentWord.toLowerCase()) {
score++;
correctSound.play();
nextWord();
}
else {
missed++;
wrongSound.play();
missedDisplay.textContent = missed;
wordInput.value = "";
}

updateDisplays();
}

function updateDisplays() {
scoreDisplay.textContent = score;
scoreDisplay.style.color = "limegreen";
missedDisplay.textContent = missed;
missedDisplay.style.color = "#d40000";
timeDisplay.textContent = time;
timeDisplay.style.color = "#d40000";
}

function endGame() {
clearInterval(timer);
gameActive = false;
wordInput.disabled = true;

gameOverScreen.classList.remove("hidden");
finalScore.textContent = score;
finalScore.style.color = "limegreen";
missedWords.textContent = missed;
missedWords.style.color = "#d40000"

if (score > highScore) {
highScore = score;
localStorage.setItem("highScore", score);
highScoreDisplay.textContent = score;
}
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
wordInput.addEventListener("change", checkWord);


const currentWord = document.querySelector("#current-word");
const wordInput = document.querySelector("#word-input");
const messageDisplay = document.querySelector("#message");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");

const GAME_TIME = 7; //변하지 않는 변수를 선언할때 대문자로 선언.

const API_URL = "https://random-word-api.herokuapp.com/word?number=100";


let words = ["Banana", " apple", "happy", "mongmong", "sky", "house"];
let score = 0;
let time = 0;
let timeInterval; //초기화 선언
let isPlaying = false;
let isReady = false;


init(); //준비를 위한 초기화

// function init() {
//     const res = fetch(API_URL).then(res => res.json()).then((data) => words = data); //화살표 함수써서 생략함, 아래 async와 동일
// };
//async await
async function init() {
    const res = await fetch(API_URL);
    const data = await res.json();
    words = data.filter(item => item.length < 7 );
    isReady =true;
};

wordInput.addEventListener("input", e => {
    const typeText = e.target.value;
    const currentText = currentWord.innerText;
    console.log(typeText == currentText);
    if (typeText.toUpperCase() === currentText.toUpperCase() && isReady) {
        // console.log("같습니다!");
        addScore();
        setNewWord();
    }
});

//게임종료
function gameOver() {
    isPlaying = false;
    clearInterval(timeInterval);
    timeInterval = null; //초기화
    messageDisplay.innerText = "Game Over"
    score = 0;
}
//시간 카운트다운
function countDown() {
    time = time - 1;
    timeDisplay.innerText = time;
    if (time === 0) {
        gameOver();
    }
}

function setNewWord() {
    time = GAME_TIME; //??
    wordInput.value = "";
    message.innerText = "Now Playing!";
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord.innerText = words[randomIndex];

    if (!isPlaying) {
        timeInterval = setInterval(countDown, 1000);
        isPlaying = true;
    }
}

function addScore() {
    score = score + 1;
    scoreDisplay.innerText = score;
}


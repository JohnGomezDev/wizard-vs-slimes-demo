const gravity = .5;
let counter = 0;
let lives = 3;
let beenShot = false;
let collectedCoins = 0;
let score = 0;

// * Screens
const initScreen = $('#init');
const gameScreen = $('#game');
const instructScreen = $('.instruct');
const winScreen = $('#win-pop');
const warningScreen = $('#warning');

//  * Btns
const playBtn = $('#play-btn');
const retryBtn = $('#retry-btn');
const instructBtn = $('#instruct-btn');
const fullScreenBtn = $('#full-btn');
const backBtn = $('#init .exit');
const exitBtn = $('#win-pop .exit');

// * Texts
const totalScore = $('#total-score');

// * Show warning when portrait orientation
if(screen.orientation.angle === 0 && window.innerWidth < 1000) {
    warningScreen.css('display', 'flex');
}

screen.orientation.addEventListener('change', function({ currentTarget }) {
    if(currentTarget.angle === 0) {
        warningScreen.css('display', 'flex');
    } else {
        warningScreen.hide();
    }
});
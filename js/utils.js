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

//  * Btns
const playBtn = $('#play-btn');
const retryBtn = $('#retry-btn');
const instructBtn = $('#instruct-btn');
const fullScreenBtn = $('#full-btn');
const backBtn = $('#init .exit');
const exitBtn = $('#win-pop .exit');

// * Texts
const totalScore = $('#total-score');
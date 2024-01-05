// ? Canvas creation
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 700;
// ? -----------------------------

// * Enable/disable full screen
fullScreenBtn.click(function() {
    const btn = $(this);

    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        closeFullscreen();
        btn.removeClass('normal-full');
        btn.addClass('open-full');
    } else {
        openFullscreen();
        btn.removeClass('open-full');
        btn.addClass('normal-full');
    }
});

// * Show instructions
instructBtn.click(() => {
    instructBtn.hide();
    playBtn.hide();
    fullScreenBtn.hide();

    instructScreen.show();
});

backBtn.click(() => {
    instructScreen.hide();

    instructBtn.show();
    playBtn.show();
    fullScreenBtn.show();
});

// * Init game
playBtn.click(() => {
    initScreen.hide();
    gameScreen.show();

    init();
    animate();
});

// * Retry game
retryBtn.click(() => {
    winScreen.hide();

    totalScore.text(0);
    collectedCoins = 0;
    score = 0;

    init();
});

// * Exit to menu
exitBtn.click(() => location.reload());

// * Instantiate classed
let player = new Player();
let loseScreen = new LoseScreen();
let gameOverScreen = new GameOverScreen();
let enemies = [];
let platforms = [];
let genericObjects = [];
let warnings = [];
let staticObjects = [];
let items = [];
let bullets = [];

let scrollOfset = 0;

// * Init function
function init() {
    longPlatformSprite = createSprite('./assets/images/platform.png');

    // * Instantiate classed
    player = new Player();
    loseScreen = new LoseScreen();
    gameOverScreen = new GameOverScreen();

    enemies = [
        new LinearEnemy({ x: 700, y: 380, vx: -1.5, spawnPoint: 0, type: 'green' }),
        new LinearEnemy({ x: 1800, y: 480, vx: -1.5, spawnPoint: 396, type: 'green' }),
        new WalkingEnemy({ x: 2800, y: 400, vx: 3, orientation: 'left', limit: 300, spawnPoint: 1000, type: 'green' }),
        new WalkingEnemy({ x: 1800, y: 400, vx: 2, orientation: 'right', limit: 500, spawnPoint: 600, type: 'green' }),
        new WalkingEnemy({ x: 4400, y: 400, vx: 3, orientation: 'right', limit: 100, spawnPoint: 3000, type: 'green' }),
        new LinearEnemy({ x: 4800, y: 480, vx: -1.5, spawnPoint: 3000, type: 'green' }),
        new WalkingEnemy({ x: 6200, y: 480, vx: 8, orientation: 'right', limit: 40, spawnPoint: 5000, type: 'red' }),
        new WalkingEnemy({ x: 6750, y: 380, vx: 8, orientation: 'right', limit: 40, spawnPoint: 5000, type: 'red' }),
        new LinearEnemy({ x: 7800, y: 380, vx: -1.5, spawnPoint: 6500, type: 'green' }),
        new LinearEnemy({ x: 8300, y: 380, vx: -1.5, spawnPoint: 6800, type: 'green' }),
        new WalkingEnemy({ x: 8300, y: 380, vx: 8, orientation: 'right', limit: 40, spawnPoint: 6700, type: 'red' }),
    ];

    platforms = [
        new Platform({
            x: 600,
            y: 450,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 1800,
            y: 450,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 2150,
            y: 450,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 2500,
            y: 450,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 3050,
            y: 350,
            image: smallPlatformSprite
        }),
        new Platform({
            x: 3400,
            y: 350,
            image: smallPlatformSprite
        }),
        new Platform({
            x: 3750,
            y: 350,
            image: smallPlatformSprite
        }),
        new Platform({
            x: 4400,
            y: 450,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 5500,
            y: 450,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 0,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 350,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 1230,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 1600,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 3900,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 4250,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 4600,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 4950,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 5300,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 5650,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 6200,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 6700,
            y: 500,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 7280,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 7600,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 8300,
            y: 450,
            image: tallPlatformSprite
        }),
        new Platform({
            x: 7950,
            y: 600,
            image: longPlatformSprite
        }),
        new Platform({
            x: 8300,
            y: 600,
            image: longPlatformSprite
        }),
    ];

    genericObjects = [
        new GenericObject({
            x: 0,
            y: 0,
            image: createSprite('./assets/images/clouds.png'),
            speed: .1
        }),
        new GenericObject({
            x: -1,
            y: 0,
            image: createSprite('./assets/images/mountains.png'),
            speed: .2
        }),
        new GenericObject({
            x: -1,
            y: 0,
            image: createSprite('./assets/images/land-1.png'),
            speed: .3
        }),
        new GenericObject({
            x: -1,
            y: 0,
            image: createSprite('./assets/images/land-2.png'),
            speed: .4
        })
    ];

    warnings = [
        new Warning({
            x: 600,
            y: 500,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/up-arrow.png'),
            speed: 5
        }),
        new Warning({
            x: 1800,
            y: 500,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/up-arrow.png'),
            speed: 5
        }),
        new Warning({
            x: 4550,
            y: 500,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/right-arrow.png'),
            speed: 5
        }),
        new Warning({
            x: 5620,
            y: 500,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/question.png'),
            speed: 5
        }),
        new Warning({
            x: 5670,
            y: 500,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/up-arrow.png'),
            speed: 5
        }),
        new Warning({
            x: 6350,
            y: 400,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/skull.png'),
            speed: 5
        }),
        new Warning({
            x: 6850,
            y: 300,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/skull.png'),
            speed: 5
        }),
        new Warning({
            x: 8550,
            y: 500,
            width: 90,
            height: 90,
            image: createSprite('./assets/images/end.png'),
            speed: 5
        }),
    ];

    staticObjects = [
        new StaticObject({
            x: -1,
            y: -1,
            image: createSprite('./assets/images/background.png')
        })
    ];

    uiObjects = [
        new StaticObject({
            x: canvas.width - 120,
            y: 50,
            image: createSprite('./assets/images/coinsCounter.png')
        }),
        new StaticObject({
            x: 60,
            y: 50,
            image: createSprite('./assets/images/scoreCounter.png')
        }),
    ];

    items = [
        new Item({ id: 1, type: 'coins', x: 650, y: 380.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 2, type: 'coins', x: 770, y: 380.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 3, type: 'coins', x: 900, y: 380.5, width: 45, height: 35, limitFrames: 7 }), ,
        new Item({ id: 4, type: 'coins', x: 1900, y: 530.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 5, type: 'coins', x: 2100, y: 380.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 6, type: 'coins', x: 2300, y: 380.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 7, type: 'coins', x: 2500, y: 380.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 8, type: 'coins', x: 3100, y: 280.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 9, type: 'coins', x: 3450, y: 280.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 10, type: 'coins', x: 3800, y: 280.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 11, type: 'coins', x: 4500, y: 380.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 12, type: 'coins', x: 4640, y: 380.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 13, type: 'coins', x: 5100, y: 530.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 14, type: 'coins', x: 5200, y: 530.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 0, type: 'potion', x: 5660, y: 380.5, width: 60, height: 50, limitFrames: 7 }),
        new Item({ id: 13, type: 'coins', x: 6300, y: 530.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 14, type: 'coins', x: 6440, y: 530.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 13, type: 'coins', x: 6800, y: 430.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 14, type: 'coins', x: 6940, y: 430.5, width: 45, height: 35, limitFrames: 7 }),
        new Item({ id: 14, type: 'keys', x: 8480, y: 250.5, width: 45, height: 35, limitFrames: 7 }),
    ];

    itemsCounter = [
        new ItemCounter({ type: 'coins', x: canvas.width - 75, y: 74, color: '#fff', font: '20px Arial' }),
        new ItemCounter({ type: 'score', x: 65, y: 100, color: '#fff', font: '20px Arial' }),
    ];

    bullets = [];

    scrollOfset = 0;
};

let lastKey = 'd';
const keys = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
};

// * Updates position of player every second
function animate() {
    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);

    // * Draw objects
    staticObjects.forEach(object => object.draw());
    genericObjects.forEach(object => object.draw());
    uiObjects.forEach(object => object.draw());
    platforms.forEach(platform => platform.draw());
    warnings.forEach(warning => warning.draw());
    enemies.forEach(enemy => {
        if (scrollOfset >= enemy.spawnPoint) enemy.update();
    });
    items.forEach(item => item.update());
    itemsCounter.forEach(item => item.draw());
    bullets.forEach(bullet => bullet.update());
    player.update();

    // * Pintar pantalla de vidas restantes
    if (player.isDead && lives > 0) {
        loseScreen.draw();
    }

    // * Pintar si se acaban las vidas
    if (lives === 0) {
        gameOverScreen.draw();
    }

    if (!player.isDead && !player.won) {
        if (keys.right.pressed && player.position.x < 500) {
            player.velocity.x = player.speed;
        } else if ((keys.left.pressed && player.position.x > 200) || keys.left.pressed && player.position.x > 0) {
            player.velocity.x = -player.speed;
        } else {
            player.velocity.x = 0;

            if (keys.right.pressed) {
                scrollOfset += player.speed;
                platforms.forEach(platform => platform.position.x -= player.speed);
                bullets.forEach(bullet => bullet.position.x -= player.speed);
                warnings.forEach(warning => warning.position.x -= player.speed);
                items.forEach(item => item.position.x -= player.speed);
                enemies.forEach(enemy => enemy.position.x -= player.speed);
                genericObjects.forEach(object => object.position.x -= player.speed * object.speed);
            }
        }
    } else {
        player.velocity.x = 0;
    }

    // * Platform collision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;

            player.isJumping = false;
        }

        enemies.forEach(enemy => {
            if (enemy.position.y + enemy.height <= platform.position.y &&
                enemy.position.y + enemy.height + enemy.velocity.y >= platform.position.y &&
                enemy.position.x + enemy.width >= platform.position.x &&
                enemy.position.x <= platform.position.x + platform.width) {
                enemy.velocity.y = 0;
            }
        });
    });

    // * Enemies collision
    enemies.forEach(enemy => {
        if (player.position.y + player.height <= enemy.position.y &&
            player.position.y + player.height + player.velocity.y >= enemy.position.y &&
            player.position.x + player.width >= enemy.position.x &&
            player.position.x <= enemy.position.x + enemy.width) {
            if (!enemy.isDead && (enemy.type === 'green' || enemy.type === 'blue')) {
                player.velocity.y = 0;
                enemy.die();
                sounds.enemy.dead.volume = .25;
                sounds.enemy.dead.play();

                score += 100;

                itemsCounter.forEach(item => {
                    if (item.type === 'score') {
                        item.counter = score;
                    }
                });
            }
        }

        if ((player.position.x + player.width) >= enemy.position.x &&
            player.position.x <= (enemy.position.x + enemy.width) &&
            enemy.position.y <= (player.position.y + player.height) &&
            player.position.y <= (enemy.position.y + enemy.height) && !enemy.isDead) {
            if (!player.isDead) {
                player.die();
            }
        }


        // * Bullets collision
        bullets.forEach(bullet => {
            if ((bullet.position.x + bullet.width) >= enemy.position.x &&
                bullet.position.x <= (enemy.position.x + enemy.width) &&
                enemy.position.y <= (bullet.position.y + bullet.height) &&
                bullet.position.y <= (enemy.position.y + enemy.height)) {

                if (enemy.type != 'green' && enemy.type != 'blue' && !enemy.hasChanged) {
                    enemy.change();
                    sounds.enemy.dead.volume = .25;
                    sounds.enemy.dead.play();
                };

                bullet.destroy();

            }
        });

    });

    // * Items collision
    items.forEach(item => {
        if ((player.position.x + player.width) >= item.position.x &&
            player.position.x <= (item.position.x + item.width) &&
            item.position.y <= (player.position.y + player.height) &&
            player.position.y <= (item.position.y + item.height)) {

            if (item.type === 'coins' && !item.collected) {
                item.velocity.y = -15;
                item.collected = true;
                sounds.coin.play();
                collectedCoins++;

                itemsCounter.forEach(item => {
                    if (item.type === 'coins') {
                        item.counter = collectedCoins;
                    }
                });
            }

            if (item.type === 'keys') {
                item.velocity.y = -2;
                sounds.bc.complete.play();
                sounds.bc.level1.pause();

                enemies.forEach(enemy => {
                    if (!enemy.isDead) enemy.die();
                });

                player.win();
            }

            if (item.type === 'potion' && !player.hasPower) {
                player.hasPower = true;
                item.width = 0;
                item.height = 0;
                item.position.y = -5;

                sounds.player.powerUp.volume = .4;
                sounds.player.powerUp.play();
            }
        }
    });

    // * Change of sprites
    if (!player.isDead && !player.won && !player.isShotting && keys.right.pressed && lastKey === 'd' && !player.isJumping && player.currentSprite != player.sprites.run.right) {
        player.frames = 1;
        player.currentSprite = player.sprites.run.right;
        player.currentCropWith = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    } else if (!player.isDead && !player.won && !player.isShotting && keys.left.pressed && lastKey === 'a' && !player.isJumping && player.currentSprite != player.sprites.run.left) {
        player.frames = 1;
        player.currentSprite = player.sprites.run.left;
        player.currentCropWith = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    } else if (!player.isDead && !player.won && !player.isShotting && !keys.right.pressed && lastKey === 'd' && !player.isJumping && player.currentSprite != player.sprites.stand.right) {
        player.frames = 1;
        player.currentSprite = player.sprites.stand.right;
        player.currentCropWith = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    } else if (!player.isDead && !player.won && !player.isShotting && !keys.left.pressed && lastKey === 'a' && !player.isJumping && player.currentSprite != player.sprites.stand.left) {
        player.frames = 1;
        player.currentSprite = player.sprites.stand.left;
        player.currentCropWith = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    } else if (!player.isDead && !player.won && !player.isShotting && lastKey === 'd' && player.isJumping && player.currentSprite != player.sprites.jump.right) {
        player.frames = 1;
        player.currentSprite = player.sprites.jump.right;
        player.currentCropWith = player.sprites.jump.cropWidth;
        player.width = player.sprites.jump.width;
    } else if (!player.isDead && !player.won && !player.isShotting && lastKey === 'a' && player.isJumping && player.currentSprite != player.sprites.jump.left) {
        player.frames = 1;
        player.currentSprite = player.sprites.jump.left;
        player.currentCropWith = player.sprites.jump.cropWidth;
        player.width = player.sprites.jump.width;
    } else if (!player.isDead && !player.won && player.isShotting && lastKey === 'd' && !keys.right.pressed && player.currentSprite != player.sprites.attack.right) {
        player.frames = 1;
        player.currentSprite = player.sprites.attack.right;
        player.currentCropWith = player.sprites.attack.cropWidth;
        player.width = player.sprites.attack.width;
    } else if (!player.isDead && !player.won && player.isShotting && lastKey === 'a' && !keys.left.pressed && player.currentSprite != player.sprites.attack.left) {
        player.frames = 1;
        player.currentSprite = player.sprites.attack.left;
        player.currentCropWith = player.sprites.attack.cropWidth;
        player.width = player.sprites.attack.width;
    }


    // * Lose the game
    if ((player.position.y > canvas.height + 300) && !player.isDead) {
        player.isDead = true;

        if (lives > 0) {
            lives--;
            loseScreen.draw();
        }

        sounds.player.dead.play();
        sounds.bc.level1.pause();
    }
}

function moveRight() {
    keys.right.pressed = true;
    lastKey = 'd';
}

function moveLeft() {
    keys.left.pressed = true;
    lastKey = 'a';
}

function shoot() {
    if (player.hasPower && player.currentSprite != player.sprites.run.right && player.currentSprite != player.sprites.run.left && !beenShot) {
        player.isShotting = true;

        if (lastKey === 'd') bullets.push(new Bullet({ x: player.position.x + 20, y: player.position.y + 25, orientation: 'right' }));
        if (lastKey === 'a') bullets.push(new Bullet({ x: player.position.x - 30, y: player.position.y + 25, orientation: 'left' }));

        sounds.player.shoot.volume = .3;
        sounds.player.shoot.play();
    }
}

function jump() {
    if (!player.isJumping && !player.isDead && !player.won) {
        player.velocity.y -= 13;
        sounds.player.jump.play();
    }

    player.isJumping = true;
}

// * Movement
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            moveLeft();
            break;

        case 'd':
            moveRight();
            break;

        case 'm':
            shoot();
            break;

        case 'n':
            jump();
            break;

        default:
            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.left.pressed = false;
            break;

        case 'd':
            keys.right.pressed = false;
            break;

        default:
            break;
    }
});

// * Touch movement
document.querySelector('#right-btn').addEventListener('touchstart', moveRight);
document.querySelector('#right-btn').addEventListener('touchend', () => keys.right.pressed = false);
document.querySelector('#left-btn').addEventListener('touchstart', moveLeft);
document.querySelector('#left-btn').addEventListener('touchend', () => keys.left.pressed = false);

document.querySelector('#jump-btn').addEventListener('touchstart', jump);
document.querySelector('#shoot-btn').addEventListener('touchstart', shoot);

// * Full screen functions
function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}
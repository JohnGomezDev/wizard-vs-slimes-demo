// ? Sound effects
const sounds = {
    bc: {
        level1: new Audio('./assets/sounds/bc-level-1.mp3'),
        complete: new Audio('./assets/sounds/level-complete.wav'),
    },
    player: {
        jump: new Audio('./assets/sounds/playerJump.wav'),
        dead: new Audio('./assets/sounds/p-dead.wav'),
        powerUp: new Audio('./assets/sounds/powerup.wav'),
        shoot: new Audio('./assets/sounds/p-shoot.wav'),
    },
    coin: new Audio('./assets/sounds/coin2.wav'),
    enemy: {
        dead: new Audio('./assets/sounds/e-dead.wav')
    }
};
// ? Create class of the player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 500
        };
        this.image = createSprite('./assets/images/idle-right.png');
        
        this.sprites = {
            stand: {
                right: createSprite('./assets/images/idle-right.png'),
                left: createSprite('./assets/images/idle-left.png'),
                cropWidth: 60,
                width: 60
            },
            run: {
                right: createSprite('./assets/images/run-right.png'),
                left: createSprite('./assets/images/run-left.png'),
                cropWidth: 60,
                width: 60
            },
            jump: {
                right: createSprite('./assets/images/jump-right.png'),
                left: createSprite('./assets/images/jump-left.png'),
                cropWidth: 60.1,
                width: 60
            },
            attack: {
                right: createSprite('./assets/images/attack-right.png'),
                left: createSprite('./assets/images/attack-left.png'),
                cropWidth: 60,
                width: 60
            },
            dead: {
                right: createSprite('./assets/images/dead.png'),
                cropWidth: 72,
                width: 73
            },
        };
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWith = this.sprites.stand.cropWidth

        this.frames = 0;
        this.width = 60;
        this.height = 70;
        this.velocity = {
            x: 0,
            y: 5
        };
        this.speed = 4.5;
        this.isJumping = false;
        this.hasPower = false;
        this.isShotting = false;
        this.isDead = false;
        this.won = false;
    }

    draw() {
        context.drawImage(
            this.currentSprite, 
            this.currentCropWith * this.frames,
            0,
            this.currentCropWith,
            70,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update() {
        counter++;
        
        if((this.currentSprite == this.sprites.stand.left || 
            this.currentSprite == this.sprites.stand.right ||
            this.currentSprite == this.sprites.jump.right ||
            this.currentSprite == this.sprites.jump.left ||
            this.currentSprite == player.sprites.dead.right) && 
            counter % 12 == 0) {
            this.frames++;
        }

        if((this.currentSprite == this.sprites.run.left || 
            this.currentSprite == this.sprites.run.right) && 
            counter % 5 == 0) {
            this.frames++;
        }

        if((this.currentSprite == this.sprites.attack.right ||
            this.currentSprite == this.sprites.attack.left) && 
            counter % 4 == 0) {
            this.frames++;
        }

        
        if((this.currentSprite == this.sprites.stand.left || 
            this.currentSprite == this.sprites.stand.right) 
            && this.frames > 4) {
            this.frames = 0;
        }

        if((this.currentSprite == this.sprites.run.left || 
            this.currentSprite == this.sprites.run.right ||
            this.currentSprite == this.sprites.jump.right ||
            this.currentSprite == this.sprites.jump.left) 
            && this.frames > 7) {
            this.frames = 0;
        }
        
        
        if((this.currentSprite == this.sprites.attack.right || 
            this.currentSprite == this.sprites.attack.left) && 
            this.frames > 2) {
            this.isShotting = false;
            this.frames = 2;
        }

        if(this.isDead && this.currentSprite == player.sprites.dead.right && this.frames > 4) {
            this.frames = 4
        }

        this.draw();
        this.position.y +=  this.velocity.y;
        this.position.x +=  this.velocity.x;
        
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    }

    die() {
        this.frames = 1;
        this.currentSprite = this.sprites.dead.right;
        this.currentCropWith = this.sprites.dead.cropWidth;
        this.width = this.sprites.dead.width;
        this.isDead = true;
        
        lives --; 

        sounds.player.dead.play();
        sounds.bc.level1.pause();
    }

    win() {
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWith = this.sprites.stand.cropWidth;
        this.width = this.sprites.stand.width;
        this.won = true;

        winScreen.show();
        totalScore.text(score + (collectedCoins * 100));
    }
}

// ? Create class of the bullet
class Bullet {
    constructor({ x, y, orientation }) {
        this.position = {
            x,
            y
        };
        this.velocity = {
            x: orientation == 'right' ? 10 : -10,
            y: 0
        };
        this.width = 45;
        this.height = 35;
        this.image = createSprite(`./assets/images/bullet-${orientation}.png`);
        
        this.sprites = {
            shot: {
                img: createSprite(`./assets/images/bullet-${orientation}.png`),
                cropWidth: 16,
                width: 45
            }
        };
        this.currentSprite = this.sprites.shot.img;
        this.currentCropWith = this.sprites.shot.cropWidth
        this.frames = 0;
        this.timer = 0;
    }

    draw() {
        context.drawImage(
            this.currentSprite, 
            this.currentCropWith * this.frames,
            0,
            this.currentCropWith,
            16,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update() {
        beenShot = true;

        this.timer++;
        if(this.timer > 250) {
            this.destroy();
        }

        if(this.timer > 50) {
            beenShot = false;
        }

        this.frames++;
        if(this.frames > 19) this.frames = 0;

        this.draw();
        this.position.y +=  this.velocity.y;
        this.position.x +=  this.velocity.x;        
    }

    destroy() {
        this.width = 0;
        this.height = 0;
        this.velocity.x = 0;
        this.position.y = -5;
    }
}
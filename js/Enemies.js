// ? Create class of enemies
class LinearEnemy {
    constructor({ x, y, vx, spawnPoint, type }) {
        this.type = type;
        this.position = {
            x,
            y
        };
        this.width = 45;
        this.height = 35;
        this.velocity = {
            x: vx,
            y: 5
        };
        this.speed = 5.5;
        this.spawnPoint = spawnPoint;
        this.image = createSprite(`./assets/images/${this.type}-enemy-iddle.png`);
        
        this.sprites = {
            green: {
                img: createSprite('./assets/images/green-enemy-iddle.png'),
                cropWidth: 37,
                width: 45
            },
            red: {
                img: createSprite('./assets/images/red-enemy-iddle.png'),
                cropWidth: 37,
                width: 45
            },
            dead: {
                img: createSprite('./assets/images/green-enemy-dead.png'),
                cropWidth: 95,
                width: 45
            }
        };
        this.currentSprite = this.sprites[this.type].img;
        this.currentCropWith = this.sprites[this.type].cropWidth

        this.frames = 0;
        this.isDead = false;
        this.hasChanged = false;
    }

    draw() {
        context.drawImage(
            this.currentSprite, 
            this.currentCropWith * this.frames,
            0,
            this.currentCropWith,
            22,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update() {
        if(counter % 6 == 0) this.frames++;

        if((this.currentSprite == this.sprites.green.img || this.currentSprite == this.sprites.red.img) && this.frames > 6) {
            this.frames = 0;
        }

        if(this.currentSprite == this.sprites.dead.img && this.frames > 13) {
            this.frames = 0;
        }

        if(this.isDead && this.frames == 13) {
            this.height = 0;
            this.width = 0;
        }

        this.draw();
        this.position.y +=  this.velocity.y;
        this.position.x +=  this.velocity.x;
        
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    }

    change() {
        this.type = 'green';
        this.currentSprite = this.sprites.green.img;
        this.currentCropWith = this.sprites.green.cropWidth;
        this.width = this.sprites.green.width;
        this.hasChanged = true;
        this.velocity.x -= 1;
    }

    die() {
        this.velocity.x = 0;
        this.frames = 1;
        this.currentSprite = this.sprites.dead.img;
        this.currentCropWith = this.sprites.dead.cropWidth;
        this.width = this.sprites.dead.width;
        this.isDead = true;
    }
}

class WalkingEnemy {
    constructor({ x, y, vx, orientation, limit, spawnPoint, type }) {
        this.type = type;
        this.position = {
            x,
            y
        };
        this.width = 45;
        this.height = 35;
        this.orientation = orientation;
        this.velocity = {
            x: vx,
            y: 5
        };
        this.speed = 5.5;
        this.distance = 0;
        this.limit = limit;
        this.spawnPoint = spawnPoint;
        this.image = createSprite(`./assets/images/${this.type}-enemy-iddle.png`);
        
        this.sprites = {
            green: {
                img: createSprite('./assets/images/green-enemy-iddle.png'),
                cropWidth: 37,
                width: 45
            },
            red: {
                img: createSprite('./assets/images/red-enemy-iddle.png'),
                cropWidth: 37,
                width: 45
            },
            blue: {
                img: createSprite('./assets/images/blue-enemy-iddle.png'),
                cropWidth: 37,
                width: 45
            },
            dead: {
                green: createSprite('./assets/images/green-enemy-dead.png'),
                blue: createSprite('./assets/images/blue-enemy-dead.png'),
                cropWidth: 95,
                width: 45
            }
        };
        this.currentSprite = this.sprites[this.type].img;
        this.currentCropWith = this.sprites[this.type].cropWidth

        this.frames = 0;
        this.hasChanged = false;
        this.isDead = false;
    }

    draw() {
        context.drawImage(
            this.currentSprite, 
            this.currentCropWith * this.frames,
            0,
            this.currentCropWith,
            22,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update() {
        if((this.currentSprite == this.sprites.green.img || 
            this.currentSprite == this.sprites.red.img ||
            this.currentSprite == this.sprites.dead[this.type]) &&
            counter % 6 == 0) {
            this.frames++;
        }

        if(this.currentSprite == this.sprites.blue.img && counter % 20 == 0) {
            this.frames++;
        }

        if((this.currentSprite == this.sprites.green.img || 
            this.currentSprite == this.sprites.red.img || 
            this.currentSprite == this.sprites.blue.img) 
            && this.frames > 6) {
            this.frames = 0;
        }

        if(this.currentSprite == this.sprites.dead[this.type] && this.frames > 13) {
            this.frames = 0;
        }

        if(this.isDead && this.frames == 13) {
            this.height = 0;
            this.width = 0;
        }

        this.draw();
        this.position.y +=  this.velocity.y;
        
        this.distance++;

        if(this.distance % this.limit == 0) {
            this.orientation = this.orientation == 'left' ? 'right' : 'left';
        }
        
        if(!this.isDead) {
            if(this.orientation == 'left') {
                this.velocity.x = -Math.abs(this.velocity.x);
            } else {
                this.velocity.x = Math.abs(this.velocity.x);
            }
        }
        
        this.position.x +=  this.velocity.x;

        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    }

    change() {
        this.type = 'blue';
        this.currentSprite = this.sprites.blue.img;
        this.currentCropWith = this.sprites.blue.cropWidth;
        this.width = this.sprites.blue.width;
        this.hasChanged = true;
        this.velocity.x = 0;
    }

    die() {
        this.velocity.x = 0;
        this.frames = 1;
        this.currentSprite = this.sprites.dead[this.type];
        this.currentCropWith = this.sprites.dead.cropWidth;
        this.width = this.sprites.dead.width;
        this.isDead = true;
    }
}
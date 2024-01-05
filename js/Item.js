// ? Create class of items
class Item {
    constructor({ id, type, x, y, width, height, limitFrames }) {
        this.id = id;
        this.type = type;
        this.position = {
            x,
            y
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.width = width;
        this.height = height;
        this.image = createSprite(`./assets/images/${this.type}.png`);
        
        this.sprites = {
            iddle: {
                img: createSprite(`./assets/images/${this.type}.png`),
                cropWidth: 32,
                width: width
            }
        };
        this.currentSprite = this.sprites.iddle.img;
        this.currentCropWith = this.sprites.iddle.cropWidth
        this.frames = 0;
        this.limitFrames = limitFrames;
        this.collected = false;
    }

    draw() {
        context.drawImage(
            this.currentSprite, 
            this.currentCropWith * this.frames,
            0,
            this.currentCropWith,
            32,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update() {
        if(counter % 6 == 0) this.frames++;
        if(this.frames > this.limitFrames) this.frames = 0;

        this.draw();
        this.position.y +=  this.velocity.y;
        this.position.x +=  this.velocity.x;
    }
}

// ? Create clas of items counter 
class ItemCounter {
    constructor({ type, x, y, color, font }) {
        this.type = type;
        this.counter = 0;
        this.position = {
            x,
            y
        };
        this.color = color;
        this.font = font;
    }

    draw() {
        context.font = "20px Monospace";
        context.fillStyle = this.color;
        context.fillText(this.counter, this.position.x, this.position.y);
    }
}
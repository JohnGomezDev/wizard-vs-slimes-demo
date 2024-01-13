// ? Create class of lose screen
class LoseScreen {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        this.width = canvas.width;
        this.height = canvas.height;
        this.color = '#000';
        this.image = createSprite('./assets/images/livesCounter.png');
        this.timer = 0;
    }

    draw() {
        this.timer ++;
        if(this.timer > 100) {
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.width, this.height);

            context.drawImage(this.image, 500, 320);
            context.font = "30px Monospace";
            context.fillStyle = '#fff';
            context.fillText(lives, 595, 368);
        }

        if(this.timer > 240) {
            collectedCoins = 0;
            score = 0;
            init();
        }
    }
}

// ? Create class of game over screen
class GameOverScreen {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        this.width = canvas.width;
        this.height = canvas.height;
        this.color = '#000';
        this.image = createSprite('./assets/images/gameOverIcon.png');
        this.timer = 0;
    }

    draw() {
        this.timer ++;
        if(this.timer > 100) {
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.width, this.height);
            context.drawImage(this.image, 540, 270);

            context.font = "50px Monospace";
            context.fillStyle = '#fff';
            context.fillText('GAME OVER', 440, 368);
        }

        if(this.timer === 300) {
            location.reload();
        }
    }
}
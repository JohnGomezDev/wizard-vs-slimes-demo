// ? Create class of platforms
class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        };

        this.image = image;
        this.width = 0;
        this.height = 0;
    }

    draw() {
        this.width = this.image.width;
        this.height = this.image.height;
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}
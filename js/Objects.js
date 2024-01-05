// ? Create class of generic objects
class GenericObject {
    constructor({ x, y, width, height, image, speed }) {
        this.position = {
            x,
            y
        };

        this.image = image;
        this.width = width;
        this.height = width;
        this.speed = speed;
    }

    draw() {
        this.width = this.image.width;
        this.height = this.image.height;
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

// ? Create class of icons/alerts
class Warning {
    constructor({ x, y, width, height, image, speed }) {
        this.position = {
            x,
            y
        };

        this.image = image;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

// ? Create class of static objects
class StaticObject {
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

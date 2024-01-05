// ? Sprites
function createSprite(imageSrc) {
    const image = new Image();
    image.src = imageSrc;

    return image;
}

let longPlatformSprite = createSprite('./assets/images/platform.png');
let tallPlatformSprite = createSprite('./assets/images/platformSmallTall.png');
let smallPlatformSprite = createSprite('./assets/images/smallPlatform.png');
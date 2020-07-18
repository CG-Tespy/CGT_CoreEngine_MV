import { GetScaleFactor } from '../Utils/GetScaleFactor';
export class PIXISpriteEx {
    static Resized(sprite, width, height) {
        let newSprite = new PIXI.Sprite(sprite.texture);
        newSprite.width = width;
        newSprite.height = height;
        return newSprite;
    }
    static Copy(sprite) {
        let newSprite = new PIXI.Sprite(sprite.texture);
        newSprite.width = sprite.width;
        newSprite.height = sprite.height;
        return newSprite;
    }
    static Resize(sprite, width, height) {
        sprite.width = width;
        sprite.height = height;
    }
    static ResizeWhileKeepingAspectFor(sprite, targetWidth, targetHeight) {
        let scaleFactor = GetScaleFactor(targetWidth, targetHeight, sprite.texture.width, sprite.texture.height);
        sprite.width = sprite.texture.width * scaleFactor;
        sprite.height = sprite.texture.height * scaleFactor;
    }
}

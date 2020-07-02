import { GetScaleFactor } from '../Utils/GetScaleFactor';

export class PIXISpriteEx
{
    static Resized(sprite: PIXI.Sprite, width: number, height: number)
    {
        let newSprite = new PIXI.Sprite(sprite.texture);
        newSprite.width = width;
        newSprite.height = height;
    
        return newSprite;
    }

    static Copy(sprite: PIXI.Sprite)
    {
        let newSprite = new PIXI.Sprite(sprite.texture);
        newSprite.width = sprite.width;
        newSprite.height = sprite.height;
        return newSprite;
    }

    static Resize(sprite: PIXI.Sprite, width: number, height: number)
    {
        sprite.width = width;
        sprite.height = height;
    }

    static ResizeWhileKeepingAspectFor(sprite: PIXI.Sprite, targetWidth: number, targetHeight: number)
    {
        let scaleFactor = GetScaleFactor(targetWidth, targetHeight, 
                                        sprite.texture.width, sprite.texture.height);
        sprite.width = sprite.texture.width * scaleFactor;
        sprite.height = sprite.texture.height * scaleFactor;
    }
}
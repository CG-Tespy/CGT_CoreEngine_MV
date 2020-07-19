import { GetScaleFactor } from '../Utils/GetScaleFactor';
var PIXISpriteEx = /** @class */ (function () {
    function PIXISpriteEx() {
    }
    PIXISpriteEx.Resized = function (sprite, width, height) {
        var newSprite = new PIXI.Sprite(sprite.texture);
        newSprite.width = width;
        newSprite.height = height;
        return newSprite;
    };
    PIXISpriteEx.Copy = function (sprite) {
        var newSprite = new PIXI.Sprite(sprite.texture);
        newSprite.width = sprite.width;
        newSprite.height = sprite.height;
        return newSprite;
    };
    PIXISpriteEx.Resize = function (sprite, width, height) {
        sprite.width = width;
        sprite.height = height;
    };
    PIXISpriteEx.ResizeWhileKeepingAspectFor = function (sprite, targetWidth, targetHeight) {
        var scaleFactor = GetScaleFactor(targetWidth, targetHeight, sprite.texture.width, sprite.texture.height);
        sprite.width = sprite.texture.width * scaleFactor;
        sprite.height = sprite.texture.height * scaleFactor;
    };
    return PIXISpriteEx;
}());
export { PIXISpriteEx };

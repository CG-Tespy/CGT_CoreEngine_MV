import { GetScaleFactor } from '../Structures/Utils/GetScaleFactor';
'use strict';
(function () {
    var pixiSpriteChanges = {
        resized: function (width, height) {
            var newSprite = new PIXI.Sprite(this.texture);
            newSprite.width = width;
            newSprite.height = height;
            return newSprite;
        },
        copy: function () {
            var newSprite = new PIXI.Sprite(this.texture);
            newSprite.width = this.width;
            newSprite.height = this.height;
            return newSprite;
        },
        resize: function (width, height) {
            this.width = width;
            this.height = height;
        },
        resizeWhileKeepingAspectFor: function (targetWidth, targetHeight) {
            var scaleFactor = GetScaleFactor(targetWidth, targetHeight, this.texture.width, this.texture.height);
            this.width = this.texture.width * scaleFactor;
            this.height = this.texture.height * scaleFactor;
        }
    };
    Object.assign(PIXI.Sprite.prototype, pixiSpriteChanges);
})();

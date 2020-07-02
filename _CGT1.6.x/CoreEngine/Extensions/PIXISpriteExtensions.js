import { GetScaleFactor } from '../Structures/Utils';
'use strict';
(function () {
    let pixiSpriteChanges = {
        resized(width, height) {
            let newSprite = new PIXI.Sprite(this.texture);
            newSprite.width = width;
            newSprite.height = height;
            return newSprite;
        },
        copy() {
            let newSprite = new PIXI.Sprite(this.texture);
            newSprite.width = this.width;
            newSprite.height = this.height;
            return newSprite;
        },
        resize(width, height) {
            this.width = width;
            this.height = height;
        },
        resizeWhileKeepingAspectFor(targetWidth, targetHeight) {
            let scaleFactor = GetScaleFactor(targetWidth, targetHeight, this.texture.width, this.texture.height);
            this.width = this.texture.width * scaleFactor;
            this.height = this.texture.height * scaleFactor;
        }
    };
    Object.assign(PIXI.Sprite.prototype, pixiSpriteChanges);
})();

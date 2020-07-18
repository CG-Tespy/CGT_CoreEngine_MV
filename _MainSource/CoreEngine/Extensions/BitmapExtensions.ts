'use strict';

(function()
{
    let extensions = 
    {
        /**
         * Add a callback function that will be called when the bitmap is loaded.
         * Author: MinusGix
         * @method addLoadListener
         * @param {Function} listener The callback function
         */
        addLoadListener(listener: Function): void {
            if (!this.isReady()) {
                this._loadListeners.push(listener);
            } else {
                // @ts-ignore
                listener(this);
            }
        },

        removeLoadListener(listener: Function): void
        {
            this._loadListeners.remove(listener);
        },

        hasLoadListener(listener: Function): boolean
        {
            return this._loadListeners.includes(listener);
        },

        /**
         * Returns a resized version of the bitmap (if it is ready). Note that 
         * the aspect ratio may not be the same, based on the passed width and height. 
         * @param {number} width
         * @param {number} height
         */
        resized(width: number, height: number): Bitmap
        {
            if (!this.isReady())
                return;

            var newBitmap = new Bitmap(width, height);

            newBitmap.blt(this, 0, 0, this.width, this.height, 0, 0, width, height);
            return newBitmap;
        }


    };

    Object.assign(Bitmap.prototype, extensions);

})();
import { ArrayEx } from './ArrayEx';
var BitmapEx = /** @class */ (function () {
    function BitmapEx() {
    }
    /**
     * Add a callback function that will be called when the bitmap is loaded.
     * Author: MinusGix
     */
    BitmapEx.prototype.AddLoadListener = function (bitmap, listener) {
        if (!bitmap.isReady()) {
            // @ts-ignore
            bitmap._loadListeners.push(listener);
        }
        else {
            listener(bitmap);
        }
    };
    BitmapEx.prototype.RemoveLoadListener = function (bitmap, listener) {
        // @ts-ignore
        ArrayEx.Remove(bitmap._loadListeners, listener);
    };
    BitmapEx.prototype.HasLoadListener = function (bitmap, listener) {
        // @ts-ignore
        return ArrayEx.Includes(bitmap._loadListeners, listener);
    };
    /**
     * Returns a resized version of the bitmap (if it is ready). Note that
     * the aspect ratio may not be the same, based on the passed width and height.
     */
    BitmapEx.prototype.Resized = function (bitmap, width, height) {
        if (!bitmap.isReady())
            return;
        var newBitmap = new Bitmap(width, height);
        newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, width, height);
        return newBitmap;
    };
    return BitmapEx;
}());
export { BitmapEx };

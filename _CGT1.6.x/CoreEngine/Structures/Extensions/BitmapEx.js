import { ArrayEx } from './ArrayEx';
export class BitmapEx {
    /**
     * Add a callback function that will be called when the bitmap is loaded.
     * Author: MinusGix
     */
    AddLoadListener(bitmap, listener) {
        if (!bitmap.isReady()) {
            // @ts-ignore
            bitmap._loadListeners.push(listener);
        }
        else {
            listener(bitmap);
        }
    }
    RemoveLoadListener(bitmap, listener) {
        // @ts-ignore
        ArrayEx.Remove(bitmap._loadListeners, listener);
    }
    HasLoadListener(bitmap, listener) {
        // @ts-ignore
        return bitmap._loadListeners.includes(listener);
    }
    /**
     * Returns a resized version of the bitmap (if it is ready). Note that
     * the aspect ratio may not be the same, based on the passed width and height.
     */
    Resized(bitmap, width, height) {
        if (!bitmap.isReady())
            return;
        var newBitmap = new Bitmap(width, height);
        newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, width, height);
        return newBitmap;
    }
}

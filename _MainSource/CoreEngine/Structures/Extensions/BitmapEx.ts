import { ArrayEx } from './ArrayEx';

export class BitmapEx
{
    /**
     * Add a callback function that will be called when the bitmap is loaded.
     * Author: MinusGix
     */
    AddLoadListener(bitmap: Bitmap, listener: Function) 
    {
        if (!bitmap.isReady()) {
            // @ts-ignore
            bitmap._loadListeners.push(listener);
        }
        else {
            listener(bitmap);
        }
    }

    RemoveLoadListener(bitmap: Bitmap, listener: Function) 
    {
        // @ts-ignore
        ArrayEx.Remove(bitmap._loadListeners, listener);
    }

    HasLoadListener(bitmap: Bitmap, listener: Function) 
    {
        // @ts-ignore
        return ArrayEx.Includes(bitmap._loadListeners, listener);
    }

    /**
     * Returns a resized version of the bitmap (if it is ready). Note that
     * the aspect ratio may not be the same, based on the passed width and height.
     */
    Resized(bitmap: Bitmap, width: number, height: number) 
    {
        if (!bitmap.isReady())
            return;
        var newBitmap = new Bitmap(width, height);
        newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, width, height);
        return newBitmap;
    }
}
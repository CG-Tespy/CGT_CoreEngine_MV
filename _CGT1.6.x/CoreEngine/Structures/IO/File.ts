type FileIOResponse = (resultText: string) => void;

/**
 * Allows working with files in a browser-friendly manner.
 */
export class File
{
    /**
     * Asynchronously reads a file and calls a callback when it's done.
     * @param path Relative to where the game's index.html file is.
     */
    static async Read(path: string, callback: FileIOResponse): Promise<void>
    {
        await fetch(path)
        .then(response => response.text())
        .then(responseText => callback(responseText));
    }


}
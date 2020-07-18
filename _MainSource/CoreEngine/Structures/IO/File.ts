import { JSONToMap, MapToJSON } from '../Utils/JSONMap';

/**
 * Allows working with files in a browser-friendly manner.
 */
export class File
{
    static get FileKey() { return "CGTFiles"; }
    private static filesStored: Map<string, string> = new Map<string, string>();
    static get FilesStored() { return this.filesStored; };
    private static filesKey = "CGTFiles";

    static InitFromLocalStorage()
    {
        // The files are stored in a json string in localStorage. We need to parse 
        // and assign that upon startup.
        let fileMapStr = localStorage.getItem(this.filesKey);

        if (fileMapStr != null)
            this.filesStored = JSONToMap(fileMapStr);
        else
            this.SyncToLocalStorage();
    }

    /**
     * Synchronously reads a file on disk and returns its text.
     * @param path Relative to where the game's index.html file is.
     */
    static ReadSync(path: string): string
    {
        let req = new XMLHttpRequest();
        req.open("GET", path, false);
        req.send();
        return req.responseText;
    }

    /**
     * Asynchronously reads a file on disk and executes a callback
     * when its done.
     * @param path Relative to where the game's index.html file is.
     */
    static Read(path: string, onFileReadFinished: (output: string) => void): void
    {
        fetch(path)
        .then(response => response.text())
        .then(onFileReadFinished);
    }

    /**
     * Synchronously writes a "file" to browser storage with the passed key.
     * If the key is already tied to a "file", said "file" gets overwritten.
     */
    static WriteBrowSync(key: string, contents: string): void
    {
        this.FilesStored.set(key, contents);
        this.SyncToLocalStorage();
    }

    /** Syncs the local storage's CGT "files" with what this has. */
    protected static SyncToLocalStorage(): void
    {
        localStorage.setItem(this.filesKey, MapToJSON(this.FilesStored));
    }

    /**
     * Synchronously reads a "file" from browser storage with the passed key.
     * If there is no "file" tied to the key, you get an empty string.
     */
    static ReadBrowSync(key: string): string
    {
        let file = this.FilesStored.get(key);
        return file || ""; 
    }

}
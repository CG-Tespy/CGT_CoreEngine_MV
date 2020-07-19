import { JSONToMap, MapToJSON } from '../Utils/JSONMap';
/**
 * Allows working with files in a browser-friendly manner.
 */
var File = /** @class */ (function () {
    function File() {
    }
    Object.defineProperty(File, "FileKey", {
        get: function () { return "CGTFiles"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(File, "FilesStored", {
        get: function () { return this.filesStored; },
        enumerable: false,
        configurable: true
    });
    ;
    File.InitFromLocalStorage = function () {
        // The files are stored in a json string in localStorage. We need to parse 
        // and assign that upon startup.
        var fileMapStr = localStorage.getItem(this.filesKey);
        if (fileMapStr != null)
            this.filesStored = JSONToMap(fileMapStr);
        else
            this.SyncToLocalStorage();
    };
    /**
     * Synchronously reads a file on disk and returns its text.
     * @param path Relative to where the game's index.html file is.
     */
    File.ReadSync = function (path) {
        var req = new XMLHttpRequest();
        req.open("GET", path, false);
        req.send();
        return req.responseText;
    };
    /**
     * Asynchronously reads a file on disk and executes a callback
     * when its done.
     * @param path Relative to where the game's index.html file is.
     */
    File.Read = function (path, onFileReadFinished) {
        fetch(path)
            .then(function (response) { return response.text(); })
            .then(onFileReadFinished);
    };
    /**
     * Synchronously writes a "file" to browser storage with the passed key.
     * If the key is already tied to a "file", said "file" gets overwritten.
     */
    File.WriteBrowSync = function (key, contents) {
        this.FilesStored.set(key, contents);
        this.SyncToLocalStorage();
    };
    /** Syncs the local storage's CGT "files" with what this has. */
    File.SyncToLocalStorage = function () {
        localStorage.setItem(this.filesKey, MapToJSON(this.FilesStored));
    };
    /**
     * Synchronously reads a "file" from browser storage with the passed key.
     * If there is no "file" tied to the key, you get an empty string.
     */
    File.ReadBrowSync = function (key) {
        var file = this.FilesStored.get(key);
        return file || "";
    };
    File.filesStored = new Map();
    File.filesKey = "CGTFiles";
    return File;
}());
export { File };

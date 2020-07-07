/**
 * Allows working with files in a browser-friendly manner.
 */
export class File {
    /**
     * Synchronously reads a file and returns its text.
     * @param path Relative to where the game's index.html file is.
     */
    static ReadSync(path) {
        let req = new XMLHttpRequest();
        req.open("GET", path, false);
        req.send();
        return req.responseText;
    }
    /**
     * Asynchronously reads a file and executes a callback
     * when its done.
     * @param path Relative to where the game's index.html file is.
     */
    static Read(path, onFileReadFinished) {
        fetch(path)
            .then(response => response.text())
            .then(onFileReadFinished);
    }
}

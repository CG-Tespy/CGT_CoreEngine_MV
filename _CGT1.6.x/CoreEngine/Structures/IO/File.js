var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Allows working with files in a simple, browser-friendly manner.
 */
export class File {
    /**
     * Asynchronously reads a file and returns the contents.
     * @param path Relative to where the game's index.html file is
     * (or in the case of an MV project, the project root)
     */
    static Read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileText;
            yield fetch(path)
                .then(response => response.text())
                .then(responseText => fileText = responseText);
            return fileText;
        });
    }
}

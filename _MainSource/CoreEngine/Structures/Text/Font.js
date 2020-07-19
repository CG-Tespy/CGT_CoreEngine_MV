var Font = /** @class */ (function () {
    function Font(face, size, isItalic) {
        this.face = face;
        this.size = size;
        this.isItalic = isItalic;
        this.Face = face || "GameFont";
        this.Size = size || 28;
        this.IsItalic = isItalic || false;
    }
    Object.defineProperty(Font.prototype, "Face", {
        get: function () { return this.face; },
        set: function (value) { this.face = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Size", {
        get: function () { return this.size; },
        set: function (value) { this.size = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "IsItalic", {
        get: function () { return this.isItalic; },
        set: function (value) { this.isItalic = value; },
        enumerable: false,
        configurable: true
    });
    Font.FromBitmap = function (bitmap) {
        var font = new Font();
        font.Face = bitmap.fontFace;
        font.Size = bitmap.fontSize;
        font.IsItalic = bitmap.fontItalic;
        return font;
    };
    Font.prototype.Copy = function () {
        var copy = new Font();
        copy.SetFrom(this);
        return copy;
    };
    Font.prototype.SetFrom = function (other) {
        this.Face = other.Face;
        this.Size = other.Size;
        this.IsItalic = other.IsItalic;
    };
    Font.prototype.ApplyTo = function (bitmap) {
        bitmap.fontFace = this.Face;
        bitmap.fontSize = this.Size;
        bitmap.fontItalic = this.IsItalic;
    };
    Font.prototype.Equals = function (other) {
        return this.Face === other.Face &&
            this.Size === other.Size &&
            this.IsItalic === other.IsItalic;
    };
    Font.prototype.toString = function () {
        return '[object CGT.Core.Text.Font]';
    };
    Font.Default = new Font("GameFont", 28, false);
    Font.Null = Object.freeze(new Font());
    return Font;
}());
export { Font };
;

export class Font {
    constructor(face, size, isItalic) {
        this.face = face;
        this.size = size;
        this.isItalic = isItalic;
        this.Face = face || "GameFont";
        this.Size = size || 28;
        this.IsItalic = isItalic || false;
    }
    set Face(value) { this.face = value; }
    set Size(value) { this.size = value; }
    set IsItalic(value) { this.isItalic = value; }
    static FromBitmap(bitmap) {
        let font = new Font();
        font.Face = bitmap.fontFace;
        font.Size = bitmap.fontSize;
        font.IsItalic = bitmap.fontItalic;
        return font;
    }
    get Face() { return this.face; }
    get Size() { return this.size; }
    get IsItalic() { return this.isItalic; }
    Copy() {
        let copy = new Font();
        copy.SetFrom(this);
        return copy;
    }
    SetFrom(other) {
        this.Face = other.Face;
        this.Size = other.Size;
        this.IsItalic = other.IsItalic;
    }
    ApplyTo(bitmap) {
        bitmap.fontFace = this.Face;
        bitmap.fontSize = this.Size;
        bitmap.fontItalic = this.IsItalic;
    }
    Equals(other) {
        return this.Face === other.Face &&
            this.Size === other.Size &&
            this.IsItalic === other.IsItalic;
    }
    toString() {
        return '[object CGT.Core.Text.Font]';
    }
}
Font.Default = new Font("GameFont", 28, false);
Font.Null = Object.freeze(new Font());
;

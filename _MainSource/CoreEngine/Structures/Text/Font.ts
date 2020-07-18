import { IEquatable } from '../Utils/Interfaces';

export class Font implements IEquatable<Font>
{
    constructor(protected face?: string, protected size?: number, protected isItalic?: boolean)
    {
        this.Face = face || "GameFont";
        this.Size = size || 28;
        this.IsItalic = isItalic || false;
    }

    set Face(value: string) { this.face = value; }
    set Size(value: number) { this.size = value; }
    set IsItalic(value: boolean) { this.isItalic = value; }

    static FromBitmap(bitmap: Bitmap): Font
    {
        let font = new Font();
        font.Face = bitmap.fontFace;
        font.Size = bitmap.fontSize;
        font.IsItalic = bitmap.fontItalic;
        return font;
    }

    get Face() { return this.face; }
    get Size() { return this.size; }
    get IsItalic() { return this.isItalic; }

    Copy(): Font
    {
        let copy = new Font();
        copy.SetFrom(this);
        return copy;
    }

    SetFrom(other: Font): void
    {
        this.Face = other.Face;
        this.Size = other.Size;
        this.IsItalic = other.IsItalic
    }

    ApplyTo(bitmap: Bitmap): void
    {
        bitmap.fontFace = this.Face;
        bitmap.fontSize = this.Size;
        bitmap.fontItalic = this.IsItalic;
    }

    Equals(other: Font): boolean
    {
        return this.Face === other.Face &&
        this.Size === other.Size &&
        this.IsItalic === other.IsItalic;
    }

    toString()
    {
        return '[object CGT.Core.Text.Font]';
    }

    static Default = new Font("GameFont", 28, false);
    static Null = Object.freeze(new Font());

};

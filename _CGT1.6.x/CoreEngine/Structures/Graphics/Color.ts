import { NumberEx } from '../Extensions/NumberEx';
import { PluginParamObjectFactory as BaseFactory } from '../PluginParams/PluginParamObjectFactory';

/**
 * Contains fields of Color objects as normally extracted
 * from the PluginManager's parameters object.
 */
export interface ParsedColorParam
{
    Red: string;
    Green: string;
    Blue: string;
    Alpha: string;
}

export class Color
{
    // Defaults
    static get Red() { return new Color(255, 0, 0); }
    static get DarkRed() { return new Color(139, 0, 0); }
    static get Pink() { return new Color(255, 192, 203); }

    static get Green() { return new Color(0, 255, 0); }
    static get DarkGreen() { return new Color(0, 139, 0); }
    static get LightGreen() { return new Color (0, 255, 127); }

    static get Cyan() { return new Color(0, 255, 255); }

    static get Blue() { return new Color(0, 0, 255); }
    static get DarkBlue() { return new Color(0, 0, 139); }
    static get LightBlue() { return new Color(137, 207, 240); }
    
    static get Yellow() { return new Color(255, 255, 0); }
    static get DarkYellow() { return new Color(255, 204, 0); }
    static get LightYellow() { return new Color(250, 250, 210); }

    static get Purple() { return new Color(255, 0, 255); }
    static get DarkPurple() { return new Color(48, 25, 52); }
    static get LightPurple() { return new Color(224, 176, 255); }

    static get White() { return new Color(255, 255, 255); }
    static get Black() { return new Color(0, 0, 0); }
    static get Gray() { return new Color(128, 128, 128); }

    static get Brown() { return new Color(150, 75, 0); }
    static get DarkBrown() {return new Color(50, 20, 20); }
    static get LightBrown() {return new Color(222, 170, 136); }
    
    static get Orange() { return new Color(255, 165, 0); }
    static get DarkOrange() { return new Color(255, 140, 0); }
    static get LightOrange() { return new Color(255, 204, 153); }

    static Cache = Object.freeze(
    {
        Red: Object.freeze(Color.Red),
        DarkRed: Object.freeze(Color.DarkRed),
        Pink: Object.freeze(Color.Pink),

        Green: Object.freeze(Color.Green),
        DarkGreen: Object.freeze(Color.DarkGreen),
        LightGreen: Object.freeze(Color.LightGreen),

        Cyan: Object.freeze(Color.Cyan),

        Blue: Object.freeze(Color.Blue),
        DarkBlue: Object.freeze(Color.DarkBlue),
        LightBlue: Object.freeze(Color.LightBlue),
        
        Yellow: Object.freeze(Color.Yellow),
        DarkYellow: Object.freeze(Color.DarkYellow),
        LightYellow: Object.freeze(Color.LightYellow),

        Purple: Object.freeze(Color.Purple),
        DarkPurple: Object.freeze(Color.DarkPurple),
        LightPurple: Object.freeze(Color.LightPurple),

        White: Object.freeze(Color.White),
        Black: Object.freeze(Color.Black),
        Gray: Object.freeze(Color.Gray),

        Brown: Object.freeze(Color.Brown),
        DarkBrown: Object.freeze(Color.DarkBrown),
        LightBrown: Object.freeze(Color.LightBrown),
        
        Orange: Object.freeze(Color.Orange),
        DarkOrange: Object.freeze(Color.DarkOrange),
        LightOrange: Object.freeze(Color.LightOrange),
    });

    static factory: ColorFactory;
    static Null: Color = Object.freeze(new Color());
    
    // Backing Fields
    _r: number;
    _g: number;
    _b: number;
    _a: number;

    // Getters
    get R() { return this._r; }
    get G() { return this._g; }
    get B() { return this._b; }
    get A() { return this._a; }

    // Setters
    set R(value: number) { this._r = NumberEx.ClampInt(value, 0, 255); }
    set G(value: number) { this._g = NumberEx.ClampInt(value, 0, 255); }
    set B(value: number) { this._b = NumberEx.ClampInt(value, 0, 255); }
    set A(value: number) { this._a = NumberEx.ClampInt(value, 0, 255); }

    constructor(red?: number, green?: number, blue?: number, alpha?: number)
    {
        this.R = red || 0;
        this.G = green || 0;
        this.B = blue || 0;
        this.A = alpha || 255;
    }

    Copy(): Color
    {
        let copy = new Color();
        copy.SetFrom(this);
        return copy;
    }

    SetFrom(otherColor: Color): void
    {
        this.R = otherColor.R;
        this.G = otherColor.G;
        this.B = otherColor.B;
        this.A = otherColor.A;
    }

    Set(r: number, g: number, b: number, a?: number): void
    {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a || this.A;
    }

    ToCSSRGB(): string
    {
        let result = `rgb(${this._r}, ${this._g}, ${this._b})`;
        return result;
    }

    // Algorithm not mine. Forgot where I found it. If you're the one originally
    // behind this algorithm, contact me; I'll be sure to credit you.
    ToHexString(): string
    {
        let rHex = this.R.toString(16);
        let gHex = this.G.toString(16);
        let bHex = this.B.toString(16);

        if (rHex.length == 1)
            rHex = '0' + rHex;
        if (gHex.length == 1)
            gHex = '0' + gHex;
        if (bHex.length == 1)
            bHex = '0' + bHex;

        return `#{$rHex}{$gHex}{$bHex}`;
    }

    ToPluginParamRaw(): string
    {
        let baseParam = this.ToPluginParam();
        let raw = JSON.stringify(baseParam);
        return raw;
    }

    ToPluginParam(): ParsedColorParam
    {
        let param = 
        {
            "Red": this.R.toString(),
            "Green": this.G.toString(),
            "Blue": this.B.toString(),
            "Alpha": this.A.toString()
        };

        return param;
    }

    Equals(other: Color): boolean
    {
        return this.R === other.R &&
        this.G === other.G &&
        this.B === other.B &&
        this.A === other.A;
    }

    static FromHex(hex: string): Color
    {
        return this.factory.CreateFromHex(hex);
    }

    static FromPluginParamRaw(param: string): Color
    {
        return this.factory.CreateObjectFrom(param);
    }

    static Lerp(firstColor: Color, secondColor: Color, progress: number)
    {
        var newRed = NumberEx.Lerp(firstColor.R, secondColor.R, progress);
        var newGreen = NumberEx.Lerp(firstColor.G, secondColor.G, progress);
        var newBlue = NumberEx.Lerp(firstColor.B, secondColor.B, progress);
        var newAlpha = NumberEx.Lerp(firstColor.A, secondColor.A, progress);

        var newColor = new Color(newRed, newGreen, newBlue, newAlpha);
        return newColor;
    }

};

// For some reason, unlike the BoDiSy's factories, ColorFactory can't refer to the class of objects it's 
// meant to create; the require() call returns undefined, despite being passed the right path.
// TODO: For consistent code organization, see if you can put ColorFactory back in its own file without
// breaking the Color class's factory methods.

export class ColorFactory extends BaseFactory<Color, ParsedColorParam>
{
    static get ClassOfObjectCreated() { return Color; }

    get Color(): Color { return this.baseObject; } 
    // ^Leave this here for when this class gets put in its own source file again

    protected ApplyNumbers(): void
    {
        var red = Number(this.parsedParam.Red);
        var green = Number(this.parsedParam.Green);
        var blue = Number(this.parsedParam.Blue);
        var alpha = Number(this.parsedParam.Alpha);

        this.Color.Set(red, green, blue, alpha);
    }

    CreateFromHex(hex: string): Color
    {
        // Algorithm credit to Comficker from StackOverflow
        let Color = this.ClassOfObjectCreated;
        hex = this.WithoutHashtag(hex);
        this.EnsureValidHexCode(hex);

        let values = this.SplitHexIntoCodes(hex);
        let r = parseInt(values[0], 16);
        let g = parseInt(values[1], 16);
        let b = parseInt(values[2], 16);

        return new Color(r, g, b); 
    }

    // Mainly helpers
    protected WithoutHashtag(hex: string)
    {
        if (hex.charAt(0) === '#') 
            return hex.substr(1);
        else
            return hex;
    }

    protected EnsureValidHexCode(hex: string): void
    {
        if (this.InvalidHexCode(hex))
        {
            let errorMessage = 'Invalid hex string passed. Needs to include \
            hex values for R, G, and B. Hashtag optional.';
            throw new Error(errorMessage);
        }
    }

    protected InvalidHexCode(hex: string): boolean
    {
        return (hex.length < 2) || (hex.length > 6);
    }

    protected SplitHexIntoCodes(hex: string): string[]
    {
        let r = hex.substring(0, 2);
        let g = hex.substr(2, 4);
        let b = hex.substr(4, 6);
        
        return [r, g, b];
    }

}

SetupColorStatics();

function SetupColorStatics()
{
    Color.factory = new ColorFactory();
}

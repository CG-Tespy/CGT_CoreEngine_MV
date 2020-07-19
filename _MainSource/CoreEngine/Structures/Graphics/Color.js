var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { NumberEx } from '../Extensions/NumberEx';
import { PluginParamObjectFactory as BaseFactory } from '../PluginParams/PluginParamObjectFactory';
var Color = /** @class */ (function () {
    function Color(red, green, blue, alpha) {
        this.R = red || 0;
        this.G = green || 0;
        this.B = blue || 0;
        this.A = alpha || 255;
    }
    Object.defineProperty(Color, "Red", {
        // Defaults
        get: function () { return new Color(255, 0, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "DarkRed", {
        get: function () { return new Color(139, 0, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Pink", {
        get: function () { return new Color(255, 192, 203); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Green", {
        get: function () { return new Color(0, 255, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "DarkGreen", {
        get: function () { return new Color(0, 139, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "LightGreen", {
        get: function () { return new Color(0, 255, 127); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Cyan", {
        get: function () { return new Color(0, 255, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Blue", {
        get: function () { return new Color(0, 0, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "DarkBlue", {
        get: function () { return new Color(0, 0, 139); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "LightBlue", {
        get: function () { return new Color(137, 207, 240); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Yellow", {
        get: function () { return new Color(255, 255, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "DarkYellow", {
        get: function () { return new Color(255, 204, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "LightYellow", {
        get: function () { return new Color(250, 250, 210); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Purple", {
        get: function () { return new Color(255, 0, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "DarkPurple", {
        get: function () { return new Color(48, 25, 52); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "LightPurple", {
        get: function () { return new Color(224, 176, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "White", {
        get: function () { return new Color(255, 255, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Black", {
        get: function () { return new Color(0, 0, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Gray", {
        get: function () { return new Color(128, 128, 128); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Brown", {
        get: function () { return new Color(150, 75, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "DarkBrown", {
        get: function () { return new Color(50, 20, 20); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "LightBrown", {
        get: function () { return new Color(222, 170, 136); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "Orange", {
        get: function () { return new Color(255, 165, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "DarkOrange", {
        get: function () { return new Color(255, 140, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color, "LightOrange", {
        get: function () { return new Color(255, 204, 153); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "R", {
        // Getters
        get: function () { return this._r; },
        // Setters
        set: function (value) { this._r = NumberEx.ClampInt(value, 0, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "G", {
        get: function () { return this._g; },
        set: function (value) { this._g = NumberEx.ClampInt(value, 0, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "B", {
        get: function () { return this._b; },
        set: function (value) { this._b = NumberEx.ClampInt(value, 0, 255); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "A", {
        get: function () { return this._a; },
        set: function (value) { this._a = NumberEx.ClampInt(value, 0, 255); },
        enumerable: false,
        configurable: true
    });
    Color.prototype.Copy = function () {
        var copy = new Color();
        copy.SetFrom(this);
        return copy;
    };
    Color.prototype.SetFrom = function (otherColor) {
        this.R = otherColor.R;
        this.G = otherColor.G;
        this.B = otherColor.B;
        this.A = otherColor.A;
    };
    Color.prototype.Set = function (r, g, b, a) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a || this.A;
    };
    Color.prototype.ToCSSRGB = function () {
        var result = "rgb(" + this._r + ", " + this._g + ", " + this._b + ")";
        return result;
    };
    // Algorithm not mine. Forgot where I found it. If you're the one originally
    // behind this algorithm, contact me; I'll be sure to credit you.
    Color.prototype.ToHexString = function () {
        var rHex = this.R.toString(16);
        var gHex = this.G.toString(16);
        var bHex = this.B.toString(16);
        if (rHex.length == 1)
            rHex = '0' + rHex;
        if (gHex.length == 1)
            gHex = '0' + gHex;
        if (bHex.length == 1)
            bHex = '0' + bHex;
        return "#{$rHex}{$gHex}{$bHex}";
    };
    Color.prototype.ToPluginParamRaw = function () {
        var baseParam = this.ToPluginParam();
        var raw = JSON.stringify(baseParam);
        return raw;
    };
    Color.prototype.ToPluginParam = function () {
        var param = {
            "Red": this.R.toString(),
            "Green": this.G.toString(),
            "Blue": this.B.toString(),
            "Alpha": this.A.toString()
        };
        return param;
    };
    Color.prototype.Equals = function (other) {
        return this.R === other.R &&
            this.G === other.G &&
            this.B === other.B &&
            this.A === other.A;
    };
    Color.FromHex = function (hex) {
        return this.factory.CreateFromHex(hex);
    };
    Color.FromPluginParamRaw = function (param) {
        return this.factory.CreateObjectFrom(param);
    };
    Color.Lerp = function (firstColor, secondColor, progress) {
        var newRed = NumberEx.Lerp(firstColor.R, secondColor.R, progress);
        var newGreen = NumberEx.Lerp(firstColor.G, secondColor.G, progress);
        var newBlue = NumberEx.Lerp(firstColor.B, secondColor.B, progress);
        var newAlpha = NumberEx.Lerp(firstColor.A, secondColor.A, progress);
        var newColor = new Color(newRed, newGreen, newBlue, newAlpha);
        return newColor;
    };
    Color.Cache = Object.freeze({
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
    Color.Null = Object.freeze(new Color());
    return Color;
}());
export { Color };
;
// For some reason, unlike the BoDiSy's factories, ColorFactory can't refer to the class of objects it's 
// meant to create; the require() call returns undefined, despite being passed the right path.
// TODO: For consistent code organization, see if you can put ColorFactory back in its own file without
// breaking the Color class's factory methods.
var ColorFactory = /** @class */ (function (_super) {
    __extends(ColorFactory, _super);
    function ColorFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ColorFactory, "ClassOfObjectCreated", {
        get: function () { return Color; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorFactory.prototype, "Color", {
        get: function () { return this.baseObject; },
        enumerable: false,
        configurable: true
    });
    // ^Leave this here for when this class gets put in its own source file again
    ColorFactory.prototype.ApplyNumbers = function () {
        var red = Number(this.parsedParam.Red);
        var green = Number(this.parsedParam.Green);
        var blue = Number(this.parsedParam.Blue);
        var alpha = Number(this.parsedParam.Alpha);
        this.Color.Set(red, green, blue, alpha);
    };
    ColorFactory.prototype.CreateFromHex = function (hex) {
        // Algorithm credit to Comficker from StackOverflow
        var Color = this.ClassOfObjectCreated;
        hex = this.WithoutHashtag(hex);
        this.EnsureValidHexCode(hex);
        var values = this.SplitHexIntoCodes(hex);
        var r = parseInt(values[0], 16);
        var g = parseInt(values[1], 16);
        var b = parseInt(values[2], 16);
        return new Color(r, g, b);
    };
    // Mainly helpers
    ColorFactory.prototype.WithoutHashtag = function (hex) {
        if (hex.charAt(0) === '#')
            return hex.substr(1);
        else
            return hex;
    };
    ColorFactory.prototype.EnsureValidHexCode = function (hex) {
        if (this.InvalidHexCode(hex)) {
            var errorMessage = 'Invalid hex string passed. Needs to include \
            hex values for R, G, and B. Hashtag optional.';
            throw new Error(errorMessage);
        }
    };
    ColorFactory.prototype.InvalidHexCode = function (hex) {
        return (hex.length < 2) || (hex.length > 6);
    };
    ColorFactory.prototype.SplitHexIntoCodes = function (hex) {
        var r = hex.substring(0, 2);
        var g = hex.substr(2, 4);
        var b = hex.substr(4, 6);
        return [r, g, b];
    };
    return ColorFactory;
}(BaseFactory));
export { ColorFactory };
SetupColorStatics();
function SetupColorStatics() {
    Color.factory = new ColorFactory();
}

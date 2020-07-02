(function () {
    'use strict';

    (function () {
        let extensions = {
            IsOfType(obj, input) {
                let inputIsFunction = typeof input === 'function';
                if (!inputIsFunction) {
                    console.log("Input is not function");
                    throw 'IsOfType only accepts function or class args.';
                }
                let classOfObj = obj.constructor;
                return this.IsOfExactType(obj, input) ||
                    input.isPrototypeOf(classOfObj) ||
                    classOfObj.isPrototypeOf(input);
            },
            IsOfExactType(obj, input) {
                let inputIsFunction = typeof input === 'function';
                if (!inputIsFunction) {
                    throw 'isOfExactType only accepts function or class args.';
                }
                return obj.constructor === input;
            }
        };
        Object.assign(Object, extensions);
    })();

    (function () {
        let extensions = {
            remove(toRemove) {
                let index = this.indexOf(toRemove);
                if (index >= 0)
                    this.splice(index, 1);
            },
            copy() {
                return this.slice();
            },
            Filter(test, context) {
                context = context || this; // context is optional
                let result = [];
                for (let i = 0; i < this.length; i++) {
                    let item = this[i];
                    let passedTest = test.call(context, item) === true;
                    if (passedTest)
                        result.push(item);
                }
                return result;
            },
            clear() {
                while (this.length > 0)
                    this.shift();
            }
        };
        Object.assign(Array.prototype, extensions);
        // Later versions of MV may already provide the following
        Array.prototype.includes = Array.prototype.includes || function (element) {
            for (let i = 0; i < this.length; i++)
                if (this[i] === element)
                    return true;
            return false;
        };
    })();

    (function () {
        let extensions = {
            /**
             * Add a callback function that will be called when the bitmap is loaded.
             * Author: MinusGix
             * @method addLoadListener
             * @param {Function} listener The callback function
             */
            addLoadListener(listener) {
                if (!this.isReady()) {
                    this._loadListeners.push(listener);
                }
                else {
                    // @ts-ignore
                    listener(this);
                }
            },
            removeLoadListener(listener) {
                this._loadListeners.remove(listener);
            },
            hasLoadListener(listener) {
                return this._loadListeners.includes(listener);
            },
            /**
             * Returns a resized version of the bitmap (if it is ready). Note that
             * the aspect ratio may not be the same, based on the passed width and height.
             * @param {number} width
             * @param {number} height
             */
            resized(width, height) {
                if (!this.isReady())
                    return;
                var newBitmap = new Bitmap(width, height);
                newBitmap.blt(this, 0, 0, this.width, this.height, 0, 0, width, height);
                return newBitmap;
            }
        };
        Object.assign(Bitmap.prototype, extensions);
    })();

    (function () {
        let extensions = {
            _subjectAsType(typeWanted) {
                var subject = this.subject();
                if (subject instanceof typeWanted)
                    return subject;
                else
                    return null;
            },
            /**
             * Returns the action's item if it's a skill. Null otherwise.
             * @returns {RPG.Skill} */
            asSkill() {
                var skill = $dataSkills[this.item().id];
                if (skill != undefined)
                    return skill;
                else
                    return null;
            },
            /**
             * Returns the action's item if it's a normal item. Null otherwise.
             * @returns {RPG.Item} */
            asItem() {
                var item = $dataItems[this.item().id];
                if (item != undefined)
                    return item;
                else
                    return null;
            },
            /**
             * Returns this action's subject if the subject is an enemy. Null otherwise.
             * @returns {Game_Enemy}
             */
            subjectAsEnemy() {
                return this._subjectAsType(Game_Enemy);
            },
            /**
             * Returns this action's subject if the subject is an actor. Null otherwise.
             * @returns {Game_Actor}
             */
            subjectAsActor() {
                return this._subjectAsType(Game_Actor);
            },
        };
        Object.assign(Game_Action.prototype, extensions);
    })();

    function GetScaleFactor(firstWidth, firstHeight, secondWidth, secondHeight) {
        // Algorithm credit to Michael Labe from Stack Overflow
        let windowAspect = firstWidth / firstHeight;
        let imageAspect = secondWidth / secondHeight;
        let scaleFactor = 0;
        if (windowAspect > imageAspect)
            scaleFactor = firstHeight / secondHeight;
        else
            scaleFactor = firstWidth / secondWidth;
        return scaleFactor;
    }

    (function () {
        let pixiSpriteChanges = {
            resized(width, height) {
                let newSprite = new PIXI.Sprite(this.texture);
                newSprite.width = width;
                newSprite.height = height;
                return newSprite;
            },
            copy() {
                let newSprite = new PIXI.Sprite(this.texture);
                newSprite.width = this.width;
                newSprite.height = this.height;
                return newSprite;
            },
            resize(width, height) {
                this.width = width;
                this.height = height;
            },
            resizeWhileKeepingAspectFor(targetWidth, targetHeight) {
                let scaleFactor = GetScaleFactor(targetWidth, targetHeight, this.texture.width, this.texture.height);
                this.width = this.texture.width * scaleFactor;
                this.height = this.texture.height * scaleFactor;
            }
        };
        Object.assign(PIXI.Sprite.prototype, pixiSpriteChanges);
    })();

    var SoundType;
    (function (SoundType) {
        SoundType["bgm"] = "bgm";
        SoundType["bgs"] = "bgs";
        SoundType["me"] = "me";
        SoundType["se"] = "se";
        SoundType["null"] = "null";
    })(SoundType || (SoundType = {}));

    class NumberEx {
        static Clamp(num, min, max) {
            return Math.min(Math.max(num, min), max);
        }
        static ClampInt(num, min, max) {
            return Math.floor(this.Clamp(num, min, max));
        }
        static Mod(num1, num2) {
            return ((num1 % num2) + num2) % num2;
        }
        static PadZero(num, length) {
            var s = "" + num;
            while (s.length < length) {
                s = '0' + s;
            }
            return s;
        }
        static Rand(from, to) {
            let num = from;
            let difference = to - from;
            num += Math.random() * difference;
            return num;
        }
        static RandInt(from, to) {
            return Math.floor(this.Rand(from, to));
        }
        static Lerp(firstNum, secondNum, progress) {
            var difference = secondNum - firstNum;
            return firstNum + (difference * progress);
        }
    }

    // Dependencies
    function AlertAboutPlayingNullSoundType() {
        let errMessage = "Cannot play null sound type!";
        alert(errMessage);
    }
    /**
     * Adapted from the Sound Object in the RMMV Script Call List from the RPGMaker.net Discord server.
     * Makes it easier to work with sound files in MV.
    */
    class Sound {
        // Methods
        constructor(fileName, type, volume, pitch, pan) {
            this.type = type;
            this.volume = volume;
            this.pitch = pitch;
            this.pan = pan;
            this.audioParams = {
                name: "null",
                volume: 0,
                pitch: 0,
                pan: 0,
                pos: 0
            };
            this.Name = fileName;
            this.Type = type;
            this.Volume = volume || Sound.DefaultVolume;
            this.Pitch = pitch || Sound.DefaultPitch;
            this.Pan = pan || Sound.DefaultPan;
        }
        // Getters
        get Name() { return this.name; }
        get Type() { return this.type; }
        get Volume() { return this.volume; }
        get Pitch() { return this.pitch; }
        get Pan() { return this.pan; }
        // Setters
        set Name(value) {
            this.name = value;
            this.RemoveExtensionFromName();
            this.audioParams.name = this.name;
        }
        set Type(value) { this.type = value; }
        // The volume, pitch, and pan setters keep the values in valid ranges.
        set Volume(value) {
            this.volume = NumberEx.Clamp(value, Sound.MinVolume, Sound.MaxVolume);
            this.audioParams.volume = this.volume;
        }
        set Pitch(value) {
            this.pitch = NumberEx.Clamp(value, Sound.MinPitch, Sound.MaxPitch);
            this.audioParams.pitch = this.pitch;
        }
        set Pan(value) {
            this.pan = NumberEx.Clamp(value, Sound.MinPan, Sound.MaxPan);
            this.audioParams.pan = this.pan;
        }
        Play() {
            let handlePlayingSound = Sound.soundPlayers.get(this.Type);
            handlePlayingSound(this.audioParams);
        }
        RemoveExtensionFromName() {
            if (this.HasExtensionInName()) {
                let extensionIndex = this.FindExtensionIndex();
                // Don't use the setter here; it'd cause infinite recursion.
                this.name = this.name.substring(0, extensionIndex);
            }
        }
        HasExtensionInName() {
            return this.FindExtensionIndex() >= 0;
        }
        FindExtensionIndex() {
            let extensionStartingCharacter = '.';
            return this.Name.indexOf(extensionStartingCharacter);
        }
        Copy() {
            let copy = new Sound(this.Name, this.Type, this.Volume, this.Pitch, this.Pan);
            return copy;
        }
        toString() {
            return '[object CGT.Sound]';
        }
    }
    Sound.soundPlayers = new Map([
        [SoundType.bgm, AudioManager.playBgm.bind(AudioManager)],
        [SoundType.bgs, AudioManager.playBgs.bind(AudioManager)],
        [SoundType.me, AudioManager.playMe.bind(AudioManager)],
        [SoundType.se, AudioManager.playSe.bind(AudioManager)],
        [SoundType.null, AlertAboutPlayingNullSoundType]
    ]);
    Sound.MinVolume = 0;
    Sound.MaxVolume = 100;
    Sound.DefaultVolume = 50;
    Sound.MinPitch = 50;
    Sound.MaxPitch = 150;
    Sound.DefaultPitch = 100;
    Sound.MinPan = -100;
    Sound.MaxPan = 100;
    Sound.DefaultPan = 0;
    Sound.Null = Object.freeze(new Sound("???", SoundType.bgm, 0, 0, 0));

    var Audio = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Sound: Sound,
        get SoundType () { return SoundType; }
    });

    /**
     * To help create custom types out of Plugin Params.
     */
    class PluginParamObjectFactory {
        static get ClassOfObjectCreated() { return Object; }
        // @ts-ignore
        get ClassOfObjectCreated() { return this.constructor.ClassOfObjectCreated; }
        CreateObjectFrom(param) {
            this.paramToCreateFrom = param;
            this.ParseParamOnce();
            this.baseObject = this.CreateBaseObject();
            this.ApplyParamValuesToBaseObject();
            return this.baseObject;
        }
        ParseParamOnce() {
            this.parsedParam = JSON.parse(this.paramToCreateFrom);
        }
        CreateBaseObject() {
            return new this.ClassOfObjectCreated();
        }
        ApplyParamValuesToBaseObject() {
            this.ApplyPrimitiveValues();
            this.ApplyCustomValues();
        }
        ApplyPrimitiveValues() {
            this.ApplyBooleans();
            this.ApplyNumbers();
            this.ApplyStrings();
        }
        ApplyBooleans() { }
        ApplyNumbers() { }
        ApplyStrings() { }
        ApplyCustomValues() { }
        CreateObjectsFrom(stringifiedParamArr) {
            let inputAsStringArr = JSON.parse(stringifiedParamArr);
            return this.ConvertParamStringsToObjects(inputAsStringArr);
        }
        ConvertParamStringsToObjects(paramStrings) {
            let objects = [];
            for (let i = 0; i < paramStrings.length; i++) {
                let unparsedParam = paramStrings[i];
                let createdObject = this.CreateObjectFrom(unparsedParam);
                objects.push(createdObject);
            }
            return objects;
        }
    }

    class Color {
        constructor(red, green, blue, alpha) {
            this.R = red || 0;
            this.G = green || 0;
            this.B = blue || 0;
            this.A = alpha || 255;
        }
        // Defaults
        static get Red() { return new Color(255, 0, 0); }
        static get DarkRed() { return new Color(139, 0, 0); }
        static get Pink() { return new Color(255, 192, 203); }
        static get Green() { return new Color(0, 255, 0); }
        static get DarkGreen() { return new Color(0, 139, 0); }
        static get LightGreen() { return new Color(0, 255, 127); }
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
        static get DarkBrown() { return new Color(50, 20, 20); }
        static get LightBrown() { return new Color(222, 170, 136); }
        static get Orange() { return new Color(255, 165, 0); }
        static get DarkOrange() { return new Color(255, 140, 0); }
        static get LightOrange() { return new Color(255, 204, 153); }
        // Getters
        get R() { return this._r; }
        get G() { return this._g; }
        get B() { return this._b; }
        get A() { return this._a; }
        // Setters
        set R(value) { this._r = NumberEx.ClampInt(value, 0, 255); }
        set G(value) { this._g = NumberEx.ClampInt(value, 0, 255); }
        set B(value) { this._b = NumberEx.ClampInt(value, 0, 255); }
        set A(value) { this._a = NumberEx.ClampInt(value, 0, 255); }
        Copy() {
            let copy = new Color();
            copy.SetFrom(this);
            return copy;
        }
        SetFrom(otherColor) {
            this.R = otherColor.R;
            this.G = otherColor.G;
            this.B = otherColor.B;
            this.A = otherColor.A;
        }
        Set(r, g, b, a) {
            this.R = r;
            this.G = g;
            this.B = b;
            this.A = a || this.A;
        }
        ToCSSRGB() {
            let result = `rgb(${this._r}, ${this._g}, ${this._b})`;
            return result;
        }
        // Algorithm not mine. Forgot where I found it. If you're the one originally
        // behind this algorithm, contact me; I'll be sure to credit you.
        ToHexString() {
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
        ToPluginParamRaw() {
            let baseParam = this.ToPluginParam();
            let raw = JSON.stringify(baseParam);
            return raw;
        }
        ToPluginParam() {
            let param = {
                "Red": this.R.toString(),
                "Green": this.G.toString(),
                "Blue": this.B.toString(),
                "Alpha": this.A.toString()
            };
            return param;
        }
        Equals(other) {
            return this.R === other.R &&
                this.G === other.G &&
                this.B === other.B &&
                this.A === other.A;
        }
        static FromHex(hex) {
            return this.factory.CreateFromHex(hex);
        }
        static FromPluginParamRaw(param) {
            return this.factory.CreateObjectFrom(param);
        }
        static Lerp(firstColor, secondColor, progress) {
            var newRed = NumberEx.Lerp(firstColor.R, secondColor.R, progress);
            var newGreen = NumberEx.Lerp(firstColor.G, secondColor.G, progress);
            var newBlue = NumberEx.Lerp(firstColor.B, secondColor.B, progress);
            var newAlpha = NumberEx.Lerp(firstColor.A, secondColor.A, progress);
            var newColor = new Color(newRed, newGreen, newBlue, newAlpha);
            return newColor;
        }
    }
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
    // For some reason, unlike the BoDiSy's factories, ColorFactory can't refer to the class of objects it's 
    // meant to create; the require() call returns undefined, despite being passed the right path.
    // TODO: For consistent code organization, see if you can put ColorFactory back in its own file without
    // breaking the Color class's factory methods.
    class ColorFactory extends PluginParamObjectFactory {
        static get ClassOfObjectCreated() { return Color; }
        get Color() { return this.baseObject; }
        // ^Leave this here for when this class gets put in its own source file again
        ApplyNumbers() {
            var red = Number(this.parsedParam.Red);
            var green = Number(this.parsedParam.Green);
            var blue = Number(this.parsedParam.Blue);
            var alpha = Number(this.parsedParam.Alpha);
            this.Color.Set(red, green, blue, alpha);
        }
        CreateFromHex(hex) {
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
        WithoutHashtag(hex) {
            if (hex.charAt(0) === '#')
                return hex.substr(1);
            else
                return hex;
        }
        EnsureValidHexCode(hex) {
            if (this.InvalidHexCode(hex)) {
                let errorMessage = 'Invalid hex string passed. Needs to include \
            hex values for R, G, and B. Hashtag optional.';
                throw new Error(errorMessage);
            }
        }
        InvalidHexCode(hex) {
            return (hex.length < 2) || (hex.length > 6);
        }
        SplitHexIntoCodes(hex) {
            let r = hex.substring(0, 2);
            let g = hex.substr(2, 4);
            let b = hex.substr(4, 6);
            return [r, g, b];
        }
    }
    SetupColorStatics();
    function SetupColorStatics() {
        Color.factory = new ColorFactory();
    }

    var Graphics = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Color: Color,
        ColorFactory: ColorFactory
    });

    var Extensions = /*#__PURE__*/Object.freeze({
        __proto__: null,
        NumberEx: NumberEx
    });

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
    class File {
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

    var IO = /*#__PURE__*/Object.freeze({
        __proto__: null,
        File: File
    });

    let CGT = {
        version: 1.01,
        path: "./_CGT1.6.x/",
        Core: {
            path: "./_CGT1.6.x/CoreEngine/",
            Audio: Audio,
            Extensions: Extensions,
            Graphics: Graphics,
            IO: IO,
        },
    };
    // @ts-ignore
    window.CGT = CGT;

    /*:
     * @plugindesc Mainly contains utility code that other CGT scripts rely on.
     * @author CG-Tespy – https://github.com/CG-Tespy
     * @help This is version 0.67 of this plugin. For RMMV versions 1.5.1 and above.

    Make sure to credit me (and any of this plugin's contributing coders)
    if you're using this plugin in your game (include the names and webpage links).

    Other code contributors:
    MinusGix
    Endless Illusion Software – http://endlessillusoft.com/
    Comficker - https://gist.github.com/comficker
    rob - https://stackoverflow.com/users/563532/rob

    */
    console.log(CGT);
    /*
    let filePath = "data/BoDiSyPages/someTextFile.txt";
    let File = CGT.Core.IO.File;
    let fileText: string;

    File.Read(filePath).then(txt => fileText);
    console.log(fileText);
    */

}());
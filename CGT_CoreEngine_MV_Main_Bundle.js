(function () {
    'use strict';

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
        let scaleFactor = undefined;
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

    class CGTIterator {
        constructor(iteratee) {
            this.iteratee = iteratee;
        }
        get Value() { return this.value; }
    }

    class ArrayIterator extends CGTIterator {
        constructor(arr) {
            super(arr);
            this.arr = arr;
            this.valueIndex = -1;
        }
        get ValueIndex() { return this.valueIndex; }
        Next() {
            if (!this.HasNext()) {
                throw 'There is no next element for this iterator to return.';
            }
            this.valueIndex++;
            this.UpdateValue();
            return this.value;
        }
        HasNext() {
            return this.arr.length > 1 && this.valueIndex < this.arr.length - 1;
        }
        UpdateValue() {
            this.value = this.arr[this.valueIndex];
        }
        Previous() {
            if (!this.HasPrevious()) {
                throw 'There is no previous element for this iterator to return.';
            }
            this.valueIndex--;
            this.UpdateValue();
            return this.value;
        }
        HasPrevious() {
            return this.arr.length > 1 && this.valueIndex > 0;
        }
    }

    class ObjectEx {
        static IsOfType(obj, input) {
            let inputIsFunction = typeof input === 'function';
            if (!inputIsFunction) {
                console.log("Input is not function");
                throw 'IsOfType only accepts function or class args.';
            }
            let classOfObj = obj.constructor;
            return this.IsOfExactType(obj, input) ||
                input.isPrototypeOf(classOfObj) ||
                classOfObj.isPrototypeOf(input);
        }
        static IsOfExactType(obj, input) {
            let inputIsFunction = typeof input === 'function';
            if (!inputIsFunction) {
                throw 'isOfExactType only accepts function or class args.';
            }
            return obj.constructor === input;
        }
    }

    class ArrayEx {
        static Remove(arr, toRemove) {
            let index = arr.indexOf(toRemove);
            if (index >= 0)
                arr.splice(index, 1);
        }
        static Copy(arr) {
            return arr.slice();
        }
        static Filter(arr, test, context) {
            context = context || arr; // context is optional
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                let item = this[i];
                let passedTest = test.call(context, item) === true;
                if (passedTest)
                    result.push(item);
            }
            return result;
        }
        static Clear(arr) {
            while (arr.length > 0)
                arr.shift();
        }
    }

    class TightArray extends Array {
        constructor(capacity) {
            super(capacity);
            if (ObjectEx.IsOfType(capacity, Number)) {
                this.capacity = capacity;
                ArrayEx.Clear(this); // To ensure this starts with nothing in it
            }
            else
                this.capacity = this.length * 2;
        }
        get capacity() { return this._capacity; }
        set capacity(value) { this._capacity = Math.max(1, value); }
        push(...args) {
            for (const item of args) {
                if (this.length == this.capacity)
                    this.shift();
                super.push(item);
            }
            return this.length;
        }
        hasRoom() {
            return this.length < this.capacity;
        }
    }

    class DestructibleCache {
        constructor(capacity) {
            capacity = capacity || 10;
            this.items = new TightArray(capacity);
            this.Capacity = capacity;
            this.AutoWipe = true;
        }
        get Items() { return this.items; }
        get Capacity() { return this.capacity; }
        set Capacity(value) {
            this.capacity = value;
            this.Items.capacity = value;
        }
        get AutoWipe() { return this.autoWipe; }
        set AutoWipe(value) { this.autoWipe = value; }
        Push(destructible) {
            this.MakeRoomIfNecessary();
            this.Items.push(destructible);
        }
        MakeRoomIfNecessary() {
            if (!this.HasRoom()) {
                let removed = this.Items.shift();
                if (this.AutoWipe)
                    removed.destroy();
            }
        }
        HasRoom() {
            return this.items.hasRoom();
        }
        Remove(destructible) {
            let thisHadDestructible = this.Items.includes(destructible);
            if (thisHadDestructible) {
                ArrayEx.Remove(this.Items, destructible);
                if (this.AutoWipe)
                    destructible.destroy();
            }
            let removed = thisHadDestructible;
            return removed;
        }
        Clear() {
            if (this.AutoWipe)
                this.ClearAndWipe();
            else
                ArrayEx.Clear(this.Items);
        }
        ClearAndWipe() {
            for (const destructible of this.Items) {
                destructible.destroy();
            }
            ArrayEx.Clear(this.Items);
        }
    }

    /**
     * Only here to support legacy plugins. Use Map instead when you can.
     */
    class Dictionary {
        constructor() {
            // The keys always have the same indexes as their values.
            this.keys = [];
            this.values = [];
        }
        get Keys() { return this.keys; }
        get Values() { return this.values; }
        get Length() { return this.keys.length; }
        // Methods
        /**
         * Adds the passed key-value pair to this dictionary. If the key was
         * already added, the value is overwritten.
         * */
        Add(key, value) {
            if (this.HasKey(key))
                this.MapNewValueToExistingKey(value, key);
            else
                this.RegisterNewKeyValuePair(key, value);
        }
        MapNewValueToExistingKey(value, key) {
            let index = this.keys.indexOf(key);
            this.values[index] = value;
        }
        RegisterNewKeyValuePair(key, value) {
            this.keys.push(key);
            this.values.push(value);
        }
        /**
         * Removes the key (and its mapped value) from this dictionary.
         * Returns true if successful, false otherwise.
         *  */
        Remove(key) {
            if (this.HasKey(key)) {
                let index = this.keys.indexOf(key);
                this.RemoveKeyValuePairAtIndex(index);
                return true;
            }
            return false;
        }
        RemoveKeyValuePairAtIndex(index) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
        /** Returns the value mapped to the passed key, if there is one. Returns null otherwise. */
        Get(key) {
            if (this.HasKey(key)) {
                let index = this.GetKeyIndex(key);
                return this.ValueAtThatSameIndex(index);
            }
            else
                return null;
        }
        GetKeyIndex(key) {
            return this.keys.indexOf(key);
        }
        ValueAtThatSameIndex(index) {
            return this.values[index];
        }
        GetValueAtIndex(index) {
            if (this.IndexIsValid(index))
                return this.values[index];
        }
        IndexIsValid(index) {
            return index >= 0 && index < this.values.length;
        }
        HasKey(key) {
            return this.keys.includes(key);
        }
        HasValue(value) {
            return this.values.includes(value);
        }
        /** Removes all key-value pairs from this dictionary. */
        Clear() {
            this.keys = [];
            this.values = [];
        }
    }

    var Collections = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ArrayIterator: ArrayIterator,
        CGTIterator: CGTIterator,
        DestructibleCache: DestructibleCache,
        Dictionary: Dictionary,
        TightArray: TightArray
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

    class BitmapEx {
        /**
         * Add a callback function that will be called when the bitmap is loaded.
         * Author: MinusGix
         */
        AddLoadListener(bitmap, listener) {
            if (!bitmap.isReady()) {
                // @ts-ignore
                bitmap._loadListeners.push(listener);
            }
            else {
                listener(bitmap);
            }
        }
        RemoveLoadListener(bitmap, listener) {
            // @ts-ignore
            ArrayEx.Remove(bitmap._loadListeners, listener);
        }
        HasLoadListener(bitmap, listener) {
            // @ts-ignore
            return bitmap._loadListeners.includes(listener);
        }
        /**
         * Returns a resized version of the bitmap (if it is ready). Note that
         * the aspect ratio may not be the same, based on the passed width and height.
         */
        Resized(bitmap, width, height) {
            if (!bitmap.isReady())
                return;
            var newBitmap = new Bitmap(width, height);
            newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, width, height);
            return newBitmap;
        }
    }

    class Game_ActionEx {
        /** Returns the action's item if it's a skill. Null otherwise. */
        static AsSkill(action) {
            var skill = $dataSkills[action.item().id];
            if (skill != undefined)
                return skill;
            else
                return null;
        }
        /** Returns the action's item if it's a normal item. Null otherwise. */
        static AsItem(action) {
            var item = $dataItems[action.item().id];
            if (item != undefined)
                return item;
            else
                return null;
        }
        /** Returns this action's subject if the subject is an enemy. Null otherwise. */
        static SubjectAsEnemy(action) {
            return Game_ActionEx.SubjectAsType(action, Game_Enemy);
        }
        static SubjectAsType(action, typeWanted) {
            var subject = action.subject();
            if (subject instanceof typeWanted)
                return subject;
            else
                return null;
        }
        /** Returns this action's subject if the subject is an actor. Null otherwise. */
        static SubjectAsActor(action) {
            return Game_ActionEx.SubjectAsType(action, Game_Actor);
        }
    }

    class PIXISpriteEx {
        static Resized(sprite, width, height) {
            let newSprite = new PIXI.Sprite(sprite.texture);
            newSprite.width = width;
            newSprite.height = height;
            return newSprite;
        }
        static Copy(sprite) {
            let newSprite = new PIXI.Sprite(sprite.texture);
            newSprite.width = sprite.width;
            newSprite.height = sprite.height;
            return newSprite;
        }
        static Resize(sprite, width, height) {
            sprite.width = width;
            sprite.height = height;
        }
        static ResizeWhileKeepingAspectFor(sprite, targetWidth, targetHeight) {
            let scaleFactor = GetScaleFactor(targetWidth, targetHeight, sprite.texture.width, sprite.texture.height);
            sprite.width = sprite.texture.width * scaleFactor;
            sprite.height = sprite.texture.height * scaleFactor;
        }
    }

    var Extensions = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ArrayEx: ArrayEx,
        BitmapEx: BitmapEx,
        Game_ActionEx: Game_ActionEx,
        NumberEx: NumberEx,
        ObjectEx: ObjectEx,
        PIXISpriteEx: PIXISpriteEx
    });

    class Event {
        /** Throws an exception if a negative number of args are passed. */
        constructor(argCount = 0) {
            this.callbacks = new Map;
            this.argCount = argCount;
            this.callbacks = new Map();
            this.invocationStr = '';
            this.funcToCall = null;
            this.callerName = 'caller';
            this.CheckIfArgCountIsValid(argCount);
            this.SetupCallbackInvocationString();
        }
        // Getters
        get ArgCount() { return this.argCount; }
        CheckIfArgCountIsValid(argCount) {
            if (argCount < 0) {
                let message = 'Cannot init CGT Event with a negative arg count.';
                alert(message);
                throw message;
            }
        }
        AddListener(func, caller = null) {
            if (this.callbacks.get(caller) == null)
                this.callbacks.set(caller, []);
            this.callbacks.get(caller).push(func);
        }
        RemoveListener(func, caller = null) {
            if (this.callbacks.get(caller) == null)
                return;
            let callbackArr = this.callbacks.get(caller);
            ArrayEx.Remove(callbackArr, func);
        }
        /**
         * Invokes all callbacks registered under this event. Throws an exception if an inappropriate
         * number of args is passed.
         * */
        Invoke(...args) {
            // Safety
            if (args.length != this.ArgCount) {
                let message = `ERROR: call to Event invoke() passed wrong amount of arguments. \
            Amount passed: ${args.length} Amount Needed: ${this.ArgCount}`;
                //alert(message);
                throw message;
            }
            // Going through the callers...
            let callers = Array.from(this.callbacks.keys());
            for (let i = 0; i < callers.length; i++) {
                let caller = callers[i];
                // Go through all the funcs registered under the caller, and execute them one by 
                // one with this object's invocation string.
                let toExecute = this.callbacks.get(caller);
                for (let i = 0; i < toExecute.length; i++) {
                    this.funcToCall = toExecute[i];
                    eval(this.invocationStr);
                }
            }
        }
        SetupCallbackInvocationString() {
            this.invocationStr = 'this.funcToCall.call(' + this.callerName;
            if (this.ArgCount > 0)
                this.invocationStr += ', ';
            else
                this.invocationStr += ')';
            for (let i = 0; i < this.ArgCount; i++) {
                let argString = 'arguments[' + i + ']';
                if (i == this.ArgCount - 1) // Are we at the last arg?
                    argString += ');';
                else
                    argString += ', ';
                this.invocationStr += argString;
            }
        }
        toString() {
            return '[object CGT.Core.Utils.Event]';
        }
    }

    class SignalerImplementation {
        constructor() {
            this.inputEvents = new Map();
            this.inputs = [
                'tab',
                'ok',
                'shift',
                'control',
                'escape',
                'pageup',
                'pagedown',
                'left',
                'up',
                'right',
                'down',
                'debug'
            ];
            this.inputPressed = new Event(1);
            this.inputRepeated = new Event(1);
            this.inputTriggered = new Event(1);
            this.inputLongPressed = new Event(1);
            this.InitInputEventDict();
            this.inputCheckFuncs = Array.from(this.inputEvents.keys());
        }
        get InputPressed() { return this.inputPressed; }
        get InputRepeated() { return this.inputRepeated; }
        get InputTriggered() { return this.inputTriggered; }
        get InputLongPressed() { return this.inputLongPressed; }
        InitInputEventDict() {
            this.inputEvents.set(Input.isPressed, this.InputPressed);
            this.inputEvents.set(Input.isRepeated, this.InputRepeated);
            this.inputEvents.set(Input.isTriggered, this.InputTriggered);
            this.inputEvents.set(Input.isLongPressed, this.InputLongPressed);
        }
        HandleInputSignaling() {
            for (let currentInput of this.inputs) {
                for (let userEnteredInput of this.inputCheckFuncs) {
                    if (userEnteredInput.call(Input, currentInput) === true) {
                        let eventToInvoke = this.inputEvents.get(userEnteredInput);
                        eventToInvoke.Invoke(currentInput);
                    }
                }
            }
        }
    }
    let InputSignaler = new SignalerImplementation();

    var InputCode;
    (function (InputCode) {
        InputCode["tab"] = "tab";
        InputCode["ok"] = "ok";
        InputCode["enter"] = "ok";
        InputCode["space"] = "ok";
        InputCode["Z"] = "ok";
        InputCode["shift"] = "shift";
        InputCode["control"] = "control";
        InputCode["alt"] = "control";
        InputCode["escape"] = "escape";
        InputCode["numpad0"] = "escape";
        InputCode["insert"] = "escape";
        InputCode["X"] = "escape";
        InputCode["pageUp"] = "pageup";
        InputCode["Q"] = "pageup";
        InputCode["pageDown"] = "pagedown";
        InputCode["W"] = "pagedown";
        InputCode["leftArrow"] = "left";
        InputCode["numpad4"] = "left";
        InputCode["upArrow"] = "up";
        InputCode["numpad8"] = "up";
        InputCode["rightArrow"] = "right";
        InputCode["numpad6"] = "right";
        InputCode["downArrow"] = "down";
        InputCode["numpad2"] = "down";
        InputCode["f9"] = "debug";
        InputCode["null"] = "null";
    })(InputCode || (InputCode = {}));

    class InputObserver {
        constructor() {
            this.ListenForInputs();
        }
        ListenForInputs() {
            InputSignaler.InputLongPressed.AddListener(this.OnInputLongPressed, this);
            InputSignaler.InputPressed.AddListener(this.OnInputPressed, this);
            InputSignaler.InputTriggered.AddListener(this.OnInputTriggered, this);
            InputSignaler.InputRepeated.AddListener(this.OnInputRepeated, this);
        }
        // Override any one of these
        OnInputTriggered(input) { }
        OnInputPressed(input) { }
        OnInputLongPressed(input) { }
        OnInputRepeated(input) { }
        Destroy() {
            this.UnlistenForInputs();
        }
        UnlistenForInputs() {
            InputSignaler.InputLongPressed.RemoveListener(this.OnInputLongPressed, this);
            InputSignaler.InputPressed.RemoveListener(this.OnInputPressed, this);
            InputSignaler.InputTriggered.RemoveListener(this.OnInputTriggered, this);
            InputSignaler.InputRepeated.RemoveListener(this.OnInputRepeated, this);
        }
    }
    InputObserver.Null = Object.freeze(new InputObserver());

    AttachInputSignalerToScenes();
    function AttachInputSignalerToScenes() {
        let oldSceneUpdate = Scene_Base.prototype.update;
    }

    // Credit to Dr. Axel Rauschmayer for this
    function MapToJSON(map) {
        return JSON.stringify([...map]);
    }
    function JSONToMap(json) {
        return new Map(JSON.parse(json));
    }

    /**
     * Allows working with files in a browser-friendly manner.
     */
    class File {
        static get FileKey() { return "CGTFiles"; }
        static get FilesStored() { return this.filesStored; }
        ;
        static InitFromLocalStorage() {
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
        static ReadSync(path) {
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
        static Read(path, onFileReadFinished) {
            fetch(path)
                .then(response => response.text())
                .then(onFileReadFinished);
        }
        /**
         * Synchronously writes a "file" to browser storage with the passed key.
         * If the key is already tied to a "file", said "file" gets overwritten.
         */
        static WriteBrowSync(key, contents) {
            this.FilesStored.set(key, contents);
            this.SyncToLocalStorage();
        }
        /** Syncs the local storage's CGT "files" with what this has. */
        static SyncToLocalStorage() {
            localStorage.setItem(this.filesKey, MapToJSON(this.FilesStored));
        }
        /**
         * Synchronously reads a "file" from browser storage with the passed key.
         * If there is no "file" tied to the key, you get an empty string.
         */
        static ReadBrowSync(key) {
            let file = this.FilesStored.get(key);
            return file || "";
        }
    }
    File.filesStored = new Map();
    File.filesKey = "CGTFiles";

    File.InitFromLocalStorage();

    var IO = /*#__PURE__*/Object.freeze({
        __proto__: null,
        File: File
    });

    class Font {
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

    let Callbacks = SetupEvents();
    function SetupEvents() {
        let callbacks = {
            TitleScreenStart: new Event(0),
            BattleStart: new Event(0),
            BattleEnd: new Event(1),
            DamageExecute: new Event(2),
            EnemyDeath: new Event(1),
        };
        return callbacks;
    }
    HookUpCallbacks();
    function HookUpCallbacks() {
        // Funcs to alias
        let oldSceneTitleStart = Scene_Title.prototype.start;
        let oldStartBattle = BattleManager.startBattle;
        let oldEndBattle = BattleManager.endBattle;
        let oldExecuteDamage = Game_Action.prototype.executeDamage;
        let oldEnemyDeath = Game_Enemy.prototype.die;
        // Func aliases
        function NewSceneTitleStart() {
            oldSceneTitleStart.call(this);
            Callbacks.TitleScreenStart.Invoke();
        }
        function NewStartBattle() {
            oldStartBattle.call(this);
            Callbacks.BattleStart.Invoke();
        }
        function NewEndBattle(result) {
            oldEndBattle.call(this, result);
            Callbacks.BattleEnd.Invoke(result);
        }
        function NewExecuteDamage(target, value) {
            oldExecuteDamage.call(this, target, value);
            Callbacks.DamageExecute.Invoke(target, value);
        }
        function NewEnemyDie() {
            oldEnemyDeath.call(this);
            Callbacks.EnemyDeath.Invoke(this);
        }
        ApplyFuncAliases();
        function ApplyFuncAliases() {
            Scene_Title.prototype.start = NewSceneTitleStart;
            BattleManager.startBattle = NewStartBattle;
            BattleManager.endBattle = NewEndBattle;
            Game_Action.prototype.executeDamage = NewExecuteDamage;
            Game_Enemy.prototype.die = NewEnemyDie;
        }
    }

    var Utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetScaleFactor: GetScaleFactor,
        Event: Event,
        Callbacks: Callbacks,
        MapToJSON: MapToJSON,
        JSONToMap: JSONToMap
    });

    let CGT = {
        version: 1.01,
        Core: {
            Audio: Audio,
            Collections: Collections,
            Extensions: Extensions,
            Graphics: Graphics,
            IO: IO,
            Utils: Utils,
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
    Dr. Axel Rauschmayer - https://2ality.com/

    */
    console.log(CGT);
    let filePath = "data/BoDiSyPages/someTextFile.txt";
    let File$1 = CGT.Core.IO.File;
    let fileText = File$1.ReadSync(filePath);
    console.log(fileText);

}());

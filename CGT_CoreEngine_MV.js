(function () {
    'use strict';

    var __values = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var ArrayEx = /** @class */ (function () {
        function ArrayEx() {
        }
        ArrayEx.Remove = function (arr, toRemove) {
            var index = arr.indexOf(toRemove);
            if (index >= 0)
                arr.splice(index, 1);
        };
        ArrayEx.Copy = function (arr) {
            return arr.slice();
        };
        ArrayEx.Filter = function (arr, test, context) {
            context = context || arr; // context is optional
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                var passedTest = test.call(context, item) === true;
                if (passedTest)
                    result.push(item);
            }
            return result;
        };
        ArrayEx.Clear = function (arr) {
            while (arr.length > 0)
                arr.shift();
        };
        /**
         * MV 1.5.1 doesn't support the Array.from function, so this works as a replacement.
         * @param iterable
         */
        ArrayEx.From = function (iterable) {
            var e_1, _a;
            var result = [];
            try {
                for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                    var element = iterable_1_1.value;
                    result.push(element);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        };
        ArrayEx.Includes = function (arr, item) {
            var e_2, _a;
            try {
                for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                    var element = arr_1_1.value;
                    if (element === item)
                        return true;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        };
        return ArrayEx;
    }());

    (function () {
        var extensions = {
            /**
             * Add a callback function that will be called when the bitmap is loaded.
             * Author: MinusGix
             * @method addLoadListener
             * @param {Function} listener The callback function
             */
            addLoadListener: function (listener) {
                if (!this.isReady()) {
                    this._loadListeners.push(listener);
                }
                else {
                    // @ts-ignore
                    listener(this);
                }
            },
            removeLoadListener: function (listener) {
                this._loadListeners.remove(listener);
            },
            hasLoadListener: function (listener) {
                return ArrayEx.Includes(this._loadListeners, listener);
            },
            /**
             * Returns a resized version of the bitmap (if it is ready). Note that
             * the aspect ratio may not be the same, based on the passed width and height.
             * @param {number} width
             * @param {number} height
             */
            resized: function (width, height) {
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
        var extensions = {
            _subjectAsType: function (typeWanted) {
                var subject = this.subject();
                if (subject instanceof typeWanted)
                    return subject;
                else
                    return null;
            },
            /**
             * Returns the action's item if it's a skill. Null otherwise.
             * @returns {RPG.Skill} */
            asSkill: function () {
                var skill = $dataSkills[this.item().id];
                if (skill != undefined)
                    return skill;
                else
                    return null;
            },
            /**
             * Returns the action's item if it's a normal item. Null otherwise.
             * @returns {RPG.Item} */
            asItem: function () {
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
            subjectAsEnemy: function () {
                return this._subjectAsType(Game_Enemy);
            },
            /**
             * Returns this action's subject if the subject is an actor. Null otherwise.
             * @returns {Game_Actor}
             */
            subjectAsActor: function () {
                return this._subjectAsType(Game_Actor);
            },
        };
        Object.assign(Game_Action.prototype, extensions);
    })();

    function GetScaleFactor(firstWidth, firstHeight, secondWidth, secondHeight) {
        // Algorithm credit to Michael Labe from Stack Overflow
        var windowAspect = firstWidth / firstHeight;
        var imageAspect = secondWidth / secondHeight;
        var scaleFactor = undefined;
        if (windowAspect > imageAspect)
            scaleFactor = firstHeight / secondHeight;
        else
            scaleFactor = firstWidth / secondWidth;
        return scaleFactor;
    }

    (function () {
        var pixiSpriteChanges = {
            resized: function (width, height) {
                var newSprite = new PIXI.Sprite(this.texture);
                newSprite.width = width;
                newSprite.height = height;
                return newSprite;
            },
            copy: function () {
                var newSprite = new PIXI.Sprite(this.texture);
                newSprite.width = this.width;
                newSprite.height = this.height;
                return newSprite;
            },
            resize: function (width, height) {
                this.width = width;
                this.height = height;
            },
            resizeWhileKeepingAspectFor: function (targetWidth, targetHeight) {
                var scaleFactor = GetScaleFactor(targetWidth, targetHeight, this.texture.width, this.texture.height);
                this.width = this.texture.width * scaleFactor;
                this.height = this.texture.height * scaleFactor;
            }
        };
        Object.assign(PIXI.Sprite.prototype, pixiSpriteChanges);
    })();

    var Event = /** @class */ (function () {
        /** Throws an exception if a negative number of args are passed. */
        function Event(argCount) {
            if (argCount === void 0) { argCount = 0; }
            this.callbacks = new Map;
            this.argCount = argCount;
            this.callbacks = new Map();
            this.invocationStr = '';
            this.funcToCall = null;
            this.callerName = 'caller';
            this.CheckIfArgCountIsValid(argCount);
            this.SetupCallbackInvocationString();
        }
        Object.defineProperty(Event.prototype, "ArgCount", {
            // Getters
            get: function () { return this.argCount; },
            enumerable: false,
            configurable: true
        });
        Event.prototype.CheckIfArgCountIsValid = function (argCount) {
            if (argCount < 0) {
                var message = 'Cannot init CGT Event with a negative arg count.';
                alert(message);
                throw message;
            }
        };
        Event.prototype.AddListener = function (func, caller) {
            if (caller === void 0) { caller = null; }
            if (this.callbacks.get(caller) == null)
                this.callbacks.set(caller, []);
            this.callbacks.get(caller).push(func);
        };
        Event.prototype.RemoveListener = function (func, caller) {
            if (caller === void 0) { caller = null; }
            if (this.callbacks.get(caller) == null)
                return;
            var callbackArr = this.callbacks.get(caller);
            ArrayEx.Remove(callbackArr, func);
        };
        /**
         * Invokes all callbacks registered under this event. Throws an exception if an inappropriate
         * number of args is passed.
         * */
        Event.prototype.Invoke = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Safety
            if (args.length != this.ArgCount) {
                var message = "ERROR: call to Event invoke() passed wrong amount of arguments.             Amount passed: " + args.length + " Amount Needed: " + this.ArgCount;
                //alert(message);
                throw message;
            }
            // Going through the callers...
            var callers = ArrayEx.From(this.callbacks.keys());
            for (var i = 0; i < callers.length; i++) {
                var caller = callers[i];
                // Go through all the funcs registered under the caller, and execute them one by 
                // one with this object's invocation string.
                var toExecute = this.callbacks.get(caller);
                for (var i_1 = 0; i_1 < toExecute.length; i_1++) {
                    this.funcToCall = toExecute[i_1];
                    eval(this.invocationStr);
                }
            }
        };
        Event.prototype.SetupCallbackInvocationString = function () {
            this.invocationStr = 'this.funcToCall.call(' + this.callerName;
            if (this.ArgCount > 0)
                this.invocationStr += ', ';
            else
                this.invocationStr += ')';
            for (var i = 0; i < this.ArgCount; i++) {
                var argString = 'arguments[' + i + ']';
                if (i == this.ArgCount - 1) // Are we at the last arg?
                    argString += ');';
                else
                    argString += ', ';
                this.invocationStr += argString;
            }
        };
        Event.prototype.toString = function () {
            return '[object CGT.Core.Utils.Event]';
        };
        return Event;
    }());

    var oldDataManagerOnLoad = DataManager.onLoad;
    var DataManagerExtensions = /** @class */ (function () {
        function DataManagerExtensions() {
            this.filesLoaded = 0;
            this.databaseLoaded = 'databaseLoaded';
            this.DoneLoading = new Event();
        }
        Object.defineProperty(DataManagerExtensions.prototype, "FilesToLoad", {
            get: function () {
                // @ts-ignore
                return this._databaseFiles.length;
            },
            enumerable: false,
            configurable: true
        });
        DataManagerExtensions.prototype.onLoad = function (object) {
            oldDataManagerOnLoad.call(this, object);
            this.filesLoaded++;
            if (this.filesLoaded == this.FilesToLoad)
                this.DoneLoading.Invoke();
        };
        return DataManagerExtensions;
    }());
    var extensions = new DataManagerExtensions();
    Object.assign(DataManager, extensions);

    var SoundType;
    (function (SoundType) {
        SoundType["bgm"] = "bgm";
        SoundType["bgs"] = "bgs";
        SoundType["me"] = "me";
        SoundType["se"] = "se";
        SoundType["null"] = "null";
    })(SoundType || (SoundType = {}));

    var NumberEx = /** @class */ (function () {
        function NumberEx() {
        }
        NumberEx.Clamp = function (num, min, max) {
            return Math.min(Math.max(num, min), max);
        };
        NumberEx.ClampInt = function (num, min, max) {
            return Math.floor(this.Clamp(num, min, max));
        };
        NumberEx.Mod = function (num1, num2) {
            return ((num1 % num2) + num2) % num2;
        };
        NumberEx.PadZero = function (num, length) {
            var s = "" + num;
            while (s.length < length) {
                s = '0' + s;
            }
            return s;
        };
        NumberEx.Rand = function (from, to) {
            var num = from;
            var difference = to - from;
            num += Math.random() * difference;
            return num;
        };
        NumberEx.RandInt = function (from, to) {
            return Math.floor(this.Rand(from, to));
        };
        NumberEx.Lerp = function (firstNum, secondNum, progress) {
            var difference = secondNum - firstNum;
            return firstNum + (difference * progress);
        };
        return NumberEx;
    }());

    // Dependencies
    function AlertAboutPlayingNullSoundType() {
        var errMessage = "Cannot play null sound type!";
        alert(errMessage);
    }
    /**
     * Adapted from the Sound Object in the RMMV Script Call List from the RPGMaker.net Discord server.
     * Makes it easier to work with sound files in MV.
    */
    var Sound = /** @class */ (function () {
        // Methods
        function Sound(fileName, type, volume, pitch, pan) {
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
        Object.defineProperty(Sound.prototype, "Name", {
            // Getters
            get: function () { return this.name; },
            // Setters
            set: function (value) {
                this.name = value;
                this.RemoveExtensionFromName();
                this.audioParams.name = this.name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sound.prototype, "Type", {
            get: function () { return this.type; },
            set: function (value) { this.type = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sound.prototype, "Volume", {
            get: function () { return this.volume; },
            // The volume, pitch, and pan setters keep the values in valid ranges.
            set: function (value) {
                this.volume = NumberEx.Clamp(value, Sound.MinVolume, Sound.MaxVolume);
                this.audioParams.volume = this.volume;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sound.prototype, "Pitch", {
            get: function () { return this.pitch; },
            set: function (value) {
                this.pitch = NumberEx.Clamp(value, Sound.MinPitch, Sound.MaxPitch);
                this.audioParams.pitch = this.pitch;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sound.prototype, "Pan", {
            get: function () { return this.pan; },
            set: function (value) {
                this.pan = NumberEx.Clamp(value, Sound.MinPan, Sound.MaxPan);
                this.audioParams.pan = this.pan;
            },
            enumerable: false,
            configurable: true
        });
        Sound.prototype.Play = function () {
            var handlePlayingSound = Sound.soundPlayers.get(this.Type);
            handlePlayingSound(this.audioParams);
        };
        Sound.prototype.RemoveExtensionFromName = function () {
            if (this.HasExtensionInName()) {
                var extensionIndex = this.FindExtensionIndex();
                // Don't use the setter here; it'd cause infinite recursion.
                this.name = this.name.substring(0, extensionIndex);
            }
        };
        Sound.prototype.HasExtensionInName = function () {
            return this.FindExtensionIndex() >= 0;
        };
        Sound.prototype.FindExtensionIndex = function () {
            var extensionStartingCharacter = '.';
            return this.Name.indexOf(extensionStartingCharacter);
        };
        Sound.prototype.Copy = function () {
            var copy = new Sound(this.Name, this.Type, this.Volume, this.Pitch, this.Pan);
            return copy;
        };
        Sound.prototype.toString = function () {
            return '[object CGT.Sound]';
        };
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
        return Sound;
    }());

    var Audio = {
        __proto__: null,
        Sound: Sound,
        get SoundType () { return SoundType; }
    };

    var CGTIterator = /** @class */ (function () {
        function CGTIterator(iteratee) {
            this.iteratee = iteratee;
        }
        Object.defineProperty(CGTIterator.prototype, "Value", {
            get: function () { return this.value; },
            enumerable: false,
            configurable: true
        });
        return CGTIterator;
    }());

    var __extends = (undefined && undefined.__extends) || (function () {
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
    var ArrayIterator = /** @class */ (function (_super) {
        __extends(ArrayIterator, _super);
        function ArrayIterator(arr) {
            var _this = _super.call(this, arr) || this;
            _this.arr = arr;
            _this.valueIndex = -1;
            return _this;
        }
        Object.defineProperty(ArrayIterator.prototype, "ValueIndex", {
            get: function () { return this.valueIndex; },
            enumerable: false,
            configurable: true
        });
        ArrayIterator.prototype.Next = function () {
            if (!this.HasNext()) {
                throw 'There is no next element for this iterator to return.';
            }
            this.valueIndex++;
            this.UpdateValue();
            return this.value;
        };
        ArrayIterator.prototype.HasNext = function () {
            return this.arr.length > 1 && this.valueIndex < this.arr.length - 1;
        };
        ArrayIterator.prototype.UpdateValue = function () {
            this.value = this.arr[this.valueIndex];
        };
        ArrayIterator.prototype.Previous = function () {
            if (!this.HasPrevious()) {
                throw 'There is no previous element for this iterator to return.';
            }
            this.valueIndex--;
            this.UpdateValue();
            return this.value;
        };
        ArrayIterator.prototype.HasPrevious = function () {
            return this.arr.length > 1 && this.valueIndex > 0;
        };
        return ArrayIterator;
    }(CGTIterator));

    var ObjectEx = /** @class */ (function () {
        function ObjectEx() {
        }
        ObjectEx.IsOfType = function (obj, input) {
            var inputIsFunction = typeof input === 'function';
            if (!inputIsFunction) {
                console.log("Input is not function");
                throw 'IsOfType only accepts function or class args.';
            }
            var classOfObj = obj.constructor;
            return this.IsOfExactType(obj, input) ||
                input.isPrototypeOf(classOfObj) ||
                classOfObj.isPrototypeOf(input);
        };
        ObjectEx.IsOfExactType = function (obj, input) {
            var inputIsFunction = typeof input === 'function';
            if (!inputIsFunction) {
                throw 'isOfExactType only accepts function or class args.';
            }
            return obj.constructor === input;
        };
        return ObjectEx;
    }());

    var __extends$1 = (undefined && undefined.__extends) || (function () {
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
    var __values$1 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var TightArray = /** @class */ (function (_super) {
        __extends$1(TightArray, _super);
        function TightArray(capacity) {
            var _this = _super.call(this, capacity) || this;
            if (ObjectEx.IsOfType(capacity, Number)) {
                _this.capacity = capacity;
                ArrayEx.Clear(_this); // To ensure this starts with nothing in it
            }
            else
                _this.capacity = _this.length * 2;
            return _this;
        }
        Object.defineProperty(TightArray.prototype, "capacity", {
            get: function () { return this._capacity; },
            set: function (value) { this._capacity = Math.max(1, value); },
            enumerable: false,
            configurable: true
        });
        TightArray.prototype.push = function () {
            var e_1, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                for (var args_1 = __values$1(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                    var item = args_1_1.value;
                    if (this.length == this.capacity)
                        this.shift();
                    _super.prototype.push.call(this, item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this.length;
        };
        TightArray.prototype.hasRoom = function () {
            return this.length < this.capacity;
        };
        return TightArray;
    }(Array));

    var __values$2 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var DestructibleCache = /** @class */ (function () {
        function DestructibleCache(capacity) {
            capacity = capacity || 10;
            this.items = new TightArray(capacity);
            this.Capacity = capacity;
            this.AutoWipe = true;
        }
        Object.defineProperty(DestructibleCache.prototype, "Items", {
            get: function () { return this.items; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleCache.prototype, "Capacity", {
            get: function () { return this.capacity; },
            set: function (value) {
                this.capacity = value;
                this.Items.capacity = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleCache.prototype, "AutoWipe", {
            get: function () { return this.autoWipe; },
            set: function (value) { this.autoWipe = value; },
            enumerable: false,
            configurable: true
        });
        DestructibleCache.prototype.Push = function (destructible) {
            this.MakeRoomIfNecessary();
            this.Items.push(destructible);
        };
        DestructibleCache.prototype.MakeRoomIfNecessary = function () {
            if (!this.HasRoom()) {
                var removed = this.Items.shift();
                if (this.AutoWipe)
                    removed.destroy();
            }
        };
        DestructibleCache.prototype.HasRoom = function () {
            return this.items.hasRoom();
        };
        DestructibleCache.prototype.Remove = function (destructible) {
            var thisHadDestructible = ArrayEx.Includes(this.Items, destructible);
            if (thisHadDestructible) {
                ArrayEx.Remove(this.Items, destructible);
                if (this.AutoWipe)
                    destructible.destroy();
            }
            var removed = thisHadDestructible;
            return removed;
        };
        DestructibleCache.prototype.Clear = function () {
            if (this.AutoWipe)
                this.ClearAndWipe();
            else
                ArrayEx.Clear(this.Items);
        };
        DestructibleCache.prototype.ClearAndWipe = function () {
            var e_1, _a;
            try {
                for (var _b = __values$2(this.Items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var destructible = _c.value;
                    destructible.destroy();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            ArrayEx.Clear(this.Items);
        };
        return DestructibleCache;
    }());

    /**
     * Only here to support legacy plugins. Use Map instead when you can.
     */
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
            // The keys always have the same indexes as their values.
            this.keys = [];
            this.values = [];
        }
        Object.defineProperty(Dictionary.prototype, "Keys", {
            get: function () { return this.keys; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "Values", {
            get: function () { return this.values; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "Length", {
            get: function () { return this.keys.length; },
            enumerable: false,
            configurable: true
        });
        // Methods
        /**
         * Adds the passed key-value pair to this dictionary. If the key was
         * already added, the value is overwritten.
         * */
        Dictionary.prototype.Add = function (key, value) {
            if (this.HasKey(key))
                this.MapNewValueToExistingKey(value, key);
            else
                this.RegisterNewKeyValuePair(key, value);
        };
        Dictionary.prototype.MapNewValueToExistingKey = function (value, key) {
            var index = this.keys.indexOf(key);
            this.values[index] = value;
        };
        Dictionary.prototype.RegisterNewKeyValuePair = function (key, value) {
            this.keys.push(key);
            this.values.push(value);
        };
        /**
         * Removes the key (and its mapped value) from this dictionary.
         * Returns true if successful, false otherwise.
         *  */
        Dictionary.prototype.Remove = function (key) {
            if (this.HasKey(key)) {
                var index = this.keys.indexOf(key);
                this.RemoveKeyValuePairAtIndex(index);
                return true;
            }
            return false;
        };
        Dictionary.prototype.RemoveKeyValuePairAtIndex = function (index) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        };
        /** Returns the value mapped to the passed key, if there is one. Returns null otherwise. */
        Dictionary.prototype.Get = function (key) {
            if (this.HasKey(key)) {
                var index = this.GetKeyIndex(key);
                return this.ValueAtThatSameIndex(index);
            }
            else
                return null;
        };
        Dictionary.prototype.GetKeyIndex = function (key) {
            return this.keys.indexOf(key);
        };
        Dictionary.prototype.ValueAtThatSameIndex = function (index) {
            return this.values[index];
        };
        Dictionary.prototype.GetValueAtIndex = function (index) {
            if (this.IndexIsValid(index))
                return this.values[index];
        };
        Dictionary.prototype.IndexIsValid = function (index) {
            return index >= 0 && index < this.values.length;
        };
        Dictionary.prototype.HasKey = function (key) {
            return ArrayEx.Includes(this.keys, key);
        };
        Dictionary.prototype.HasValue = function (value) {
            return ArrayEx.Includes(this.values, value);
        };
        /** Removes all key-value pairs from this dictionary. */
        Dictionary.prototype.Clear = function () {
            this.keys = [];
            this.values = [];
        };
        return Dictionary;
    }());

    var Collections = {
        __proto__: null,
        ArrayIterator: ArrayIterator,
        CGTIterator: CGTIterator,
        DestructibleCache: DestructibleCache,
        Dictionary: Dictionary,
        TightArray: TightArray
    };

    /**
     * To help create custom types out of Plugin Params.
     */
    var PluginParamObjectFactory = /** @class */ (function () {
        function PluginParamObjectFactory() {
        }
        Object.defineProperty(PluginParamObjectFactory, "ClassOfObjectCreated", {
            get: function () { return Object; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PluginParamObjectFactory.prototype, "ClassOfObjectCreated", {
            // @ts-ignore
            get: function () { return this.constructor.ClassOfObjectCreated; },
            enumerable: false,
            configurable: true
        });
        PluginParamObjectFactory.prototype.CreateObjectFrom = function (param) {
            this.paramToCreateFrom = param;
            this.ParseParamOnce();
            this.baseObject = this.CreateBaseObject();
            this.ApplyParamValuesToBaseObject();
            return this.baseObject;
        };
        PluginParamObjectFactory.prototype.ParseParamOnce = function () {
            this.parsedParam = JSON.parse(this.paramToCreateFrom);
        };
        PluginParamObjectFactory.prototype.CreateBaseObject = function () {
            return new this.ClassOfObjectCreated();
        };
        PluginParamObjectFactory.prototype.ApplyParamValuesToBaseObject = function () {
            this.ApplyPrimitiveValues();
            this.ApplyCustomValues();
        };
        PluginParamObjectFactory.prototype.ApplyPrimitiveValues = function () {
            this.ApplyBooleans();
            this.ApplyNumbers();
            this.ApplyStrings();
        };
        PluginParamObjectFactory.prototype.ApplyBooleans = function () { };
        PluginParamObjectFactory.prototype.ApplyNumbers = function () { };
        PluginParamObjectFactory.prototype.ApplyStrings = function () { };
        PluginParamObjectFactory.prototype.ApplyCustomValues = function () { };
        PluginParamObjectFactory.prototype.CreateObjectsFrom = function (stringifiedParamArr) {
            var inputAsStringArr = JSON.parse(stringifiedParamArr);
            return this.ConvertParamStringsToObjects(inputAsStringArr);
        };
        PluginParamObjectFactory.prototype.ConvertParamStringsToObjects = function (paramStrings) {
            var objects = [];
            for (var i = 0; i < paramStrings.length; i++) {
                var unparsedParam = paramStrings[i];
                var createdObject = this.CreateObjectFrom(unparsedParam);
                objects.push(createdObject);
            }
            return objects;
        };
        return PluginParamObjectFactory;
    }());

    var __extends$2 = (undefined && undefined.__extends) || (function () {
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
    // For some reason, unlike the BoDiSy's factories, ColorFactory can't refer to the class of objects it's 
    // meant to create; the require() call returns undefined, despite being passed the right path.
    // TODO: For consistent code organization, see if you can put ColorFactory back in its own file without
    // breaking the Color class's factory methods.
    var ColorFactory = /** @class */ (function (_super) {
        __extends$2(ColorFactory, _super);
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
    }(PluginParamObjectFactory));
    SetupColorStatics();
    function SetupColorStatics() {
        Color.factory = new ColorFactory();
    }

    var Graphics = {
        __proto__: null,
        Color: Color,
        ColorFactory: ColorFactory
    };

    var BitmapEx = /** @class */ (function () {
        function BitmapEx() {
        }
        /**
         * Add a callback function that will be called when the bitmap is loaded.
         * Author: MinusGix
         */
        BitmapEx.prototype.AddLoadListener = function (bitmap, listener) {
            if (!bitmap.isReady()) {
                // @ts-ignore
                bitmap._loadListeners.push(listener);
            }
            else {
                listener(bitmap);
            }
        };
        BitmapEx.prototype.RemoveLoadListener = function (bitmap, listener) {
            // @ts-ignore
            ArrayEx.Remove(bitmap._loadListeners, listener);
        };
        BitmapEx.prototype.HasLoadListener = function (bitmap, listener) {
            // @ts-ignore
            return ArrayEx.Includes(bitmap._loadListeners, listener);
        };
        /**
         * Returns a resized version of the bitmap (if it is ready). Note that
         * the aspect ratio may not be the same, based on the passed width and height.
         */
        BitmapEx.prototype.Resized = function (bitmap, width, height) {
            if (!bitmap.isReady())
                return;
            var newBitmap = new Bitmap(width, height);
            newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, width, height);
            return newBitmap;
        };
        return BitmapEx;
    }());

    var Game_ActionEx = /** @class */ (function () {
        function Game_ActionEx() {
        }
        /** Returns the action's item if it's a skill. Null otherwise. */
        Game_ActionEx.AsSkill = function (action) {
            var skill = $dataSkills[action.item().id];
            if (skill != undefined)
                return skill;
            else
                return null;
        };
        /** Returns the action's item if it's a normal item. Null otherwise. */
        Game_ActionEx.AsItem = function (action) {
            var item = $dataItems[action.item().id];
            if (item != undefined)
                return item;
            else
                return null;
        };
        /** Returns this action's subject if the subject is an enemy. Null otherwise. */
        Game_ActionEx.SubjectAsEnemy = function (action) {
            return Game_ActionEx.SubjectAsType(action, Game_Enemy);
        };
        Game_ActionEx.SubjectAsType = function (action, typeWanted) {
            var subject = action.subject();
            if (subject instanceof typeWanted)
                return subject;
            else
                return null;
        };
        /** Returns this action's subject if the subject is an actor. Null otherwise. */
        Game_ActionEx.SubjectAsActor = function (action) {
            return Game_ActionEx.SubjectAsType(action, Game_Actor);
        };
        return Game_ActionEx;
    }());

    var PIXISpriteEx = /** @class */ (function () {
        function PIXISpriteEx() {
        }
        PIXISpriteEx.Resized = function (sprite, width, height) {
            var newSprite = new PIXI.Sprite(sprite.texture);
            newSprite.width = width;
            newSprite.height = height;
            return newSprite;
        };
        PIXISpriteEx.Copy = function (sprite) {
            var newSprite = new PIXI.Sprite(sprite.texture);
            newSprite.width = sprite.width;
            newSprite.height = sprite.height;
            return newSprite;
        };
        PIXISpriteEx.Resize = function (sprite, width, height) {
            sprite.width = width;
            sprite.height = height;
        };
        PIXISpriteEx.ResizeWhileKeepingAspectFor = function (sprite, targetWidth, targetHeight) {
            var scaleFactor = GetScaleFactor(targetWidth, targetHeight, sprite.texture.width, sprite.texture.height);
            sprite.width = sprite.texture.width * scaleFactor;
            sprite.height = sprite.texture.height * scaleFactor;
        };
        return PIXISpriteEx;
    }());

    var EffectCodes;
    (function (EffectCodes) {
        EffectCodes[EffectCodes["HPHeal"] = 11] = "HPHeal";
        EffectCodes[EffectCodes["MPHeal"] = 12] = "MPHeal";
        EffectCodes[EffectCodes["TPHeal"] = 13] = "TPHeal";
        EffectCodes[EffectCodes["AddState"] = 21] = "AddState";
        EffectCodes[EffectCodes["RemoveState"] = 22] = "RemoveState";
        EffectCodes[EffectCodes["AddBuff"] = 31] = "AddBuff";
        EffectCodes[EffectCodes["AddDebuff"] = 32] = "AddDebuff";
        EffectCodes[EffectCodes["RemoveBuff"] = 33] = "RemoveBuff";
        EffectCodes[EffectCodes["RemoveDebuff"] = 34] = "RemoveDebuff";
        EffectCodes[EffectCodes["SpecialEffect"] = 41] = "SpecialEffect";
        EffectCodes[EffectCodes["Grow"] = 42] = "Grow";
        EffectCodes[EffectCodes["LearnSkill"] = 43] = "LearnSkill";
        EffectCodes[EffectCodes["CommonEvent"] = 44] = "CommonEvent";
    })(EffectCodes || (EffectCodes = {}));

    var __values$3 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var HealEffects = /** @class */ (function () {
        function HealEffects() {
            this.hp = [];
            this.mp = [];
            this.tp = [];
        }
        /** Creates an instance of this from the effects of the passed item. */
        HealEffects.OfItem = function (item) {
            var healEffects = new HealEffects();
            healEffects.RegisterMultiple(item.effects);
            return healEffects;
        };
        /**
         * Registers any legit healing effects in the array passed. Returns true if
         * any were legit, false otherwise.
         * @param effects
         */
        HealEffects.prototype.RegisterMultiple = function (effects) {
            var e_1, _a;
            try {
                for (var effects_1 = __values$3(effects), effects_1_1 = effects_1.next(); !effects_1_1.done; effects_1_1 = effects_1.next()) {
                    var eff = effects_1_1.value;
                    this.Register(eff);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (effects_1_1 && !effects_1_1.done && (_a = effects_1.return)) _a.call(effects_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this.Any();
        };
        /**
         * If the passed effect is a legit healing effect, it gets registered as the right
         * type in this instance, returning true. Returns false otherwise.
         */
        HealEffects.prototype.Register = function (eff) {
            if (this.IsLegitHealingEffect(eff)) {
                switch (eff.code) {
                    case EffectCodes.HPHeal:
                        this.hp.push(eff);
                        break;
                    case EffectCodes.MPHeal:
                        this.mp.push(eff);
                        break;
                    case EffectCodes.TPHeal:
                        this.tp.push(eff);
                        break;
                    default:
                        throw Error("Did not account for healing code " + eff.code);
                }
                return true;
            }
            return false;
        };
        HealEffects.prototype.IsLegitHealingEffect = function (effect) {
            var hasHealingCode = ArrayEx.Includes(HealEffects.Codes, effect.code);
            var percentHealValue = effect.value1;
            var flatHealValue = effect.value2;
            var doesAnyHealing = percentHealValue > 0 || flatHealValue > 0;
            var doesNoDamage = !(percentHealValue < 0 || flatHealValue < 0);
            return hasHealingCode && doesAnyHealing && doesNoDamage;
        };
        /** Whether or not this has any effects registered. */
        HealEffects.prototype.Any = function () {
            return this.hp.length > 0 || this.mp.length > 0 || this.tp.length > 0;
        };
        HealEffects.Codes = Object.freeze([EffectCodes.HPHeal, EffectCodes.MPHeal, EffectCodes.TPHeal]);
        HealEffects.Null = Object.freeze(new HealEffects());
        return HealEffects;
    }());

    var RPGItemEx = /** @class */ (function () {
        function RPGItemEx() {
        }
        return RPGItemEx;
    }());

    var _RPG_Item_Setup = {
        __proto__: null,
        get EffectCodes () { return EffectCodes; },
        HealEffects: HealEffects,
        RPGItemEx: RPGItemEx
    };

    var Extensions = {
        __proto__: null,
        Items: _RPG_Item_Setup,
        ArrayEx: ArrayEx,
        BitmapEx: BitmapEx,
        Game_ActionEx: Game_ActionEx,
        NumberEx: NumberEx,
        ObjectEx: ObjectEx,
        PIXISpriteEx: PIXISpriteEx
    };

    var __values$4 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var SignalerImplementation = /** @class */ (function () {
        function SignalerImplementation() {
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
            this.inputCheckFuncs = ArrayEx.From(this.inputEvents.keys());
        }
        Object.defineProperty(SignalerImplementation.prototype, "InputPressed", {
            get: function () { return this.inputPressed; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalerImplementation.prototype, "InputRepeated", {
            get: function () { return this.inputRepeated; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalerImplementation.prototype, "InputTriggered", {
            get: function () { return this.inputTriggered; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalerImplementation.prototype, "InputLongPressed", {
            get: function () { return this.inputLongPressed; },
            enumerable: false,
            configurable: true
        });
        SignalerImplementation.prototype.InitInputEventDict = function () {
            this.inputEvents.set(Input.isPressed, this.InputPressed);
            this.inputEvents.set(Input.isRepeated, this.InputRepeated);
            this.inputEvents.set(Input.isTriggered, this.InputTriggered);
            this.inputEvents.set(Input.isLongPressed, this.InputLongPressed);
        };
        SignalerImplementation.prototype.HandleInputSignaling = function () {
            var e_1, _a, e_2, _b;
            try {
                for (var _c = __values$4(this.inputs), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var currentInput = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values$4(this.inputCheckFuncs)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var userEnteredInput = _f.value;
                            if (userEnteredInput.call(Input, currentInput) === true) {
                                var eventToInvoke = this.inputEvents.get(userEnteredInput);
                                eventToInvoke.Invoke(currentInput);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        return SignalerImplementation;
    }());
    var InputSignaler = new SignalerImplementation();

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

    var InputObserver = /** @class */ (function () {
        function InputObserver() {
            this.ListenForInputs();
        }
        InputObserver.prototype.ListenForInputs = function () {
            InputSignaler.InputLongPressed.AddListener(this.OnInputLongPressed, this);
            InputSignaler.InputPressed.AddListener(this.OnInputPressed, this);
            InputSignaler.InputTriggered.AddListener(this.OnInputTriggered, this);
            InputSignaler.InputRepeated.AddListener(this.OnInputRepeated, this);
        };
        // Override any one of these
        InputObserver.prototype.OnInputTriggered = function (input) { };
        InputObserver.prototype.OnInputPressed = function (input) { };
        InputObserver.prototype.OnInputLongPressed = function (input) { };
        InputObserver.prototype.OnInputRepeated = function (input) { };
        InputObserver.prototype.Destroy = function () {
            this.UnlistenForInputs();
        };
        InputObserver.prototype.UnlistenForInputs = function () {
            InputSignaler.InputLongPressed.RemoveListener(this.OnInputLongPressed, this);
            InputSignaler.InputPressed.RemoveListener(this.OnInputPressed, this);
            InputSignaler.InputTriggered.RemoveListener(this.OnInputTriggered, this);
            InputSignaler.InputRepeated.RemoveListener(this.OnInputRepeated, this);
        };
        InputObserver.Null = Object.freeze(new InputObserver());
        return InputObserver;
    }());

    AttachInputSignalerToScenes();
    function AttachInputSignalerToScenes() {
        var oldSceneUpdate = Scene_Base.prototype.update;
    }

    var __read = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    // Credit to Dr. Axel Rauschmayer for this
    function MapToJSON(map) {
        return JSON.stringify(__spread(map));
    }
    function JSONToMap(json) {
        return new Map(JSON.parse(json));
    }

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

    File.InitFromLocalStorage();

    var IO = {
        __proto__: null,
        File: File
    };

    // Maps the command names to the functions that take the raw args
    var commandMap = new Map();
    function HookUpCommandMapToInterpreter() {
        var oldPluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = CGTPluginCommand;
        function CGTPluginCommand(commandName, args) {
            oldPluginCommand.call(this, commandName, args);
            if (CommandIsInMap(commandName))
                ExecuteCommandFromMap(commandName, args);
        }
        function CommandIsInMap(commandName) {
            return commandMap.get(commandName) != null;
        }
        function ExecuteCommandFromMap(commandName, args) {
            var commandFunc = commandMap.get(commandName);
            commandFunc.call(this, args);
        }
    }

    function RegisterPluginCommand(commandName, commandFunc) {
        var commandMap = CGT.Core.PluginCommands.commandMap;
        commandMap.set(commandName, commandFunc);
    }

    HookUpCommandMapToInterpreter();

    var PluginCommands = {
        __proto__: null,
        Register: RegisterPluginCommand,
        commandMap: commandMap
    };

    var PluginParams = {
        __proto__: null,
        PluginParamObjectFactory: PluginParamObjectFactory
    };

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

    var Callbacks = SetupEvents();
    function SetupEvents() {
        var callbacks = {
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
        var oldSceneTitleStart = Scene_Title.prototype.start;
        var oldStartBattle = BattleManager.startBattle;
        var oldEndBattle = BattleManager.endBattle;
        var oldExecuteDamage = Game_Action.prototype.executeDamage;
        var oldEnemyDeath = Game_Enemy.prototype.die;
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

    var Utils = {
        __proto__: null,
        GetScaleFactor: GetScaleFactor,
        Event: Event,
        Callbacks: Callbacks,
        MapToJSON: MapToJSON,
        JSONToMap: JSONToMap
    };

    var CGT$1 = {
        Core: {
            version: 10101,
            Audio: Audio,
            Collections: Collections,
            Extensions: Extensions,
            Graphics: Graphics,
            IO: IO,
            PluginCommands: PluginCommands,
            PluginParams: PluginParams,
            Utils: Utils,
        },
    };

    /*:
     * @plugindesc Mainly contains utility code that other CGT scripts rely on.
     * @author CG-Tespy – https://github.com/CG-Tespy
     * @help This is version 1.01.01 of this plugin. Tested with RMMV version 1.6.2.

    Please make sure to credit me (and any of this plugin's contributing coders)
    if you're using this plugin in your game (include the names and webpage links).

    Other code contributors:
    MinusGix
    Endless Illusion Software – http://endlessillusoft.com/
    Comficker - https://gist.github.com/comficker
    rob - https://stackoverflow.com/users/563532/rob
    Dr. Axel Rauschmayer - https://2ality.com/

    */
    var coreEngine = {
        CGT: CGT$1,
    };
    Object.assign(window, coreEngine);

}());

declare namespace CGT
{
    namespace Core
    {
        let Name: string;
        let Version: number;

        namespace Audio
        {
            /** Enum for the various types of sound categories built into MV. */
            enum SoundType
            {
                bgm = "bgm",
                bgs = "bgs",
                me = "me",
                se = "se",
            }

            /** 
             * Credit to whoever wrote the original class in the RMMV Script Call List. Provides an 
             * interface to make it easier to work with Sound clips.
             */
            class Sound
            {
                // Limiters and defaults
                static MinVolume: number;
                static MaxVolume: number;
                static DefaultVolume: number;

                static MinPitch: number;
                static MaxPitch: number;
                static DefaultPitch: number;

                static MinPan: number;
                static MaxPan: number;
                static DefaultPan: number;

                // Getters
                get Name(): string;
                get Volume(): number;
                get Pitch(): number;
                get Pan(): number;

                // Methods
                public Play(): void;

                constructor(fileName: string, soundType: CGT.Core.Audio.SoundType, volume?: number, pitch?: number, pan?: number);

                toString(): string;

                static Null: Sound;

            }
        }

        /**
         * To respond to certain events after they've happened (or are in the process of happening).
         * The timing of these callbacks firing off is not guaranteed, though they'll usually fire off 
         * at least after the original versions of their corresponding funcs have been called.
         */
        namespace Callbacks
        {
            let TitleScreenStart: CGT.Core.Event;
            let BattleStart: CGT.Core.Event;
            let BattleEnd: CGT.Core.Event;
            let DamageExecute: CGT.Core.Event;
            let EnemyDeath: CGT.Core.Event;
        }

        namespace Collections
        {

            class Iterator<T>
            {
                get Value(): T;
                Next(): T;
                Previous(): T;
                HasNext(): boolean;
                HasPrevious(): boolean;
            }

            /**
             * Interface for traversing arrays.
             */
            class ArrayIterator<T> extends Iterator<T>
            {
                get ValueIndex(): number;
                
                constructor(arr: T[])
            }

            /**
             * Legacy class. Better off using JS's built-in Map class instead. 
             */
            class Dictionary
            {
                get Keys(): any[];
                get Values(): any[];

                public Add(key: any, value: any): void;
                public Remove(key: any): boolean;
                public Get(key: any): any;
                public GetAtIndex(index: number) : any;
                public HasKey(key: any): boolean;
                public HasValue(value: any): boolean;
                public Length() : number;
                public Clear(): void;

                toString(): string;

                static Null: Dictionary;
            }

            /**
             * Array with a set capacity. When it's to be filled beyond capacity, it removed
             * the earliest item added to it before adding the new item.
             *
             * @class TightArray
             * @extends {Array}
             */
            class TightArray<T> extends Array
            {
                get capacity(): number;

                push(valuesToAdd: any[]): number;
                hasRoom(): boolean;

                clear(): void;
            }

            /**
             * Applies the flyweight pattern, managing a collection of objects with
             * a destroy() method.
             */
            class DestructibleCache
            {
                get Items(): Array<{destroy()}>;
                get Capacity(): number;
                /**
                 * Whether or not this automatically destroys a destructible
                 * when deciding to no longer hold it.
                 */
                get AutoWipe(): boolean;

                constructor(capacity: number);

                /** 
                 * Has this start holding the passed destructible. If this was
                 * already at capacity, then the oldest destructible this
                 * held before gets removed.
                 * */
                Push(destructible: {destroy()}): void;
                /** 
                 * Stops holding the passed destructible. Returns true if it had the
                 * destructible at the time, false otherwise.
                 */
                Remove(destructible: {destroy()}): boolean;
                Clear(): void;
                ClearAndWipe(): void;

            }

        }

        namespace IO
        {
            /**
             * Wrapper for handling file I/O. Credit to Endless Illusion Software.
             */
            namespace File
            {
                function WriteFile(filePath: string, fileName: string, data: string): void;
                function ReadFile(filePath: string, fileName: string): string;
                function CreatePath(relativePath: string): string;
            }
        }
        

        namespace Graphics
        {
            class Color
            {
                
                static FromHex(hex: string): Color;
                static Lerp(firstColor: Color, secondColor: Color, progress: number): Color;
                
                /** How much red is in this color. */
                get R(): number;
                /** How much green is in this color. */
                get G(): number;
                /** How much blue is in this color. */
                get B(): number;
                /** Alpha value (aka transparency) of this color. */
                get A(): number;

                /**
                 * Set up a color with the passed RGBA values.
                 * @param {Number} red 
                 * @param {Number} green 
                 * @param {Number} blue 
                 * @param {Number} alpha AKA transparency
                 */
                constructor(red?: number, green?: number, blue?: number, alpha?: number);

                constructor(otherColor: Color);

                Copy(): Color;
                Set(red: number, green: number, blue: number, alpha?: number): void;
                SetFrom(otherColor: Color): void;

                /**
                 * Converts this color to an RGB-style CSS string.
                 */
                ToCSSRGB(): string;
                ToHexString(): string;
                ToPluginParamRaw(): string;
                static FromPluginParamRaw(param: object): Color;

                toString(): string;
                Equals(other: Color): boolean;

                // Defaults
                static Red: Color;
                static DarkRed: Color;
                static Pink: Color;

                static Green: Color;
                static DarkGreen: Color;
                static LightGreen: Color;

                static Cyan: Color;

                static Blue: Color;
                static DarkBlue: Color;
                static LightBlue: Color;

                static Yellow: Color;
                static DarkYellow: Color;
                static LightYellow: Color;
                
                static Purple: Color;
                static DarkPurple: Color;
                static LightPurple: Color;
                
                static White: Color;
                static Black: Color;
                static Gray: Color;

                static Brown: Color;
                
                static Orange: Color;
                static DarkOrange: Color;
                static LightOrange: Color;

                static Null: Color;

                /**
                 * Frozen cache of singletons of the default static colors.
                 * @static
                 * @memberof Color
                 */
                static Cache:
                {
                    Red: Color;
                    DarkRed: Color;
                    Pink: Color;

                    Green: Color;
                    DarkGreen: Color;
                    LightGreen: Color;

                    Cyan: Color;

                    Blue: Color;
                    DarkBlue: Color;
                    LightBlue: Color;

                    Yellow: Color;
                    DarkYellow: Color;
                    LightYellow: Color;
                    
                    Purple: Color;
                    DarkPurple: Color;
                    LightPurple: Color;
                    
                    White: Color;
                    Black: Color;
                    Gray: Color;

                    Brown: Color;
                    
                    Orange: Color;
                    DarkOrange: Color;
                    LightOrange: Color;
                };
            }

            let SpritePool: Collections.Dictionary;
            let BitmapPool: Collections.Dictionary;
            let BaseTexPool: Collections.Dictionary;
            let RenderTexPool: Collections.Dictionary;
        }

        namespace Input
        {
            /**
            * For objects meant to respond to input.
            */
            class InputObserver
            {
                OnInputTriggered(input: InputCode): void;
                OnInputPressed(input: InputCode): void;
                OnInputLongPressed(input: InputCode): void;
                OnInputRepeated(input: InputCode): void;

                static Null: InputObserver;
            }

            /**
            * Executes in every scene's update method, so InputResponders can do their thing.
            */
            let InputSignaler:
            {
                InputPressed: CGT.Core.Event,
                InputRepeated: CGT.Core.Event,
                InputTriggered: CGT.Core.Event,
                InputLongPressed: CGT.Core.Event,

                Init(): void,
                HandleInputSignaling(): void,
            }

            enum InputMethod
            {
                trigger = 0,
                pressed = 1,
                longPressed = 2,
                repeated = 3,
                null = 987,
            }

            /**
             * To help InputResponders interpret input without the pitfalls that come
             * when involving hard-coded strings in input-checking.
             */
            enum InputCode
            {
                tab = 'tab',

                ok = 'ok',      
                enter = 'ok', 
                space = 'ok',
                Z = 'ok',

                shift = 'shift',  

                control = 'control',
                alt = 'control',

                escape = 'escape', 
                numpad0 = 'escape',
                insert = 'escape',
                X = 'escape',

                pageUp = 'pageup', 
                Q = 'pageup',

                pageDown = 'pagedown', 
                W = 'pagedown',

                leftArrow = 'left', 
                numpad4 = 'left',

                upArrow = 'up',    
                numpad8 = 'up',

                rightArrow = 'right', 
                numpad6 = 'right',

                downArrow = 'down',
                numpad2 = 'down',

                f9 = 'debug',

                null = 'null'
            }
        }

        namespace PluginParams
        {
            /**
            * Abstract factory class that converts plugin params to objects of
            * appropriate types.
            */
            abstract class PluginParamObjectFactory<TOutput>
            {
                /**
                * Hook for the class of the object created by this factory.
                */
                static get ClassOfObjectCreated(): object;
                get ClassOfObjectCreated(): object;
                _baseObject: TOutput;
                _paramToCreateFrom: object;

                /**
                 * Creates an object of the appropriate type from the passed value, whether the
                 * param was already parsed with JSON or not.
                 *
                 * @param {string} param. Unparsed param
                 */
                static CreateObjectFrom(param: string): any;

                CreateObjectFrom(param: string): TOutput;

                /**
                 * @param {string} paramArr A stringified array of the params this factory
                 * is meant to handle.
                 * @returns {TOutput}
                 * @memberof PluginParamObjectFactory
                 */
                CreateObjectsFrom(paramArr: string): TOutput[];

                CreateBaseObject(): TOutput;
                protected ApplyParamValuesToBaseObject(): void;

                /**
                    * Hook for applying the primitive values in the plugin param's top level.
                    * @param output 
                    */
                protected ApplyPrimitiveValues(): void;

                protected ApplyBooleans(): void;
                protected ApplyNumbers(): void;
                protected ApplyStrings(): void;

                /**
                    * Hook for applying your non-primitive values in the plugin param's top level.
                    */
                protected ApplyCustomValues(): void;

            }

            /**
             * Creates instances of Colors from plugin param objects, strings, and other inputs.
             *
             * @class ColorFactory
             * @extends {PluginParamObjectFactory<Graphics.Color>}
             */
            class ColorFactory extends PluginParamObjectFactory<Graphics.Color>
            {
                CreateFromHex(hexVal: string): Graphics.Color;
            }

            /**
            * Helps with dependency injection into plugin params fetched from the
            * PluginManager.
            */
            class ParamConverter<TOutput>
            {
                thing: TOutput;
                ConvertFrom(baseParam: string): TOutput;
            }
        }

        namespace TypeCheckUtils
        {
            /**
            * Returns true if the objects passed inherit from the same type. False
            * otherwise.
            * @param args Two or more objects passed (not an actual array)
            */
            function AreSameType(args: any[]): boolean;

            /**
             * Throws an exception is the objToCheck isn't the same type as the validObjExample.
             */
            function EnsureValidType(objToCheck: any, type: Function, typeName: string): void;
        }
        
        class Event
        {
            protected _callbacks: Map<any, any>;
            protected _argCount: number;

            constructor(argCount: number);

            get ArgCount() : number;

            public AddListener(func: Function, caller: Object): void;
            public RemoveListener(func: Function, caller: Object): void;
            /**
             * The amount of args you need to pass depends on the ArgCount you
             * initialized this with.
             * @param args 
             */
            public Invoke(args? : number): void;

            toString(): string;
            static Null: Event;
        }

        namespace Text
        {
            class Font
            {
                get Face(): string;
                set Face(value: string);
                get Size(): number;
                set Size(value: number);
                get IsItalic(): boolean;
                set IsItalic(value: boolean);
        
                toString(): string;
        
                /** 
                 * Defaults to having the default font face, unitalicised, at font size 28.
                 * */
                constructor(fontFace?: string, fontSize?: number, isItalic?: boolean);
        
                static FromBitmap(bitmap: Bitmap): Font;
                /** Returns a deep copy of this Font. */
                Copy(): Font;
                /** Turns the passed Font into a deep copy of this one. */
                CopyTo(other: Font): void;
        
                ApplyToBitmap(bitmap: Bitmap): void;
                Equals(other: Font): boolean;
        
                static Default: Font;
                static Null: Font;
            }
        
        }

        namespace Utils
        {
            function GetScaleFactor(firstWidth: number, 
                firstHeight: number, 
                secondWidth: number,
                secondHeight: number): number;

            /*
                Creates an alert dialog with the passed message before throwing
                an exception with said message.
            */
            function AlertError(message: string);
        }
    
    }

}
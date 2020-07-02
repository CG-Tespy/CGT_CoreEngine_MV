declare namespace CGT
{
    
    namespace BoDiSy
    {
        let imageKeeper: Controllers.ImageKeeper;
        let Books: Models.Book[];
        let CurrentBook: Models.Book;
        let PageFileDir: string;
        /**
         * The Controls instance the system is using.
         */
        let Controls: Input.Controls;

        /**
         * Keeps track of the bookmarks assigned to each book.
         */
        let Bookmarks: Map<Models.Book, Contexts.ObservableBookmark>;

        function CreateSaveData(): Contexts.SaveData;
        function LoadSaveData(saveData: Contexts.SaveData): void;
        
        namespace Contexts
        {
            interface BookAccessContext
            {
                readonly Book: Models.Book;
                SetPages(leftPage: Models.Page, rightPage: Models.Page): void;
            }

            /**
            * Contextclass containing state representing where a player last left
            * off when seeing a Book's contents.
            */
            class Bookmark implements BookAccessContext
            {
                readonly Book: Models.Book;
                get LeftPage(): Models.Page;
                get RightPage(): Models.Page;
                
                /**
                 * Initializes a bookmark with the passed book.
                 * @param book 
                 */
                constructor(book: Models.Book);

                static InitWith(book: Models.Book): void;
                SetAtStartOf(book: Models.Book): void;
                
                /**
                 * Returns a shallow copy of this Bookmark.
                 */
                Copy(): Bookmark;

                /** 
                 * Sets this bookmark 'between' the passed pages. 
                 * The pages must be in the book this bookmark is set for, else
                 * an exception will be thrown.
                 * */
                SetPages(leftPage: Models.Page, rightPage: Models.Page): void;

                Equals(other: Bookmark): boolean;
                ToRestContext(): BookmarkRestContext;
                static FromRestContext(context: BookmarkRestContext): Bookmark;

            }

            /**
             * "Rest" as in "Restoration"
             */
            class BookmarkRestContext
            {
                get BookIndex(): number;
                get LeftPageIndex(): number;
                get RightPageIndex(): number;

                static From(bookmark: Bookmark): BookmarkRestContext;

                static FromJSONParsed(obj: object): BookmarkRestContext;
                static ArrFromJSONParsed(objs: object[]): BookmarkRestContext[];

                Equals(other: BookmarkRestContext): boolean;
            }

            class ObservableBookmark extends Bookmark
            {
                /**
                 * Invoked when the bookmark is set between a different pair
                 * of pages. Listeners are given a PageDuo with said pages.
                 *
                 * @readonly
                 * @type {CGT.Core.Event}
                 * @memberof Bookmark
                 */
                get ChangedLocation(): CGT.Core.Event;

                static FromRestContext(saveData: BookmarkRestContext): ObservableBookmark;
            }

            /**
             * Contains raw data you use to build the proper objects in the system
             * that need to be saved.
             */
            class SaveData
            {
                /** An array of raw JSON books. */
                get Books(): string[];

                get Bookmarks(): Contexts.BookmarkRestContext[];

                get CurrentBookIndex(): number;

                static FromJSONParsed(json: string): SaveData;
            }

        }

        namespace Models
        {
            
            class Literature<TContents>
            {
                Name: string
                Null: Literature<TContents>
                Equals(other: Literature<TContents>): boolean
                get Contents(): TContents[]
            }

            class Page extends Literature<string>
            {
                static ParamNames:
                {
                    IsLocked: string,
                    TextType: string,
                    Text: string,
                    BGImage: string,
                    LockBGImage: string,
                    FontFace: string,
                    FontSize: string,
                    Red: string,
                    Green: string,
                    Blue: string,
                    LineHeight: string,
                };

                static Defaults:
                {
                    BGImage: PIXI.BaseTexture,
                    FontFace: string,
                    FontSize: number, 
                    FontColor: CGT.Core.Graphics.Color,
                    LineHeight: number
                };

                static factory: Factories.PageFactory;
                static get Factory(): Factories.PageFactory;

                bgImage: string;
                
                get Name(): string;
                /** Same as the Contents field. */
                get Text(): string;
                protected text: string;

                /** 
                 * Decides whether or not the player can see this page's contents, while 
                 * flipping through the chapter it belongs to.
                 */
                get IsLocked(): boolean;
                protected isLocked: boolean;

                /** Name of the image file this Page's BGImage was made from. */
                get BGImageName(): string;
                /** Name of the image file this Page's LockBGImage was made from. */
                get LockBGImageName(): string;
                
                get TextType(): TextType;
                get TextColor(): CGT.Core.Graphics.Color;

                get Font(): CGT.Core.Text.Font;
                get FontFace(): string;
                get FontSize(): number;
                get FontIsItalic(): boolean;

                get LineHeight(): number;

                SetImageTexture(imageTex: PIXI.BaseTexture, imageName: string): void;
                SetTextAsPlain(plainText: string): void;
                SetTextFromFile(fileName: string): void; 

                ToPluginParam(): Object;
                ToPluginParamRaw(): string;
                ToPluginParamStringified(): string;
                ToJSON(): string;
                Equals(other: Page): boolean;

                static FromPluginParamRaw(pluginParam: string): Page;
                /**
                 *
                 * @static
                 * @param {string} pluginParam A stringified array of params
                 * @returns {Page[]}
                 * @memberof Page
                 */
                static ArrFromPluginParamRaw(pluginParam: string): Page[];
                static ApplyDefaultsTo(page: Page): void;

                
                private static paramFixer: object;

                static Null: Page;

            }

            class PageDuo
            {
                get LeftPage(): Models.Page;
                get RightPage(): Models.Page;

                /**
                 * If a non-truthy value is passed as a page, it'll be substituted for
                 * a null Page object.
                 * @param leftPage 
                 * @param rightPage 
                 */
                constructor(leftPage?: Page, rightPage?: Page);

                Set(leftPage: Page, rightPage: Page) : void;
                
                static CreateArrFromPageArr(pageArr: Page[]) : PageDuo[];

                static Null: PageDuo;

                Equals(otherDuo: PageDuo): boolean;
            }

            /**
             * A grouping of Page objects that makes them easier to manage, while also fitting
             * the book theming this plugin goes for.
             */
            class Chapter extends Literature<Page>
            {
                static paramNames:
                {
                    Name: 'Name',
                    Pages: 'Pages',
                    IsLocked: 'Is Locked',
                };

                static get Factory(): Factories.ChapterFactory;

                get Name(): string;
                get ID(): number;

                /** 
                 * Decides whether or not the player can see this chapter, while flipping through the
                 * book it belongs to.
                 */
                get IsLocked(): boolean;

                get Contents(): Page[];
                /** Same as the Contents field. */
                get Pages(): Page[];
                get PageCount(): number;

                /**
                 * Returns the page in this chapter that has the passed ID. If there is no such
                 * page, null is returned instead.
                 */
                FindPageWithName(id: string): Page;
                Contains(page: Page): boolean;

                /** 
                 * Returns the index of the page passed within this chapter's pages. If the page
                 * isn't in this chapter, -1 is returned. 
                 * */
                GetIndexOfPage(page: Page): number;

                UpdatePageSets(): void;

                ToPluginParamRaw(): string;
                ToPluginParamStringified(): string;
                ToJSONString(): string;
                ToString(): string;
                Equals(other: Chapter): boolean;

                static FromPluginParamRaw(pluginParam: string): Chapter;

                /**
                 *
                 * @static
                 * @param {string} pluginParam A stringified array of params
                 * @returns {Chapter[]}
                 * @memberof Page
                 */
                static ArrFromPluginParamRaw(pluginParam: string): Chapter[];

                static Null: Chapter;
            }

            class Book extends Literature<Chapter>
            {
                static ParamNames:
                {
                    Name: 'Name',
                    Chapters: 'Chapters'
                };

                static get Factory(): Factories.BookFactory;

                get Name(): string;

                get Contents(): Chapter[];
                /** Alias for the Contents field. */
                get Chapters(): Chapter[];
                get ChapterCount(): number;
                get Pages(): Page[];
                
                /**
                 * Returns the chapter in this book that has the passed name. If there is no such
                 * chapter, Chapter.Null is returned instead.
                 */
                FindChapterWithName(name: string): Chapter;
                Contains(content: Page | Chapter): boolean;

                ToPluginParamRaw(): string;
                ToPluginParamStringified(): string;
                ToJSONString(): string;
                ToString(): string;
                Equals(other: Book): boolean;
                
                static FromPluginParamRaw(pluginParam: string): Book;

                /**
                 * @param {string} pluginParam A stringified array of params
                 * @returns {Page[]}
                 * @memberof Page
                 */
                static ArrFromPluginParamRaw(pluginParam: string): Book[];

                static Null: Book;

                
            }
        }

        namespace Controllers
        {
            /**
            * Responds to user input to allow interacting with the book.
            */
            class BookHandler extends CGT.Core.Input.InputObserver
            {
                get Controls(): Input.Controls;
                get Book(): Models.Book;
                get LeftPage(): Models.Page;
                get RightPage(): Models.Page;

                /**
                 * 
                 * @param toHandle What book this should handle.
                 * @param controls Controls to respond to
                 */
                constructor(toHandle: Models.Book, controls: Input.Controls);

                /**
                 * Decides where the book handler turns pages based on the passed
                 * bookmark.
                 * @param bookmark 
                 */
                public SetPageTurnLocationWith(bookmark: Contexts.Bookmark): void;

                toString(): string;
                Destroy(): void;
            }

            /**
             * Submodule of the BookHandler that handles turning pages, altering a
             * context that decides which pages the system is on.
             */
            class PageTurner
            {
                constructor(bookAccessor: Contexts.BookAccessContext);

                /** 
                 * Tries turning a page in the book the accessor is set for.
                 * @param direction To the next page, or the previous?
                 */
                TurnPageIn(direction: PageTurn): void;

                /**
                 * Sets this to turn pages based on the passed bookmark.
                 * @param bookAccessor 
                 */
                SetWith(bookAccessor: Contexts.Bookmark): void;

                /**
                 * Sets the context this uses to turn pages, to a Bookmark.
                 * @param bookmark 
                 */
                UseBookmark(bookmark: Contexts.Bookmark): void;

            }

            /**
             * Caches PIXI Textures of image files. Has a limited amount of space,
             * so you might need to have it make room for new images at times.
             */
            class ImageKeeper extends CGT.Core.Collections.DestructibleCache
            {
                get Images(): CGT.Core.Collections.TightArray<PIXI.Texture>;
                get ImageCount(): number;

                /**
                 * Registers the texture to this cache. If this keeper's at capacity,
                 * it first removes its earliest-had image.
                 * @param image 
                 */
                Push(texture: PIXI.Texture): void;

                /**
                 * Returns true if this cache has an image with the passed name,
                 * from one of the default MV image folders.
                 * The input must not include the extension. It must also be
                 * the name of a png on disk.
                 * @param imageName 
                 */
                Includes(imageName: string): boolean;

                /**
                 * Returns an image this keeper has with the passed url. If this keeper
                 * doesn't have such an image, BaseTexture.Null is returned instead.
                 * The input must not include the extension. It must also be
                 * the name of a png on disk.
                 * @param imageUrl 
                 */
                Get(imageName: string): PIXI.Texture;
            }

        }

        namespace Factories
        {
            class BookFactory extends CGT.Core.PluginParams.PluginParamObjectFactory<Models.Book>
            {
                
            }

            class ChapterFactory extends CGT.Core.PluginParams.PluginParamObjectFactory<Models.Chapter>
            {

            }

            class PageFactory extends CGT.Core.PluginParams.PluginParamObjectFactory<Models.Page>
            {

            }
        }

        namespace UI
        {
            /**
             * Meant to be a subcomponent of the scene to handle the UI
             */
            class UIManagerComponent
            {
                /** Book currently being displayed. */
                get Book(): Models.Book;
                get LeftPage(): Models.Page;
                get RightPage(): Models.Page;
                /** Bookmark being used as reference to decide what to display. */
                get CurrentBookmark(): Contexts.ObservableBookmark;

                private BookDisplayer: BookDisplayManager;

                constructor(scene: Scene_Base);
            }

            /**
             * Defines common functionality between windows in this plugin's custom scene.
             */
            class Window extends Window_Base
            {
                /**
                 * Event/delegate for updating the window's background image.
                 * Args: 
                 * window: the window object the delegate belongs to
                 * newTex: PIXI.Texture
                 * The new texture for the background image.
                 * 
                 */
                get UpdateBGImage(): CGT.Core.Event;

                /**
                 * Event/delegate for updating the opacity of the window's background
                 * image.
                 * 
                 * Args:
                 * window: the window object the delegate belongs to
                 * newOpacity: number
                 * 
                 */
                get UpdateImageOpacity(): CGT.Core.Event;
                get HasBGImage(): boolean;

                // Symbols/strings for the events
                
                get BGImage(): PIXI.Sprite;
                /** The name of the BG image this is meant to display. */
                get BGImageName(): string;
                /** On a scale of 0-255 */
                get BGOpacity(): number;

                get KeepAspectRatio(): boolean;

                constructor(x: number, y: number, 
                    width: number, height: number, 
                    keepAspectRatio?: boolean);
                
                RefreshDisplay(): void;
                
                HideWindowBorders(): void;

                toString(): string;
            }

            /**
             * Makes up the main parts of the UI.
             */
            class BookDisplayManager
            {
                get LeftPageWindow(): PageWindow;
                get RightPageWindow(): PageWindow;
                get BackWindow(): Window;

                /**
                 * Decides what the page windows display based on the passed bookmark,
                 * keeping in sync with it.
                 * @param bookmark 
                 */
                UseBookmark(bookmark: Contexts.ObservableBookmark): void;

                static FromParams(params: any): BookDisplayManager;
            }
        
            class PageWindow extends Window
            {
                /**
                 * Add listeners to this to customize how this resets its font settings.
                 * arg1: the PageWindow the delegate belongs to
                 * 
                 */
                get ResetFontSettings(): CGT.Core.Event;

                get PageDisplayed(): Models.Page;
                /**
                 * Returns the text of the page this is set to display. 
                 */
                get Text(): string;

                toString(): string;
            }

            class SceneBook extends Scene_Base
            {
                static S: SceneBook;
                static Show(): void;
                static Hide(): void;

                /** The left page the scene is set to display. */
                get LeftPage(): Models.Page;
                /** The right page the scene is set to display. */
                get RightPage(): Models.Page;
                /** The book this scene is set to display. */
                get Book(): Models.Book;
                
                toString(): string;
            }
        }

        namespace Input
        {
            class Controls
            {
                get TurnToPreviousPage(): CGT.Core.Input.InputCode;
                get TurnToNextPage(): CGT.Core.Input.InputCode;
                get ExitBookDisplay(): CGT.Core.Input.InputCode;
            }
        }

        namespace PluginCommands
        {
            namespace Pages
            {
                function SetLockStatus(args: string[]);
                function SetContents(args: string[]);

                // These matter less
                function SetName(args: string[]);
                function SetTextColor(args: string[]);
                function SetBGImage(args: string[]);
                function SetLockBGImage(args: string[]);
                function SetFontFamily(args: string[]);
                function SetFontSize(args: string[]);
            }

            namespace Chapters
            {
                function SetName(args: string[]);
                function SetLockStatus(args: string[]);
            }

            namespace Books
            {
                function SetName(args: string[]);
                function SetCurrentBook(args: string[]);
            }

        }
        
        let PluginName: string;

         function ShowBookScreen(bookToShow: Models.Book): void;
         function HideBookScreen(): void;

        let Params:
        {
            MainWindowSettings:
            {
                Width: Number,
                Height: Number,
                Opacity: Number,
                X: Number,
                Y: Number,
                KeepAspectRatio: boolean,
                BGImage: PIXI.BaseTexture
            },

            LeftWindowSettings:
            {
                Width: Number,
                Height: Number,
                Opacity: Number,
                X: Number,
                Y: Number,
                KeepAspectRatio: boolean
            },

            RightWindowSettings:
            {
                Width: Number,
                Height: Number,
                Opacity: Number,
                X: Number,
                Y: Number,
                KeepAspectRatio: boolean
            },

            BookClassObjects: Models.Book[],

        };

        enum TextType
        {
            plain = 'Plain',
            plainFile = 'PlainFile',
        }

        enum PageTurn
        {
            toNext = 1, toPrevious = -1
        }

        

    }
}
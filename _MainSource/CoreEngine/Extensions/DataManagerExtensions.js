import { Event } from '../Structures/Utils/Event';
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
    ;
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

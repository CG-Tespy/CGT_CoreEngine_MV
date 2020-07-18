import { Event } from '../Structures/Utils/Event';
let oldDataManagerOnLoad = DataManager.onLoad;
class DataManagerExtensions {
    constructor() {
        this.filesLoaded = 0;
        this.databaseLoaded = 'databaseLoaded';
        this.DoneLoading = new Event();
    }
    get FilesToLoad() {
        // @ts-ignore
        return this._databaseFiles.length;
    }
    ;
    onLoad(object) {
        oldDataManagerOnLoad.call(this, object);
        this.filesLoaded++;
        if (this.filesLoaded == this.FilesToLoad)
            this.DoneLoading.Invoke();
    }
}
let extensions = new DataManagerExtensions();
Object.assign(DataManager, extensions);

import { Event } from '../Structures/Utils/Event';
let oldDataManagerOnLoad = DataManager.onLoad;


class DataManagerExtensions
{
    private filesLoaded = 0;
    databaseLoaded = 'databaseLoaded';
    DoneLoading = new Event();

    private get FilesToLoad(): number 
    { 
        // @ts-ignore
        return this._databaseFiles.length; 
    };

    onLoad(object: any)
    {
        oldDataManagerOnLoad.call(this, object);
        this.filesLoaded++;

        if (this.filesLoaded == this.FilesToLoad)
            this.DoneLoading.Invoke();
    }
}

let extensions = new DataManagerExtensions();

Object.assign(DataManager, extensions);
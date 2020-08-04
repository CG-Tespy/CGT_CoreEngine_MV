import * as sinon from "sinon";
import * as PIXI from "./PIXI";

export let Utils = 
{
    isNwjs() { return true; },
    isOptionValid() { return true; }
};

export let MV = 
{
    Array: Array,
    Bitmap: class Bitmap {},
    Game_Action: class  Game_Action {},
    Game_Actor: class Game_Actor {},
    Game_Enemy: class Game_Enemy {},
    Number: Number,

    PluginManager: 
    {
        parameters: sinon.stub(),
    },
    PIXI: PIXI,
    String: String,
    Sprite: class Sprite{},
    Object: Object,

    Scene_Base: class Scene_Base
    {
        create() {}
        terminate() {}
        addChild(toAdd) {}
        update() {}
    },
    BattleManager: class BattleManager {},
    Window_Base: class Window_Base {

        _width: number;
        _height: number;
        opacity: number = 255;

        get width() { return this._width; }
        set width(value) { this._width = value; }

        get height() { return this._height; }
        set height(value: number) { this._height = value; }

        constructor(public x: number, public y: number, width: number, height: number) {
            this._width = width;
            this._height = height;
        }

        addChild() {}
        addChildAt() {}
        update() {}
        removeChild() {}
    },

    Game_Interpreter: class
    {
        pluginCommand(command: string, args: string[]) {}
    },

    Input:
    {
        isPressed: sinon.stub().returns(false),
        isTriggered: sinon.stub().returns(false),
        isRepeated: sinon.stub().returns(false),
        isLongPressed: sinon.stub().returns(false),
    },

    JsonEx:
    {
        maxDepth: 100,
        _id: 1,
        _generateId()
        {
            return this._id++;
        },

        stringify(object: Object)
        {
            var circular = [];
            // @ts-ignore
            JsonEx._id = 1;
            var json = JSON.stringify(this._encode(object, circular, 0));
            this._cleanMetadata(object);
            this._restoreCircularReference(circular);
        
            return json;
        },

        _restoreCircularReference(circulars: any[])
        {
            circulars.forEach(function(circular)
            {
                var key = circular[0];
                var value = circular[1];
                var content = circular[2];
        
                value[key] = content;
            });
        },

        parse(json: string)
        {
            var circular = [];
            var registry = {};
            var contents = this._decode(JSON.parse(json), circular, registry);
            this._cleanMetadata(contents);
            this._linkCircularReference(contents, circular, registry);
        
            return contents;
        },

        _linkCircularReference(contents, circulars, registry)
        {
            circulars.forEach(function(circular){
                var key = circular[0];
                var value = circular[1];
                var id = circular[2];
        
                value[key] = registry[id];
            });
        },

        _cleanMetadata(object)
        {
            if(!object) return;

            delete object['@'];
            delete object['@c'];

            if(typeof object === 'object'){
                Object.keys(object).forEach(function(key){
                    var value = object[key];
                    if(typeof value === 'object'){
                        this._cleanMetadata(value);
                    }
                });
            }
        },

        makeDeepCopy(object)
        {
            return this.parse(this.stringify(object));
        },

        _encode(value, circular, depth) 
        {
            depth = depth || 0;
            if (++depth >= this.maxDepth) {
                throw new Error('Object too deep');
            }
            var type = Object.prototype.toString.call(value);
            if (type === '[object Object]' || type === '[object Array]') {
                value['@c'] = this._generateId();
        
                var constructorName = this._getConstructorName(value);
                if (constructorName !== 'Object' && constructorName !== 'Array') {
                    value['@'] = constructorName;
                }
                for (var key in value) {
                    if (value.hasOwnProperty(key) && !key.match(/^@./)) {
                        if(value[key] && typeof value[key] === 'object'){
                            if(value[key]['@c']){
                                circular.push([key, value, value[key]]);
                                value[key] = {'@r': value[key]['@c']};
                            }else{
                                value[key] = this._encode(value[key], circular, depth + 1);
        
                                if(value[key] instanceof Array){
                                    //wrap array
                                    circular.push([key, value, value[key]]);
        
                                    value[key] = {
                                        '@c': value[key]['@c'],
                                        '@a': value[key]
                                    };
                                }
                            }
                        }
                        else{
                            value[key] = this._encode(value[key], circular, depth + 1);
                        }
                    }
                }
            }
            depth--;
            return value;
        },

        _decode(value, circular, registry) 
        {
            var type = Object.prototype.toString.call(value);
            if (type === '[object Object]' || type === '[object Array]') {
                registry[value['@c']] = value;
        
                if (value['@']) {
                    var constructor = window[value['@']];
                    if (constructor) {
                        // @ts-ignore
                        value = this._resetPrototype(value, constructor.prototype);
                    }
                }
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        if(value[key] && value[key]['@a']){
                            //object is array wrapper
                            var body = value[key]['@a'];
                            body['@c'] = value[key]['@c'];
                            value[key] = body;
                        }
                        if(value[key] && value[key]['@r']){
                            //object is reference
                            circular.push([key, value, value[key]['@r']])
                        }
                        value[key] = this._decode(value[key], circular, registry);
                    }
                }
            }
            return value;
        },

        _getConstructorNamefunction(value) 
        {
            var name = value.constructor.name;
            if (name === undefined) {
                var func = /^\s*function\s*([A-Za-z0-9_$]*)/;
                name = func.exec(value.constructor)[1];
            }
            return name;
        },

        _resetPrototype(value, prototype) {
            if (Object.setPrototypeOf !== undefined) {
                Object.setPrototypeOf(value, prototype);
            } else if ('__proto__' in value) {
                value.__proto__ = prototype;
            } else {
                var newValue = Object.create(prototype);
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        newValue[key] = value[key];
                    }
                }
                value = newValue;
            }
            return value;
        },

    },

    DataManager:
    {
        saveGame(saveFileId)
        {
            try {
                //StorageManager.backup(savefileId);
                // @ts-ignore
                return this.saveGameWithoutRescue(savefileId);
            } catch (e) {
                console.error(e);
                try {
                    //StorageManager.remove(savefileId);
                    //StorageManager.restoreBackup(savefileId);
                } catch (e2) {
                }
                return false;
            }
        },

        saveGameWithoutRescue(savefileId)
        {
            var json = MV.JsonEx.stringify(this.makeSaveContents());
            if (json.length >= 200000) {
                console.warn('Save data too big!');
            }
            MV.StorageManager.save(savefileId, json);
            this._lastAccessedId = savefileId;
            //var globalInfo = this.loadGlobalInfo() || [];
            //globalInfo[savefileId] = this.makeSavefileInfo();
            //this.saveGlobalInfo(globalInfo);
            return true;
        },

        makeSaveContents()
        {
            return {};
        },

        extractSaveContents(contents: object)
        {
            
        }
    },

    StorageManager:
    {
        save(savefileId, json: string)
        {
            this.saveToLocalFile(savefileId, json);
        },

        saveToLocalFile(savefileId, json: string)
        {
            var data = json;
            var fs = require('fs');
            var dirPath = this.localFileDirectoryPath();
            var filePath = this.localFilePath(savefileId);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, data);
        },

        localFileDirectoryPath()
        {
            var path = require('path');

            var base = "../";
            return path.join(base, 'save/');
        },

        localFilePath(saveFileId)
        {
            // @ts-ignore
            var name = 'file%1.rpgsave'.format(savefileId);
            return this.localFileDirectoryPath() + name;
        },

        isLocalMode()
        {
            return true;
        },

    },
};


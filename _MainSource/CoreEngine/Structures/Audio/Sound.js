// Dependencies
import { SoundType } from './SoundType';
import { NumberEx } from '../Extensions/NumberEx';
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
export { Sound };
;

// Dependencies
import { SoundType } from './SoundType';
import { NumberEx } from '../Extensions/NumberEx';
function AlertAboutPlayingNullSoundType() {
    let errMessage = "Cannot play null sound type!";
    alert(errMessage);
}
/**
 * Adapted from the Sound Object in the RMMV Script Call List from the RPGMaker.net Discord server.
 * Makes it easier to work with sound files in MV.
*/
export class Sound {
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
;

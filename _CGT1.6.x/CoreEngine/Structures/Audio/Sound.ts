
// Dependencies
import { SoundType } from './SoundType';
import { NumberEx } from '../Extensions/NumberEx';

type SoundPlayer = (audioParams: MV.AudioParameters, pos?: number) => void;

function AlertAboutPlayingNullSoundType(): void
{
    let errMessage = "Cannot play null sound type!";
    alert(errMessage);
}

/** 
 * Adapted from the Sound Object in the RMMV Script Call List from the RPGMaker.net Discord server. 
 * Makes it easier to work with sound files in MV.
*/
export class Sound
{
    name: string;

    audioParams: MV.AudioParameters = 
    {
        name: "null",
        volume: 0, 
        pitch: 0,
        pan: 0,
        pos: 0
    };

    // Getters
    get Name() { return this.name; }
    get Type() { return this.type; }
    get Volume() { return this.volume; }
    get Pitch() { return this.pitch; }
    get Pan() { return this.pan; }

    // Setters
    set Name(value: string) 
    {
        this.name = value; 
        this.RemoveExtensionFromName();
        this.audioParams.name = this.name;
    }

    set Type(value: SoundType) { this.type = value; }

    // The volume, pitch, and pan setters keep the values in valid ranges.
    set Volume(value: number) 
    { 
        this.volume = NumberEx.Clamp(value, Sound.MinVolume, Sound.MaxVolume);
        this.audioParams.volume = this.volume;
    }

    set Pitch(value: number)
    {
        this.pitch = NumberEx.Clamp(value, Sound.MinPitch, Sound.MaxPitch);
        this.audioParams.pitch = this.pitch;
    }

    set Pan(value: number)
    {
        this.pan = NumberEx.Clamp(value, Sound.MinPan, Sound.MaxPan);
        this.audioParams.pan = this.pan;
    }

    static soundPlayers: Map<SoundType, SoundPlayer> = new Map<SoundType, SoundPlayer>(
        [
            [SoundType.bgm, AudioManager.playBgm.bind(AudioManager)],
            [SoundType.bgs, AudioManager.playBgs.bind(AudioManager)],
            [SoundType.me, AudioManager.playMe.bind(AudioManager)],
            [SoundType.se, AudioManager.playSe.bind(AudioManager)],
            [SoundType.null, AlertAboutPlayingNullSoundType]
        ]
    );

    // Methods

    constructor(fileName: string, private type: SoundType, 
        private volume?: number, private pitch?:number, private pan?: number)
    {
        this.Name = fileName;
        this.Type = type;
        this.Volume = volume || Sound.DefaultVolume;
        this.Pitch = pitch || Sound.DefaultPitch;
        this.Pan = pan || Sound.DefaultPan;
    }

    Play(): void
    {
        let handlePlayingSound = Sound.soundPlayers.get(this.Type);
        handlePlayingSound(this.audioParams);
    }

    protected RemoveExtensionFromName(): void
    {
        if (this.HasExtensionInName())
        {
            let extensionIndex = this.FindExtensionIndex();
            // Don't use the setter here; it'd cause infinite recursion.
            this.name = this.name.substring(0, extensionIndex);
        }
    }

    protected HasExtensionInName(): boolean
    {
        return this.FindExtensionIndex() >= 0;
    }

    protected FindExtensionIndex(): number
    {
        let extensionStartingCharacter = '.';
        return this.Name.indexOf(extensionStartingCharacter);
    }

    Copy(): Sound
    {
        let copy = new Sound(this.Name, this.Type, this.Volume, this.Pitch, this.Pan);
        return copy;
    }
    
    toString(): string
    {
        return '[object CGT.Sound]';
    }

    static MinVolume = 0;
    static MaxVolume = 100;
    static DefaultVolume = 50;

    static MinPitch = 50;
    static MaxPitch = 150;
    static DefaultPitch = 100;

    static MinPan = -100;
    static MaxPan = 100;
    static DefaultPan = 0;

    static Null = Object.freeze(new Sound("???", SoundType.bgm, 0, 0, 0));

};

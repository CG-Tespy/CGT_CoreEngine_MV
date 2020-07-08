import "./CoreEngine/Extensions/_Extensions_Setup";
import 
{ 
    Audio, 
    Collections, 
    Graphics, 
    Extensions, 
    IO,
    Utils, 
} from "./CoreEngine/Structures/_Structures_Setup";


export let CGT =
{
    version: 1.01,
    Core:
    {
        Audio: Audio,
        Collections: Collections,
        Extensions: Extensions,
        Graphics: Graphics,
        IO: IO,
        Utils: Utils,
    },

};

// @ts-ignore
window.CGT = CGT;


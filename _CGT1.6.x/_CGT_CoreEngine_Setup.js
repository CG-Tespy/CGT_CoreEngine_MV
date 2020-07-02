import "./CoreEngine/Extensions/_Extensions_Setup";
import { Audio, Graphics, Extensions, IO } from "./CoreEngine/Structures/_Structures_Setup";
export let CGT = {
    version: 1.01,
    path: "./_CGT1.6.x/",
    Core: {
        path: "./_CGT1.6.x/CoreEngine/",
        Audio: Audio,
        Extensions: Extensions,
        Graphics: Graphics,
        IO: IO,
    },
};
// @ts-ignore
window.CGT = CGT;

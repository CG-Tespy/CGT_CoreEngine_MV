import "./CoreEngine/Extensions/_Extensions_Setup";
import { Audio, Collections, Graphics, Extensions, IO, Utils, } from "./CoreEngine/Structures/_Structures_Setup";
import * as TopCoreLevel from "./CoreEngine/Structures/TopCoreLevel/_TopCoreLevel_Setup";
export let CGT = {
    version: 1.01,
    path: "./_CGT1.6.x/",
    Core: {
        path: "./_CGT1.6.x/CoreEngine/",
        Audio: Audio,
        Collections: Collections,
        Extensions: Extensions,
        Graphics: Graphics,
        IO: IO,
        Utils: Utils,
        Event: TopCoreLevel.Event,
        Callbacks: TopCoreLevel.Callbacks,
    },
};
// @ts-ignore
window.CGT = CGT;

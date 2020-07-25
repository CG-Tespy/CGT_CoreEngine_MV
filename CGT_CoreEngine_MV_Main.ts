/*:
@plugindesc Mainly contains utility code that other CGT scripts rely on.
@author CG-Tespy – https://github.com/CG-Tespy
@help This is version 1.01.03 of this plugin. Tested with RMMV versions 1.5.1 and 1.6.2.

Please make sure to credit me (and any of this plugin's contributing coders)
if you're using this plugin in your game (include the names and webpage links).

Other code contributors:
MinusGix
Comficker - https://gist.github.com/comficker
rob - https://stackoverflow.com/users/563532/rob
Dr. Axel Rauschmayer - https://2ality.com/

If you want to edit this plugin, you may be better off editing and 
building the source: https://github.com/CG-Tespy/CGT_CoreEngine_MV

*/

import { CGT } from "./_MainSource/_CGT_CoreEngine_Setup";

let coreEngine = 
{
    CGT: CGT,
};

Object.assign(window, coreEngine);


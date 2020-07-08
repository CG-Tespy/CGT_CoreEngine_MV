/*:
 * @plugindesc Mainly contains utility code that other CGT scripts rely on.
 * @author CG-Tespy – https://github.com/CG-Tespy
 * @help This is version 0.67 of this plugin. For RMMV versions 1.5.1 and above.

Make sure to credit me (and any of this plugin's contributing coders)
if you're using this plugin in your game (include the names and webpage links).

Other code contributors:
MinusGix
Endless Illusion Software – http://endlessillusoft.com/
Comficker - https://gist.github.com/comficker
rob - https://stackoverflow.com/users/563532/rob
Dr. Axel Rauschmayer - https://2ality.com/

*/

import { CGT } from "./_CGT1.6.x/_CGT_CoreEngine_Setup";
console.log(CGT);

let filePath = "data/BoDiSyPages/someTextFile.txt";
let File = CGT.Core.IO.File;
let fileText = File.ReadSync(filePath);

console.log(fileText);

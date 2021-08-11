import { HookUpCommandMapToInterpreter } from './CommandMap';
export { RegisterPluginCommand as Register} from './CommandMapAccess';
export { RegisterMultiplePluginCommands as RegisterMulti }from "./CommandMapAccess";
export { commandMap } from "./CommandMap";

HookUpCommandMapToInterpreter();
// Maps the command names to the functions that take the raw args
export let commandMap = new Map();
export function HookUpCommandMapToInterpreter() {
    let oldPluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = CGTPluginCommand;
    function CGTPluginCommand(commandName, args) {
        oldPluginCommand.call(this, commandName, args);
        if (CommandIsInMap(commandName))
            ExecuteCommandFromMap(commandName, args);
    }
    function CommandIsInMap(commandName) {
        return commandMap.get(commandName) != null;
    }
    function ExecuteCommandFromMap(commandName, args) {
        let commandFunc = commandMap.get(commandName);
        commandFunc.call(this, args);
    }
}

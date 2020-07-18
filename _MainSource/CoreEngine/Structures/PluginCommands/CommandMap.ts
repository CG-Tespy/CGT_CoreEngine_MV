// Maps the command names to the functions that take the raw args
export let commandMap = new Map<string, RawCommandFunc>();
export type RawCommandFunc = (args: string[]) => any;

export function HookUpCommandMapToInterpreter()
{
    let oldPluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = CGTPluginCommand;

    function CGTPluginCommand(commandName: string, args: string[])
    {
        oldPluginCommand.call(this, commandName, args);

        if (CommandIsInMap(commandName))
            ExecuteCommandFromMap(commandName, args);
    }

    function CommandIsInMap(commandName: string): Boolean
    {
        return commandMap.get(commandName) != null;
    }

    function ExecuteCommandFromMap(commandName: string, args: string[])
    {
        let commandFunc = commandMap.get(commandName);
        commandFunc.call(this, args);
    }
}


export function RegisterPluginCommand(commandName, commandFunc) {
    var commandMap = CGT.Core.PluginCommands.commandMap;
    commandMap.set(commandName, commandFunc);
}

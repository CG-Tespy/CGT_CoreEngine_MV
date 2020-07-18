export function RegisterPluginCommand(commandName, commandFunc) {
    let commandMap = CGT.Core.PluginCommands.commandMap;
    commandMap.set(commandName, commandFunc);
}

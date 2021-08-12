import { RawCommandFunc } from './CommandMap';

export function RegisterPluginCommand(commandName: string, commandFunc: RawCommandFunc)
{
    let commandMap = CGT.Core.PluginCommands.commandMap;
    commandMap.set(commandName, commandFunc);
}

export function RegisterMultiplePluginCommands(toRegister: Map<string, RawCommandFunc>)
{
    for (let commandName of toRegister.keys())
    {
        let commandFunc = toRegister.get(commandName);
        RegisterPluginCommand(commandName, commandFunc);
    }
}
import { RawCommandFunc } from './CommandMap';

export function RegisterPluginCommand(commandName: string, commandFunc: RawCommandFunc)
{
    let commandMap = CGT.Core.PluginCommands.commandMap;
    commandMap.set(commandName, commandFunc);
}
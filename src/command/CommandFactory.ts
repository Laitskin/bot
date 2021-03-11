import { commands as commandsList } from './commands'

export class CommandFactory {
    public static create(commandName: string, args?) {
        if (!commandsList[commandName]) {
            throw new Error(`Command "\'${commandName}\'"not found`);
        }

        return new commandsList[commandName](args);
    };
}

import {Command} from "./command/Command";
import {DiscordMessage} from "./types";
import { capitalize } from 'lodash';
import {CommandFactory} from "./command/CommandFactory";

export class DiscordMessageHandler {
    public static handle(message: DiscordMessage) {
        const command: Command = this.getCommandInstance(message.cleanContent);
        this.validateMessage(message, command);

        switch (command) {
            // Do stuff
        }
    }

    private static getCommandInstance(message: string): Command {
        const hasMention = message.includes('@');
        const commandName = this.getCommandName(hasMention, message);

        // TODO: Add handling of args
        return CommandFactory.create(commandName);
    }

    private static validateMessage(message: DiscordMessage, command: Command) {
        // do validate;
    }

    private static parseMessage(message) {
        //
    }
    private static getCommandName(hasMention, message: string) {
        return capitalize((hasMention ? message.slice(1, message.indexOf('@')) : message).replace('-', '').trim());
    }
}
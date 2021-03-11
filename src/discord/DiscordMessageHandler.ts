import {Command} from "../command/Command";
import { capitalize } from 'lodash';
import {CommandFactory} from "../command/CommandFactory";
import {APIMessage} from "discord-api-types/v8/payloads/channel";

export class DiscordMessageHandler {
    public handle(message: APIMessage) {
        const command: Command = this.getCommandInstance(message);
        this.validateMessage(message, command);

        return command.run();
    }

    private getCommandInstance(message: APIMessage): Command {
        const hasMention = message.mentions.length > 0;
        const commandName = this.getCommandName(hasMention, message.content);

        // TODO: Add handling of args
        return CommandFactory.create(commandName);
    }

    private validateMessage(message: APIMessage, command: Command) {
        // Is blacklisted?
        // Is bot?
        // Command allows author?
        // Command is locked?
    }

    private getCommandName(hasMention, message: string) {
        return capitalize((hasMention ? message.slice(1, message.indexOf('@')) : message).replace('-', '').trim());
    }
}
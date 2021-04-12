import { Command } from "../command/Command";
import { capitalize } from "lodash";
import { CommandFactory } from "../command/CommandFactory";
import { APIMessage } from "discord-api-types/v8/payloads/channel";

export class DiscordMessageHandler {
  public handle(message: APIMessage): Promise<any> {
    const command: Command = this.getCommandInstance(message);
    this.validateMessage(message, command);

    return command.execute();
  }

  private getCommandInstance({
    content,
    mentions,
    channel,
    author,
  }: any): Command {
    const hasMention = mentions.length > 0;
    const commandName = this.getCommandName(hasMention, content);

    // TODO: Add handling of args
    return CommandFactory.create(commandName, { mentions, channel, author });
  }

  private validateMessage(message: APIMessage, command: Command) {
    command.validate(message.author);
    // Is bot?
    // Command allows author?
    // Command is locked?
  }

  private getCommandName(hasMention, message: string) {
    return capitalize(
      (hasMention ? message.slice(1, message.indexOf("@")) : message)
        .replace("-", "")
        .trim()
    );
  }
}

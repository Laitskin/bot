import { APIUser } from "discord-api-types";
import { discordService } from "../../main";
import { LogEvent, Logger } from "../Logger";

export abstract class Command {
  protected discordService = discordService;
  protected author;
  protected channel;
  protected mentions;
  protected commandName;

  protected abstract run(): Promise<any>;

  protected constructor({ mentions, channel, commandName, author }) {
    Logger.logEvent(LogEvent.COMMAND_BOOTSTRAP);

    this.mentions = mentions;
    this.channel = channel;
    this.commandName = commandName;
    this.author = author;
  }

  public async execute(): Promise<any> {
    Logger.logEvent(LogEvent.COMMAND_RUN, this.commandName);

    try {
      const result = await this.run();
      Logger.logEvent(LogEvent.COMMAND_OUTPUT, `\n ${result}`);
    } catch (err) {
      Logger.logEvent(LogEvent.COMMAND_ERROR, {
        suffix: `: ${err.message}`,
        author: this.author,
      });
      // Save error?
    }
  }

  public abstract validate(messageAuthor: APIUser);
}

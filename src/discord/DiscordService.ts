import { Client, ClientEvents } from "discord.js";
import { DiscordMessageHandler } from "./DiscordMessageHandler";
import { APIMessage } from "discord-api-types";

export class DiscordService {
  public client?: Client;
  private messageHandler: DiscordMessageHandler;
  constructor() {
    //this.client = new Client();
    this.messageHandler = new DiscordMessageHandler();
  }

  init() {
    //this.client.on("message" as any, this.messageHandler.handle);
    return this;
  }

  async mockCommand(commandName: string, author, mentions: any[] = []) {
    try {
      return await this.messageHandler.handle({
        content: commandName,
        author,
        mentions,
      } as APIMessage);
    } catch (err) {
      console.log(err.message);
    }
  }
}

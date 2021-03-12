import { Client, ClientEvents } from "discord.js";
import { DiscordMessageHandler } from "./DiscordMessageHandler";
import { APIMessage } from "discord-api-types";

export class DiscordService {
  private client: Client;
  private messageHandler: DiscordMessageHandler;
  constructor() {
    this.client = new Client();
    this.messageHandler = new DiscordMessageHandler();
  }

  init() {
    this.client.on("message" as any, this.messageHandler.handle);
  }

  async mockCommand(commandName: string, mentions: any[] = []) {
    try {
      return await this.messageHandler.handle({
        content: commandName,
        mentions,
      } as APIMessage);
    } catch (err) {
      console.log(err.message);
    }
  }
}

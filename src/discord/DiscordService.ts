import { Client } from 'discord.js'
import {DiscordMessageHandler} from "./DiscordMessageHandler";

export class DiscordService {
    private client;
    private messageHandler;
    constructor() {
        this.client = new Client();
        this.messageHandler = new DiscordMessageHandler();
    }

    init(){
        this.client.on('message', this.messageHandler.handle);
    }
}
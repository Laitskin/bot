import {Command} from "./command/Command";

export interface Commands {
    string: Command;
}

export interface DiscordMessage {
    cleanContent: string;
}

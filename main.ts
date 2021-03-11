import {DiscordMessageHandler} from "./src/discord/DiscordMessageHandler";
import {SessionService} from "./src/session/SessionService";
import {DatabaseService} from "./src/database/DatabaseService";
import express from 'express';
import {DiscordService} from "./src/discord/DiscordService";

export let databaseService;
export let sessionService;
export let discordService;

let app;
let listener;

function init() {
    console.log('Starting services');
    databaseService  = new DatabaseService();
    sessionService = new SessionService();
    discordService = new DiscordService();

    console.log('Starting server');
    app = express();
    listener = app.listen(process.env.PORT, () => {
        console.log("Your app is listening on port " + listener.address().port);
    });

    discordService.init();
}

init();

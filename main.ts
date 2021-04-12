import express from "express";

import { SessionService } from "./src/session/SessionService";
import { DatabaseService } from "./src/database/DatabaseService";
import { DiscordService } from "./src/discord/DiscordService";
import { DatabaseTable } from "./src/database/types";
import { Client, ClientEvents } from "discord.js";
import {LogEvent, Logger} from "./src/Logger";

export let databaseService: DatabaseService;
export let sessionService: SessionService;
export let discordService: DiscordService;

let app;
let listener;

async function init() {
  databaseService = new DatabaseService().init();
  sessionService = new SessionService().init();
  discordService = new DiscordService().init();

  Logger.logEvent(LogEvent.BOOTSTRAP);
  app = express();
  listener = app.listen(process.env.PORT, () => {});

  await discordService.mockCommand("-leaderboard", {
    userName: "Revan",
  });
}

init();

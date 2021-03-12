import { SessionService } from "./src/session/SessionService";
import { DatabaseService } from "./src/database/DatabaseService";
import express from "express";
import { DiscordService } from "./src/discord/DiscordService";
import { ListPrettifier } from "./src/util/ListPrettifier";

export let databaseService: DatabaseService;
export let sessionService: SessionService;
export let discordService: DiscordService;
export let listPrettifier: ListPrettifier;

let app;
let listener;

function init() {
  console.log("Starting services");
  databaseService = new DatabaseService();
  sessionService = new SessionService();
  discordService = new DiscordService();
  listPrettifier = new ListPrettifier();

  console.log("Starting server");
  app = express();
  listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });

  discordService.init();

  // discordService.mockCommand("-help");
  const list = listPrettifier.prettify([
    {
      userName: "lait",
      petePuntos: -1000,
      creditos: 30,
    },
  ]);

  console.log(list);
}

init();

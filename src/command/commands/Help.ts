import { Command } from "../Command";
import { APIUser } from "discord-api-types";

export class Help extends Command {
    constructor() {
    super();
    console.log("Im helping!");
  }

  async run() {
    //
  }

  validate(messageAuthor: APIUser) {
    return;
  }
}

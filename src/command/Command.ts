import { APIUser } from "discord-api-types";

export abstract class Command {
  public constructor() {
    console.log("Command started");
  }

  public abstract run(): Promise<any>;
  public abstract validate(messageAuthor: APIUser);
}

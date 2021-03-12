import { Command } from "../Command";
import { APIUser } from "discord-api-types";
import { databaseService } from "../../../main";
import { DatabaseTable } from "../../database/types";

export class Leaderboard extends Command {
  async run() {
    const data = await this.getData();
  }

  private async getData() {
    return await databaseService.get(DatabaseTable.PETEPUNTOS, {
      sortBy: {
        column: "score",
        order: "DESC",
      },
    });
  }

  private convertDataToSringTable(data: any[]) {

  }

  validate(messageAuthor: APIUser) {
    //throw new Error('User "username" is not allowed to run this command');
  }
}

import { Command } from "../Command";
import { APIUser } from "discord-api-types";
import { databaseService } from "../../../main";
import { DatabaseTable } from "../../database/types";
import { Player } from "../../types";
import { Logger } from "../../Logger";

export class Leaderboard extends Command {
  async run() {
    const data = await databaseService.get<Player>(DatabaseTable.DATA, {
      sortBy: {
        column: "score",
        order: "DESC",
      },
    });

    const list = this.convertDataToSringTable(data);
    //this.channel.send(list);

    return list;
  }

  private convertDataToSringTable(data: Player[]) {
    return data.reduce((list, { user, score }) => {
      return list + `${user}: ${score} \n`;
    }, "");
  }

  validate(messageAuthor: APIUser) {}
}

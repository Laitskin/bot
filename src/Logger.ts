import { addAuthor, addTimestamp } from "./util/common";
import { BackgroundColor, colorize, FontColor } from "./logger/ColorDecorator";

export enum LogEvent {
  BOOTSTRAP = "Starting server",
  COMMAND_BOOTSTRAP = "Bootstraped command",
  COMMAND_RUN = "Running command",
  COMMAND_ERROR = "Error on run",
  COMMAND_OUTPUT = "Output",
}

export class Logger {
  public static logSuccess(message: string) {
    this.log(colorize(message, FontColor.WHITE, BackgroundColor.GREEN));
  }

  public static logEvent(event: LogEvent, args?) {
    let content: string[] = colorize(event, FontColor.YELLOW);

    switch (typeof args) {
      case "string":
        content.push(args);
        break;
      case "object":
        // content = `${event} ${args.suffix}`;
        break;
    }

    if (args && args.author) {
      // content = addAuthor(content, args.author);
    }

    return Logger.log(addTimestamp(content));
  }

  public static log(mesage) {
    console.log(...mesage);
  }
}

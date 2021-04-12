import { BackgroundColor, FontColor, X } from "../logger/ColorDecorator";

export function now() {
  return new Date().toLocaleTimeString();
}

export function addTimestamp(message) {
  message.unshift(
    FontColor.CYAN,
    "[",
    FontColor.WHITE,
    now(),
    FontColor.CYAN,
    "]",
    X.RESET
  );

  return message;
}

export function addAuthor(message: string, user) {
  return `[${user.userName}] ${message}`;
}

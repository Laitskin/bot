export enum X {
  RESET = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m",
  Underscore = "\x1b[4m",
  Blink = "\x1b[5m",
  Reverse = "\x1b[7m",
  Hidden = "\x1b[8m",
}

export enum FontColor {
  BLACK = "\x1b[30m",
  RED = "\x1b[31m",
  GREEN = "\x1b[32m",
  YELLOW = "\x1b[33m",
  BLUE = "\x1b[34m",
  MAGENTA = "\x1b[35m",
  CYAN = "\x1b[36m",
  WHITE = "\x1b[37m",
}

export enum BackgroundColor {
  BLACK = "\x1b[40m",
  RED = "\x1b[41m",
  GREEN = "\x1b[42m",
  YELLOW = "\x1b[43m",
  BLUE = "\x1b[44m",
  MAGENTA = "\x1b[45m",
  CYAN = "\x1b[46m",
  WHITE = "\x1b[47m",
}

export function colorize(
  text,
  color: FontColor,
  backgroundColor?: BackgroundColor
) {
  const result = [color, text, X.RESET];

  if (backgroundColor) {
    result.unshift(backgroundColor);
  }

  return result;
}

import colors from "colors";
colors.enable();
class Logs {
  private readonly log;
  constructor() {
    this.log = console.log;
  }

  red(str: string) {
    console.log(colors.red(str));
  }

  green(str: string) {
    console.log(colors.green(str));
  }
}

export const logs = new Logs();

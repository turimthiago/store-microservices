export class Logger {
  private static readonly LCERROR = "\x1b[31m%s\x1b[0m"; //red
  private static readonly LCWARN = "\x1b[33m%s\x1b[0m"; //yellow
  private static readonly LCINFO = "\x1b[32m%s\x1b[0m"; //green

  static error(message: string, ...optionalParams: []) {
    console.error(
      Logger.LCERROR,
      `[ERROR] ${new Date().toISOString()}`,
      message,
      ...optionalParams
    );
  }
  static warn(message: string, ...optionalParams: []) {
    console.warn(
      Logger.LCWARN,
      `[WARNING] ${new Date().toISOString()}`,
      message,
      ...optionalParams
    );
  }
  static info(message: string, ...optionalParams: []) {
    console.info(
      Logger.LCINFO,
      `[INFO] ${new Date().toISOString()}`,
      message,
      ...optionalParams
    );
  }
}

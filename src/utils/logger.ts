// node_modules
import path from "path";
import { Logger } from "logger";

// group log type
type DescriptionInfo = {
  description: string;
  info: any;
};

type GroupLog = {
  title: string;
  descriptions: DescriptionInfo[];
};

// customized server logger
class ServerLogger {
  // logger instance
  private fileLogger: Logger;

  // constructor
  constructor() {
    const loggerFilePath = path.join(__dirname, "../../logs/server.log");
    this.fileLogger = new Logger(loggerFilePath);
  }

  // log
  private log(...descriptions: string[]) {
    this.fileLogger.log("info", ...descriptions);
    console.log(...descriptions);
  }

  // log information
  info(description: string) {
    this.fileLogger.info(description);
    console.info(description);
  }

  // log error
  error(description: string) {
    this.fileLogger.error(description);
    console.error(description);
  }

  // log fatal
  fatal(description: string) {
    this.fileLogger.fatal(description);
    console.error(description);
  }

  // log group
  group(groupDescription: GroupLog) {
    this.info(`/---------- ${groupDescription.title} ----------/`);
    groupDescription.descriptions.forEach((description: DescriptionInfo) => {
      this.log("\t", description.description, ":", description.info);
    });
    this.info(`/---------- End ----------/`);
  }
}

// export type
export { GroupLog };

// export server logger
export default new ServerLogger();

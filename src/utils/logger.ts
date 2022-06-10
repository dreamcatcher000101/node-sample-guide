// node_modules
import path from "path";
import { Logger } from "logger";

// utils
import Env from "./env.handler";

// group description type
type DescriptionInfo = {
  description: string;
  info: any;
};

// group log type
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
    if (Env.isProduction()) {
      this.fileLogger.log("info", ...descriptions);
    } else {
      console.log(...descriptions);
    }
  }

  // log information
  info(description: string) {
    if (Env.isProduction()) {
      this.fileLogger.info(description);
    } else {
      console.info(description);
    }
  }

  // log error
  error(description: string) {
    if (Env.isProduction()) {
      this.fileLogger.error(description);
    } else {
      console.error(description);
    }
  }

  // log fatal
  fatal(description: string) {
    if (Env.isProduction()) {
      this.fileLogger.fatal(description);
    } else {
      console.error(description);
    }
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

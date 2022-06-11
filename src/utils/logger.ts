import path from "path";
import { Logger } from "logger";

import Env from "./env.handler";

type DescriptionInfo = {
  description: string;
  info: any;
};

type GroupLog = {
  title: string;
  descriptions: DescriptionInfo[];
};

class ServerLogger {
  private fileLogger: Logger;

  constructor() {
    const loggerFilePath = path.join(__dirname, "../../logs/server.log");
    this.fileLogger = new Logger(loggerFilePath);
  }

  private log(...descriptions: string[]) {
    if (Env.isProduction()) {
      this.fileLogger.log("info", ...descriptions);
    } else {
      console.log(...descriptions);
    }
  }

  info(description: string) {
    if (Env.isProduction()) {
      this.fileLogger.info(description);
    } else {
      console.info(description);
    }
  }

  error(description: string) {
    if (Env.isProduction()) {
      this.fileLogger.error(description);
    } else {
      console.error(description);
    }
  }

  fatal(description: string) {
    if (Env.isProduction()) {
      this.fileLogger.fatal(description);
    } else {
      console.error(description);
    }
  }

  group(groupDescription: GroupLog) {
    this.info(`/---------- ${groupDescription.title} ----------/`);
    groupDescription.descriptions.forEach((description: DescriptionInfo) => {
      this.log("\t", description.description, ":", description.info);
    });
    this.info(`/---------- End ----------/`);
  }
}

export { GroupLog };

export default new ServerLogger();

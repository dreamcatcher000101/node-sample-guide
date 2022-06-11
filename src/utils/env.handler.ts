import dotenv from "dotenv";
import fs from "fs";
import path from "path";

class Env {
  private requiredKeys = ["PORT", "MONGODB_URL"];

  init() {
    // get the NODE_ENV variable from environment variables
    // NODE_ENV environment variable is must
    const environment = this.getEnvironment();
    if (!environment) {
      throw new Error("Please run command with NODE_ENV value");
    }

    // ensure an environment file exists
    const envFilePath = `.env.${environment}`;
    if (!fs.existsSync(envFilePath)) {
      throw new Error(
        `Please add a ${envFilePath} file to the root directory with a NODE_ENV value`
      );
    }
    dotenv.config({
      path: path.resolve(process.cwd(), envFilePath),
    });

    // get a list of keys that are not in .env but are required in this.requiredKeys
    const missingKeys = this.requiredKeys.filter((key) => {
      const variable = this.getEnvironmentVariable(key);
      if (!variable) {
        return true;
      }
      return false;
    });

    if (missingKeys.length) {
      const message = `
          The following required env variables are missing: 
              ${missingKeys.join(", ")}
          Please add them to your ${envFilePath} file
        `;
      throw new Error(message);
    }
  }

  getEnvironmentVariable(variable: string): string {
    const environmentVariables: any = process.env;
    return environmentVariables[variable];
  }

  getEnvironment(): string {
    return this.getEnvironmentVariable("NODE_ENV");
  }

  isDevelopment(): boolean {
    return this.getEnvironment() === "development";
  }

  isProduction(): boolean {
    return this.getEnvironment() === "production";
  }
}

export default new Env();

// node_modules
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

class Env {
  private requiredKeys = ["PORT", "MONGODB_URL"];

  init() {
    const environment = this.getEnvironment();
    if (!environment) {
      throw new Error("Please run command with NODE_ENV value");
    }

    const envFilePath = `.env.${environment}`;
    // first, ensure a .env file xists
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
      // get this required key from the .env.* file
      const variable = this.getEnvironmentVariable(key);
      // if the variable is not defined
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

  // Get a value from the .env.* file
  getEnvironmentVariable(variable: string): string {
    const environmentVariables: any = process.env;
    return environmentVariables[variable];
  }

  // Get the current environment. Can be null.
  getEnvironment(): string {
    return this.getEnvironmentVariable("NODE_ENV");
  }

  // check development environment
  isDevelopment(): boolean {
    return this.getEnvironment() === "development";
  }

  // check production environment
  isProduction(): boolean {
    return this.getEnvironment() === "production";
  }
}

export default new Env();

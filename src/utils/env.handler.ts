// node_modules
import dotenv from "dotenv";
import path from "path";

// environment type
type Environment = {
  NODE_ENV: string | undefined;
  FILE_PATH: string;
};

class Env {
  // the file to be loaded in development environments
  private environments: Environment[] = [
    {
      NODE_ENV: undefined,
      FILE_PATH: ".env",
    },
    {
      NODE_ENV: "development",
      FILE_PATH: ".env.development",
    },
    {
      NODE_ENV: "production",
      FILE_PATH: ".env.production",
    },
  ];

  constructor() {
    // found in the currrent working directory
    const environment = this.getEnvironment();

    const environmentIndex = this.environments
      .map((environment: Environment) => environment.NODE_ENV)
      .indexOf(environment);
    if (environmentIndex < 0) {
      // unknown node environment
      dotenv.config({
        path: path.resolve(process.cwd(), this.environments[0].FILE_PATH),
      });
    } else {
      // specific node environment
      dotenv.config({
        path: path.resolve(
          process.cwd(),
          this.environments[environmentIndex].FILE_PATH
        ),
      });
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

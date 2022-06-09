// node_modules
import express, { Request, Response } from "express";

// config
import { PORT } from "./config";

// Messages
import { MESSAGES } from "./consts";

const app = express();
app.listen(PORT, () => {
  console.info(MESSAGES.SERVER.STARTING_SUCCESS);

  app.get("/", (req: Request, res: Response) => {
    res.send("Application works!");
  });
});

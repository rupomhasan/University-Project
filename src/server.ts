import app from "./app";
import mongoose from "mongoose";
import config from "./app/config/index";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_Url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("unhandledRejection is detected , shutting down ... ");

  if (server) {
    server.close(() => {
      process.exit();
    });
  }
  process.exit();
});

process.on("uncaughtException", () => {
  console.log("uncaughtException is detected , shutting down...");
  process.exit();
});

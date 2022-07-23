import "reflect-metadata";
import "dotenv/config";
import express from "express";

import FacomNormCred from "@FacomNormCred/index";
import { AppDataSource } from "@typeorm/data-source";
import routes from "./routes";

(async () => {
  await AppDataSource.initialize()
    .then(async () => {
      console.log(`🗂️  Db connected!`);
    })
    .catch((error) =>
      console.log(error, "🗂️  Db fail to connect (error above)\n")
    );

  const app = express();
  const port = 3000;

  app.use(express.json());
  app.use(routes);

  app.get("/", async (req, res) => {
    return res.json({ okay: "okay" });
  });

  app.listen(port, () => {
    console.log(`🚀 Running app on ${port}`);
  });
})();

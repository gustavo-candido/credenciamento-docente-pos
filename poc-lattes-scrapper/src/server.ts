import "reflect-metadata";
import "dotenv/config";
import express from "express";

import FacomLattesExtractor from "@FacomLattesExtractor/index";
import FacomNormCred from "@FacomNormCred/index";
import { AppDataSource } from "@typeorm/data-source";

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

  app.get("/", async (req, res) => {
    const infos = await new FacomLattesExtractor().getProdBib();
    return res.json(infos);
  });

  app.get("/test", async (req, res) => {
    const infos = await new FacomNormCred().getProdBibModule();
    return res.json(infos);
  });

  app.listen(port, () => {
    console.log(`🚀 Running app on ${port}`);
  });
})();

import "reflect-metadata";
import "dotenv/config";
import express from "express";

import FacomLattesExtractor from "@FacomLattesExtractor/index";
import FacomNormCred from "@FacomNormCred/index";
import { AppDataSource } from "@typeorm/data-source";
import { User } from "@typeorm/entity/User";
import QualisPerSeedService from "@typeorm/seed/QualisPerSeedService";

(async () => {
  await AppDataSource.initialize()
    .then(async () => {
      console.log(`🗂️  Db connected!`);
    })
    .catch((error) => console.log("🗂️  Db fail to connect", error));

  const app = express();
  const port = 3000;

  // const userRepository = AppDataSource.getRepository(User);

  // const users = await userRepository.find();

  // console.log(`users`);
  // console.log(users);

  app.use(express.json());

  app.get("/", (req, res) => {
    const infos = new FacomLattesExtractor().getProdBib().build();
    return res.json(infos);
  });

  app.get("/test", (req, res) => {
    const infos = new FacomNormCred().build();
    return res.json(new QualisPerSeedService().run());
  });

  app.listen(port, () => {
    console.log(`🚀 Running app on ${port}`);
  });
})();

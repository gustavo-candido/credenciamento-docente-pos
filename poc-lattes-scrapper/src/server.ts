import express from "express";
import "dotenv/config";

import FacomLattesExtractor from "@FacomLattesExtractor/index";
import FacomNormCred from "@FacomNormCred/index";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  const infos = new FacomLattesExtractor().getProdBib().build();
  return res.json(infos);
});

app.get("/test", (req, res) => {
  const infos = new FacomNormCred().build();
  return res.json(infos);
});

app.listen(port, () => {
  console.log(`🚀 Running on ${port}`);
});

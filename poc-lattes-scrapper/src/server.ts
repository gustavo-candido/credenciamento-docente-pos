import express from "express";
import "dotenv/config";
import Importer from "./Importer";
import { readQualis } from "./utils";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  const infos = new Importer()
    .getName()
    .getFieldOfSearch()
    .getMentorshipWork()
    .getProdBib()
    .build();
  return res.json(infos);
});

app.get("/test", (req, res) => {
  const infos = new Importer().getProdBib().build();
  // return res.json(readQualis());
  return res.json(infos);
});

app.listen(port, () => {
  console.log(`🚀 Running on ${port}`);
});

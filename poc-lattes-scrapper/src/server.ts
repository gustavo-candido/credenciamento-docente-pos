import express from "express";
import "dotenv/config";
import Importer from "./Importer";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  const infos = new Importer()
    .getName()
    .getFieldOfSearch()
    .getMentorshipWork()
    .build();
  return res.json(infos);
});

app.get("/test", (req, res) => {
  const infos = new Importer().getMentorshipWork().build();
  return res.json(infos);
});

app.listen(port, () => {
  console.log(`🚀 Running on ${port}`);
});

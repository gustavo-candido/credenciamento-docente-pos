import express from "express";
import Importer from "./Importer";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  const infos = new Importer().getName().getFieldOfSearch().build();
  return res.json(infos);
});

app.listen(port, () => {
  console.log(`🚀 Running on ${port}`);
});

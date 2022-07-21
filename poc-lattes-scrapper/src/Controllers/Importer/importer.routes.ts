import { Router } from "express";
import ImporterControler from "./ImporterController";
const importerRoutes = Router();

const importerControler = new ImporterControler();
importerRoutes.post(
  "/:id",
  async (request, response) => await importerControler.import(request, response)
);

export default importerRoutes;

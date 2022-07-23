import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import ImporterController from "./ImporterController";

const importerRoutes = Router();
const upload = multer(uploadConfig.multer);

const importerController = new ImporterController();

importerRoutes.post(
  "/",
  upload.single("record"),
  async (request, response) =>
    await importerController.import(request, response)
);

export default importerRoutes;

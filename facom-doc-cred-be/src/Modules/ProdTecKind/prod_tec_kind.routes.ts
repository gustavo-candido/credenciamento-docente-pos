import { Router } from "express";
import ProdTecKindController from "./ProdTecKindController";

const prodTecKindRoutes = Router();

const prodTecKindController = new ProdTecKindController();

prodTecKindRoutes.post(
  "/",
  async (request, response) =>
    await prodTecKindController.create(request, response)
);

prodTecKindRoutes.get(
  "/:id",
  async (request, response) =>
    await prodTecKindController.findById(request, response)
);

prodTecKindRoutes.patch(
  "/:id/update",
  async (request, response) =>
    await prodTecKindController.update(request, response)
);

prodTecKindRoutes.delete(
  "/:id",
  async (request, response) =>
    await prodTecKindController.deleteById(request, response)
);

export default prodTecKindRoutes;

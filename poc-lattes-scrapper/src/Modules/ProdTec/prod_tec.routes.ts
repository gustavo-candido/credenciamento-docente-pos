import { Router } from "express";
import ProdTecController from "./ProdTecController";

const prodTecRoutes = Router();

const prodTecController = new ProdTecController();

prodTecRoutes.post(
  "/",
  async (request, response) => await prodTecController.create(request, response)
);

prodTecRoutes.get(
  "/:id",
  async (request, response) =>
    await prodTecController.findById(request, response)
);

prodTecRoutes.patch(
  "/:id/update",
  async (request, response) => await prodTecController.update(request, response)
);

prodTecRoutes.delete(
  "/:id",
  async (request, response) =>
    await prodTecController.deleteById(request, response)
);

export default prodTecRoutes;

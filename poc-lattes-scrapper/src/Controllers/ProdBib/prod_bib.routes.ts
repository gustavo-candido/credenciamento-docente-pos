import { Router } from "express";
import ProdBibController from "./ProdBibController";

const prodBibRouter = Router();

const prodBibController = new ProdBibController();

prodBibRouter.post(
  "/",
  async (request, response) => await prodBibController.create(request, response)
);

prodBibRouter.get(
  "/:id",
  async (request, response) =>
    await prodBibController.findById(request, response)
);

prodBibRouter.patch(
  "/:id/update",
  async (request, response) => await prodBibController.update(request, response)
);

prodBibRouter.delete(
  "/:id",
  async (request, response) =>
    await prodBibController.deleteById(request, response)
);

export default prodBibRouter;

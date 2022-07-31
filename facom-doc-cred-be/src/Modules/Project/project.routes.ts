import { Router } from "express";
import ProjectController from "./ProjectController";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.post(
  "/",
  async (request, response) => await projectController.create(request, response)
);

projectRouter.get(
  "/:id",
  async (request, response) =>
    await projectController.findById(request, response)
);

projectRouter.patch(
  "/:id/update",
  async (request, response) => await projectController.update(request, response)
);

projectRouter.delete(
  "/:id",
  async (request, response) =>
    await projectController.deleteById(request, response)
);

export default projectRouter;

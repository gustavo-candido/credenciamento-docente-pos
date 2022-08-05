import { Router } from "express";
import ResearchTopicController from "./ResearchTopicController";

const researchTopicRouter = Router();

const researchTopicController = new ResearchTopicController();

researchTopicRouter.post(
  "/",
  async (request, response) =>
    await researchTopicController.create(request, response)
);

researchTopicRouter.get(
  "/:id",
  async (request, response) =>
    await researchTopicController.findById(request, response)
);

researchTopicRouter.get(
  "/",
  async (request, response) =>
    await researchTopicController.findAll(request, response)
);

researchTopicRouter.patch(
  "/:id/update",
  async (request, response) =>
    await researchTopicController.update(request, response)
);

researchTopicRouter.delete(
  "/:id",
  async (request, response) =>
    await researchTopicController.deleteById(request, response)
);

export default researchTopicRouter;

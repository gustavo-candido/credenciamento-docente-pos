import { Router } from "express";
import RankController from "./RankController";

const rankRouter = Router();

const rankController = new RankController();

rankRouter.get(
  "/",
  async (request, response) =>
    await rankController.getAllPoints(request, response)
);

rankRouter.get(
  "/:id",
  async (request, response) =>
    await rankController.getProfessorPoints(request, response)
);

export default rankRouter;

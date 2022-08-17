import { Router } from "express";
import QualisPerController from "./QualisPerController";

const qualisPerRoutes = Router();

const qualisPer = new QualisPerController();

qualisPerRoutes.post(
  "/",
  async (request, response) => await qualisPer.create(request, response)
);

qualisPerRoutes.get(
  "/",
  async (request, response) => await qualisPer.findAll(request, response)
);

qualisPerRoutes.get(
  "/:issn",
  async (request, response) => await qualisPer.findByISSN(request, response)
);

qualisPerRoutes.patch(
  "/:issn/update",
  async (request, response) => await qualisPer.update(request, response)
);

export default qualisPerRoutes;

import { Router } from "express";
import ProfessorController from "./ProfessorController";

const professorRoutes = Router();

const professorController = new ProfessorController();

professorRoutes.post(
  "/",
  async (request, response) =>
    await professorController.create(request, response)
);

professorRoutes.get(
  "/:id",
  async (request, response) =>
    await professorController.findById(request, response)
);

professorRoutes.get(
  "/user/:id",
  async (request, response) =>
    await professorController.findByUser(request, response)
);

professorRoutes.patch(
  "/:id/update",
  async (request, response) =>
    await professorController.update(request, response)
);

professorRoutes.delete(
  "/:id",
  async (request, response) =>
    await professorController.deleteById(request, response)
);

export default professorRoutes;

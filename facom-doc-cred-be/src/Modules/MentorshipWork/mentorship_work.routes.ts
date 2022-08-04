import { Router } from "express";
import MentorshipWorkController from "./MentorshipWorkController";

const mentorshipWorkRoutes = Router();

const mentorshipWorkController = new MentorshipWorkController();

mentorshipWorkRoutes.post(
  "/",
  async (request, response) =>
    await mentorshipWorkController.create(request, response)
);

mentorshipWorkRoutes.get(
  "/:id",
  async (request, response) =>
    await mentorshipWorkController.findById(request, response)
);

mentorshipWorkRoutes.get(
  "/professor/:id",
  async (request, response) =>
    await mentorshipWorkController.findByProfessor(request, response)
);

mentorshipWorkRoutes.patch(
  "/:id/update",
  async (request, response) =>
    await mentorshipWorkController.update(request, response)
);

mentorshipWorkRoutes.delete(
  "/:id",
  async (request, response) =>
    await mentorshipWorkController.deleteById(request, response)
);

export default mentorshipWorkRoutes;

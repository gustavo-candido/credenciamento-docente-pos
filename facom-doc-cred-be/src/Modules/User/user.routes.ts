import { Router } from "express";
import UserController from "./UserController";

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  "/sign-up",
  async (request, response) => await userController.create(request, response)
);

userRouter.post(
  "/sign-in",
  async (request, response) => await userController.auth(request, response)
);

export default userRouter;

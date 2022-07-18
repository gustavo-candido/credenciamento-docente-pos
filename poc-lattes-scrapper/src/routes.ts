import { Router } from "express";
import professorRoutes from "./Controllers/Professor/professor.routes";

const routes = Router();

routes.use("/professor", professorRoutes);

export default routes;

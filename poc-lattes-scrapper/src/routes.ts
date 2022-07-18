import { Router } from "express";
import professorRoutes from "./Controllers/Professor/professor.routes";
import researchTopicRouter from "./Controllers/ResearchTopic/research-topic.routes";

const routes = Router();

routes.use("/professor", professorRoutes);
routes.use("/research-topic", researchTopicRouter);

export default routes;

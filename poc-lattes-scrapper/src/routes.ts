import { Router } from "express";
import mentorshipWorkRoutes from "./Controllers/MentorshipWork/mentorship_work.routes";
import professorRoutes from "./Controllers/Professor/professor.routes";
import researchTopicRouter from "./Controllers/ResearchTopic/research_topic.routes";
import prodBibRoutes from "./Controllers/ProdBib/prod_bib.routes";

const routes = Router();

routes.use("/professor", professorRoutes);
routes.use("/research-topic", researchTopicRouter);
routes.use("/mentorship_work", mentorshipWorkRoutes);
routes.use("/prod-bib", prodBibRoutes);

export default routes;

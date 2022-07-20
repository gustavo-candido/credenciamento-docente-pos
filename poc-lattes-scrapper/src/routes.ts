import { Router } from "express";
import mentorshipWorkRoutes from "./Controllers/MentorshipWork/mentorship_work.routes";
import professorRoutes from "./Controllers/Professor/professor.routes";
import researchTopicRouter from "./Controllers/ResearchTopic/research_topic.routes";
import prodBibRoutes from "./Controllers/ProdBib/prod_bib.routes";
import prodTecRoutes from "./Controllers/ProdTec/prod_tec.routes";

const routes = Router();

routes.use("/professor", professorRoutes);
routes.use("/research-topic", researchTopicRouter);
routes.use("/mentorship-work", mentorshipWorkRoutes);
routes.use("/prod-bib", prodBibRoutes);
routes.use("/prod-tec", prodTecRoutes);

export default routes;

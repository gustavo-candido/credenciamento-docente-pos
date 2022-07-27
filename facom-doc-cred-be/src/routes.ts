import { Router } from "express";
import mentorshipWorkRoutes from "./Modules/MentorshipWork/mentorship_work.routes";
import professorRoutes from "./Modules/Professor/professor.routes";
import researchTopicRouter from "./Modules/ResearchTopic/research_topic.routes";
import prodBibRoutes from "./Modules/ProdBib/prod_bib.routes";
import prodTecRoutes from "./Modules/ProdTec/prod_tec.routes";
import importerRoutes from "./Modules/Importer/importer.routes";

const routes = Router();

routes.use("/professor", professorRoutes);
routes.use("/research-topic", researchTopicRouter);
routes.use("/mentorship-work", mentorshipWorkRoutes);
routes.use("/prod-bib", prodBibRoutes);
routes.use("/prod-tec", prodTecRoutes);
routes.use("/import", importerRoutes);

export default routes;

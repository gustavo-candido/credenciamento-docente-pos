import { Router } from "express";
import mentorshipWorkRoutes from "./Modules/MentorshipWork/mentorship_work.routes";
import professorRoutes from "./Modules/Professor/professor.routes";
import researchTopicRouter from "./Modules/ResearchTopic/research_topic.routes";
import prodBibRoutes from "./Modules/ProdBib/prod_bib.routes";
import prodTecRoutes from "./Modules/ProdTec/prod_tec.routes";
import importerRoutes from "./Modules/Importer/importer.routes";
import projectRouter from "./Modules/Project/project.routes";
import userRouter from "./Modules/User/user.routes";
import prodTecKindRoutes from "./Modules/ProdTecKind/prod_tec_kind.routes";
import rankRouter from "./Modules/Rank/rank.routes";
import qualisPerRouter from "./Modules/QualisPer/qualis_per.routes";
import qualisAnalRouter from "./Modules/QualisAnais/qualis_anais.routes";

const routes = Router();

routes.use("/professor", professorRoutes);
routes.use("/research-topic", researchTopicRouter);
routes.use("/mentorship-work", mentorshipWorkRoutes);
routes.use("/prod-bib", prodBibRoutes);
routes.use("/prod-tec", prodTecRoutes);
routes.use("/prod-tec-kind", prodTecKindRoutes);
routes.use("/import", importerRoutes);
routes.use("/project", projectRouter);
routes.use("/user", userRouter);
routes.use("/rank", rankRouter);
routes.use("/qualis-per", qualisPerRouter);
routes.use("/qualis-anais", qualisAnalRouter);

export default routes;

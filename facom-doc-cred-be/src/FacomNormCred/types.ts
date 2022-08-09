import { MentorshipWorkDTO } from "src/Modules/MentorshipWork/MentorshipWorkRepository";
import { ProdBibDTO } from "src/Modules/ProdBib/ProdBibRepository";
import { ProdTecDTO } from "src/Modules/ProdTec/ProdTecRepository";
import { ProjectDTO } from "src/Modules/Project/ProjectRepository";

export type TProdTecModule = {};

export type TFacomNormCred = {
  mentorship: MentorshipWorkDTO[];
  prod_bib: ProdBibDTO[];
  prod_tec: ProdTecDTO[];
  project: ProjectDTO[];
};

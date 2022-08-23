import { MentorshipWorkDTO } from "../Modules/MentorshipWork/MentorshipWorkRepository";
import { ProdBibDTO } from "../Modules/ProdBib/ProdBibRepository";
import { ProdTecDTO } from "../Modules/ProdTec/ProdTecRepository";
import { ProjectDTO } from "../Modules/Project/ProjectRepository";

export type TProdTecModule = {};

export type TFacomNormCred = {
  mentorship: MentorshipWorkDTO[];
  prod_bib: ProdBibDTO[];
  prod_tec: ProdTecDTO[];
  project: ProjectDTO[];
};

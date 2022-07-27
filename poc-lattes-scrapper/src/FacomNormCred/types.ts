import { MentorshipWorkDTO } from "src/Modules/MentorshipWork/MentorshipWorkRepository";
import { ProdBibDTO } from "src/Modules/ProdBib/ProdBibRepository";

export type TProdTecModule = {};

export type TFacomNormCred = {
  mentorship: MentorshipWorkDTO[];
  prod_bib: ProdBibDTO[];
};

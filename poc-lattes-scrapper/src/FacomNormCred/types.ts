import { MentorshipWorkDTO } from "src/Controllers/MentorshipWork/MentorshipWorkRepository";
import { ProdBibDTO } from "src/Controllers/ProdBib/ProdBibRepository";

export type TProdTecModule = {};

export type TFacomNormCred = {
  mentorship: MentorshipWorkDTO[];
  prod_bib: ProdBibDTO[];
};

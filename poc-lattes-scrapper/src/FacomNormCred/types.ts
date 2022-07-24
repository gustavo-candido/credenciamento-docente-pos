import type {
  MentorshipWorkByDegreeDTO,
  TProdBib,
} from "@FacomLattesExtractor/types";
import { MentorshipWorkDTO } from "src/Controllers/MentorshipWork/MentorshipWorkRepository";

export type TProdBibModule = {
  i_general: TProdBib;
  i_restrict: TProdBib;
};

export type TProdTecModule = {};

export type TFacomNormCred = {
  mentorship: MentorshipWorkDTO[];
};

import type {
  MentorshipWorkByDegree,
  TProdBib,
} from "@FacomLattesExtractor/types";

export type TFormModule = {
  coorMestDout: MentorshipWorkByDegree[];
  doutoresFor: MentorshipWorkByDegree[];
  iCConcluida: MentorshipWorkByDegree[];
  mestresFor: MentorshipWorkByDegree[];
  oriDout: MentorshipWorkByDegree[];
  oriMest: MentorshipWorkByDegree[];
  posDocSup: MentorshipWorkByDegree[];
};

export type TProdBibModule = {
  igeneral: TProdBib;
  irestrict: TProdBib;
};

export type TFacomNormCred = TFormModule & TProdBibModule;

import { MentorshipWorkByDegree, TProdBib } from "@FacomLattesExtractor/types";

export type TFormModule = {
  iCConcluida: MentorshipWorkByDegree[];
  posDocSup: MentorshipWorkByDegree[];
  mestresFor: MentorshipWorkByDegree[];
  doutoresFor: MentorshipWorkByDegree[];
  oriMest: MentorshipWorkByDegree[];
  oriDout: MentorshipWorkByDegree[];
  coorMestDout: MentorshipWorkByDegree[];
};

export type TProdBibModule = {
  irestrict: TProdBib;
  igeneral: TProdBib;
};

export type TFacomNormCred = any;

import type {
  MentorshipWorkByDegreeDTO,
  TProdBib,
} from "@FacomLattesExtractor/types";

export type TFormModule = {
  coorMestDout: MentorshipWorkByDegreeDTO[];
  doutoresFor: MentorshipWorkByDegreeDTO[];
  iCConcluida: MentorshipWorkByDegreeDTO[];
  mestresFor: MentorshipWorkByDegreeDTO[];
  oriDout: MentorshipWorkByDegreeDTO[];
  oriMest: MentorshipWorkByDegreeDTO[];
  posDocSup: MentorshipWorkByDegreeDTO[];
};

export type TProdBibModule = {
  igeneral: TProdBib;
  irestrict: TProdBib;
};

export type TFacomNormCred = TFormModule & TProdBibModule;

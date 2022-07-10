import { MentorshipWorkByDegree } from "@FacomLattesExtractor/types";

export type TFacomNormCred = {
  iCConcluida: MentorshipWorkByDegree[];
  posDocSup: MentorshipWorkByDegree[];
  mestresFor: MentorshipWorkByDegree[];
  doutoresFor: MentorshipWorkByDegree[];
  oriMest: MentorshipWorkByDegree[];
  oriDout: MentorshipWorkByDegree[];
  coorMestDout: MentorshipWorkByDegree[];
};

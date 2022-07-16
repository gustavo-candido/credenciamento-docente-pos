import type {
  MentorshipWorkByDegreeDTO,
  TProdBib,
} from "@FacomLattesExtractor/types";

export type TFormModule = {
  coor_mest_dout: MentorshipWorkByDegreeDTO[];
  doutores_for: MentorshipWorkByDegreeDTO[];
  ic_concluida: MentorshipWorkByDegreeDTO[];
  mestres_for: MentorshipWorkByDegreeDTO[];
  ori_dout: MentorshipWorkByDegreeDTO[];
  ori_mest: MentorshipWorkByDegreeDTO[];
  pos_doc_sup: MentorshipWorkByDegreeDTO[];
};

export type TProdBibModule = {
  i_general: TProdBib;
  i_restrict: TProdBib;
};

export type TProdTecModule = {};

export type TFacomNormCred = TFormModule & TProdBibModule;

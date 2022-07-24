export const QUALIS_PATH = "temp/qualis.xlsx";
export const LATTES_PATH = "temp/henrique.xml";

export const PLACEMENTS = ["PERMANENTE", "VISITANTE", "COLABORADOR"];

export const MENTORSHIP_ROLES = ["ORIENTADOR_PRINCIPAL", "CO_ORIENTADOR"];

export enum mentorshipDegree {
  IC = "IC",
  MAS = "MESTRADO",
  DOU = "DOUTORADO",
  POS = "POS-DOUTORADO",
}

export const MENTORSHIP_DEGREE = Object.values(mentorshipDegree);

export type TLattes = Record<string, any>;

export type MentorshipWorkByDegree = {
  "TIPO-DE-ORIENTACAO": string;
  TITULO: string;
  ANO: string;
  "NOME-DO-ORIENTADO"?: string;
  "NOME-DO-ORIENTANDO"?: string;
  "FLAG-BOLSA": string;
  "CODIGO-AGENCIA-FINANCIADORA"?: string;
  "NOME-DA-AGENCIA"?: string;
};

export type MentorshipWork = {
  concluded: {
    master: MentorshipWorkByDegree[];
    doctoral: MentorshipWorkByDegree[];
    postdoctoral: MentorshipWorkByDegree[];
  };
  current: {
    master: MentorshipWorkByDegree[];
    doctoral: MentorshipWorkByDegree[];
    postdoctoral: MentorshipWorkByDegree[];
  };
};

export type TProdBib = {
  TITLE: string;
  YEAR: string;
  ISSN: string;
  QUALIS: string;
  IGERAL: number;
  IRESTRITO: number;
};

export type TProdWithSummary = {
  DATA: TProdBib[];
  SUMMARY: {
    "IGERAL-TOTAL": number;
    "IRESTRITO-TOTAL": number;
  };
};

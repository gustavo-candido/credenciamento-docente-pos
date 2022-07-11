export type TLattes = Record<string, any>;

export type MentorshipWorkByDegree = {
  role: string;
  title: string;
  year: number;
  studentName: string;
  hasSponsor: boolean;
  sponsorCode?: string;
  sponsorName?: string;
};

export type MentorshipWork = {
  concluded: {
    ic: MentorshipWorkByDegree[];
    master: MentorshipWorkByDegree[];
    doctoral: MentorshipWorkByDegree[];
    postdoctoral: MentorshipWorkByDegree[];
  };
  current: {
    ic: MentorshipWorkByDegree[];
    master: MentorshipWorkByDegree[];
    doctoral: MentorshipWorkByDegree[];
    postdoctoral: MentorshipWorkByDegree[];
  };
};

export type TArticleProd = {
  igeral: number;
  irestrito: number;
  issn: string;
  qualis: string;
  title: string;
  year: number;
};

export type TEventWork = {
  eventName: string;
  igeral: number;
  irestrito: number;
  qualis: string;
  sigla: string;
  title: string;
  year: number;
};

export type TProdBib = {
  article: TArticleProd[];
  event: TEventWork[];
};

export type TFacomLattesExtractor = {
  "NOME-COMPLETO": string;
  "LINHA-DE-PESQUISA": string[];
  Orientacao: MentorshipWork;
  "PROD-BIB": TProdBib;
};

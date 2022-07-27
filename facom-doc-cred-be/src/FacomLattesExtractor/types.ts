export type TLattes = Record<string, any>;

export interface MentorshipWorkByDegreeDTO {
  role: string;
  title: string;
  year: number;
  student_name: string;
  has_sponsor: boolean;
  sponsor_code?: string;
  sponsor_name?: string;
}

export type TMentorshipWork = {
  concluded: {
    ic: MentorshipWorkByDegreeDTO[];
    master: MentorshipWorkByDegreeDTO[];
    doctoral: MentorshipWorkByDegreeDTO[];
    postdoctoral: MentorshipWorkByDegreeDTO[];
  };
  current: {
    ic: MentorshipWorkByDegreeDTO[];
    master: MentorshipWorkByDegreeDTO[];
    doctoral: MentorshipWorkByDegreeDTO[];
    postdoctoral: MentorshipWorkByDegreeDTO[];
  };
};

export type TProdBib = {
  article: ProdArticleDTO[];
  event: TEventWork[];
};

export type TBooksChapter = {
  title: string;
  year: number;
};

export type ProdArticleDTO = {
  i_geral: number;
  i_restrito: number;
  issn: string;
  qualis: string;
  title: string;
  year: number;
};

export type TEventWork = {
  eventName: string;
  i_geral: number;
  i_restrito: number;
  qualis: string;
  sigla: string;
  title: string;
  year: number;
};

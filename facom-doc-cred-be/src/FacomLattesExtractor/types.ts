import { Project } from "@typeorm/entity/Project";

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

export type TProdTec = {
  prod_tec_kind: string;
  score: number;
  title: string;
  year: number;
};

export type ProdArticleDTO = {
  veic_conf: string;
  i_geral: number;
  i_restrito: number;
  issn: string;
  qualis: string;
  title: string;
  year: number;
};

export type TEventWork = {
  veic_conf: string;
  i_geral: number;
  i_restrito: number;
  qualis: string;
  sigla: string;
  title: string;
  year: number;
};

export type TProject = Omit<
  Project,
  "id" | "created_at" | "updated_at" | "professor_id"
>;

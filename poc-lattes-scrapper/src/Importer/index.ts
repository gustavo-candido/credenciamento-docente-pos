import { readLattesAsJson } from "../utils";

import { getName, getResearchesFields, getMentorshipWork } from "./getters";

import type { TLattes, MentorshipWork } from "./types";

type TImporter = {
  "NOME-COMPLETO": string;
  "LINHA-DE-PESQUISA": string[];
  Orientacao: MentorshipWork;
};

class Importer {
  private lattes: TLattes;
  private infos = {} as TImporter;
  constructor() {
    this.lattes = readLattesAsJson();
  }

  getName() {
    const name = getName(this.lattes);

    if (name) {
      this.infos = {
        ...this.infos,
        "NOME-COMPLETO": name,
      };
    }

    return this;
  }

  getFieldOfSearch() {
    const researchesFields = getResearchesFields(this.lattes);

    if (researchesFields) {
      this.infos = {
        ...this.infos,
        "LINHA-DE-PESQUISA": researchesFields,
      };
    }

    return this;
  }

  getMentorshipWork() {
    const mentorshipWork = getMentorshipWork(this.lattes);

    if (mentorshipWork) {
      this.infos = {
        ...this.infos,
        Orientacao: mentorshipWork,
      };
    }

    return this;
  }

  build() {
    return this.infos;
  }
}

export default Importer;

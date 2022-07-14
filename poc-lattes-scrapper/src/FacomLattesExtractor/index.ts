import readLattesAsJson from "@utils/readLattesAsJson";

import {
  getMentorshipWork,
  getName,
  getProdBib,
  getResearchesFields,
} from "./getters";

import type { TFacomLattesExtractor, TLattes } from "./types";

class FacomLattesExtractor {
  private lattes: TLattes;

  public infos = {} as TFacomLattesExtractor;

  constructor() {
    this.lattes = readLattesAsJson();
  }

  public getName() {
    const name = getName(this.lattes);

    if (name) {
      this.infos = {
        ...this.infos,
        "NOME-COMPLETO": name,
      };
    }

    return this;
  }

  public getFieldOfSearch() {
    const researchesFields = getResearchesFields(this.lattes);

    if (researchesFields) {
      this.infos = {
        ...this.infos,
        "LINHA-DE-PESQUISA": researchesFields,
      };
    }

    return this;
  }

  public getMentorshipWork() {
    const mentorshipWork = getMentorshipWork(this.lattes);

    if (mentorshipWork) {
      this.infos = {
        ...this.infos,
        Orientacao: mentorshipWork,
      };
    }

    return this;
  }

  public async getProdBib() {
    const prodBib = await getProdBib(this.lattes);

    if (prodBib) {
      this.infos = {
        ...this.infos,
        "PROD-BIB": prodBib,
      };
    }

    return this;
  }

  public build() {
    return this.infos;
  }
}

export default FacomLattesExtractor;

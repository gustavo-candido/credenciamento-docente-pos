import { readLattesAsJson } from "../utils";

import { getName, getResearchesFields } from "./getters";

import type { TLattes } from "./types";

type TImporter = {
  "NOME-COMPLETO": string;
  "LINHA-DE-PESQUISA": string[];
};

class Importer {
  private lattes: TLattes;
  private infos = {} as TImporter;
  constructor() {
    this.lattes = readLattesAsJson();
  }

  getName() {
    this.infos = {
      ...this.infos,
      "NOME-COMPLETO": getName(this.lattes),
    };

    return this;
  }

  getFieldOfSearch() {
    this.infos = {
      ...this.infos,
      "LINHA-DE-PESQUISA": getResearchesFields(this.lattes),
    };

    return this;
  }

  build() {
    return this.infos;
  }
}

export default Importer;

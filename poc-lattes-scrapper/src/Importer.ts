import { readXML } from "./xmlparser";
import jp from "jsonpath";

class Importer {
  private lattes: any;
  private infos = {};

  constructor() {
    this.lattes = readXML();
  }

  getName() {
    this.infos = {
      ...this.infos,
      "NOME-COMPLETO":
        this.lattes?.["CURRICULO-VITAE"]?.["DADOS-GERAIS"]?.["NOME-COMPLETO"],
    };
    return this;
  }

  getFieldOfSearch() {
    const researchesFields = jp.query(
      this.lattes,
      "$..['TITULO-DA-LINHA-DE-PESQUISA']"
    );

    this.infos = {
      ...this.infos,
      "LINHA-DE-PESQUISA": researchesFields,
    };

    return this;
  }

  build() {
    return this.infos;
  }
}

export default Importer;

import { readXML } from "./xmlparser";

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
        this.lattes["CURRICULO-VITAE"]["DADOS-GERAIS"]["NOME-COMPLETO"],
    };
    return this;
  }

  getFieldOfSearch() {
    const researchsFields = [];

    for (let workActuation of this.lattes?.["CURRICULO-VITAE"]?.[
      "DADOS-GERAIS"
    ]?.["ATUACOES-PROFISSIONAIS"]?.["ATUACAO-PROFISSIONAL"]) {
      if (
        !workActuation?.["ATIVIDADES-DE-PESQUISA-E-DESENVOLVIMENTO"]?.[
          "PESQUISA-E-DESENVOLVIMENTO"
        ]
      )
        continue;
      for (let researchs of workActuation[
        "ATIVIDADES-DE-PESQUISA-E-DESENVOLVIMENTO"
      ]?.["PESQUISA-E-DESENVOLVIMENTO"]) {
        if (!researchs?.["LINHA-DE-PESQUISA"]) continue;
        if (Array.isArray(researchs?.["LINHA-DE-PESQUISA"])) {
          for (let research of researchs?.["LINHA-DE-PESQUISA"]) {
            researchsFields.push(research?.["TITULO-DA-LINHA-DE-PESQUISA"]);
          }
        } else {
          researchsFields.push(
            researchs?.["LINHA-DE-PESQUISA"]?.["TITULO-DA-LINHA-DE-PESQUISA"]
          );
        }
      }
    }

    this.infos = {
      ...this.infos,
      "LINHA-DE-PESQUISA": researchsFields,
    };

    return this;
  }

  build() {
    return this.infos;
  }
}

export default Importer;

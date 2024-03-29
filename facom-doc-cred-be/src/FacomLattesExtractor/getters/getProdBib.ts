import {
  normalizeQualis,
  parentJsonPath,
  prioritizeLanguage,
  qualisScore,
  qualisScoreRestrict,
} from "@utils/index";

import type {
  ProdArticleDTO,
  TEventWork,
  TLattes,
  TProdBib,
} from "@FacomLattesExtractor/types";

import { AppDataSource } from "@typeorm/data-source";
import { QualisPer } from "@typeorm/entity/QualisPer";
import { QualisAnais } from "@typeorm/entity/QualisAnais";

const getProdArticlesNormalized = async (lattes: TLattes) => {
  const articles = parentJsonPath(lattes, "$..['DETALHAMENTO-DO-ARTIGO']");
  const qualisPerRepository = AppDataSource.getRepository(QualisPer);

  const dataArray = await qualisPerRepository.find({
    select: ["issn", "qualis"],
  });

  const dataMap = new Map(dataArray.map((item) => [item.issn, item.qualis]));

  return articles.map((item): ProdArticleDTO => {
    const title = item?.["DADOS-BASICOS-DO-ARTIGO"]?.["TITULO-DO-ARTIGO"];
    const titleEn =
      item?.["DADOS-BASICOS-DO-ARTIGO"]?.["TITULO-DO-ARTIGO-INGLES"];

    const year = parseInt(item?.["DADOS-BASICOS-DO-ARTIGO"]?.["ANO-DO-ARTIGO"]);
    const issn = item?.["DETALHAMENTO-DO-ARTIGO"]?.["ISSN"].replace("-", "");
    const conf =
      item?.["DETALHAMENTO-DO-ARTIGO"]?.["TITULO-DO-PERIODICO-OU-REVISTA"];

    const qualis = dataMap.get(issn) ?? "?";
    const generalScore = normalizeQualis(qualisScore(qualis));
    const restrictScore = normalizeQualis(qualisScoreRestrict(qualis));

    return {
      i_geral: generalScore,
      i_restrito: restrictScore,
      issn,
      qualis,
      title: prioritizeLanguage({ "pt-br": title, en: titleEn }),
      year,
      veic_conf: conf,
    };
  });
};

const getEventWork = async (lattes: TLattes): Promise<TEventWork[]> => {
  const eventWork = parentJsonPath(lattes, "$..['DETALHAMENTO-DO-TRABALHO']");
  const qualisAnaisRepository = AppDataSource.getRepository(QualisAnais);

  return await Promise.all(
    eventWork.map(async (item) => {
      const title = item?.["DADOS-BASICOS-DO-TRABALHO"]?.["TITULO-DO-TRABALHO"];
      const titleEn =
        item?.["DADOS-BASICOS-DO-TRABALHO"]?.["TITULO-DO-TRABALHO-INGLES"];

      const year = parseInt(
        item?.["DADOS-BASICOS-DO-TRABALHO"]?.["ANO-DO-TRABALHO"]
      );

      const eventDetails = item?.["DETALHAMENTO-DO-TRABALHO"];
      const eventNamePT = eventDetails["NOME-DO-EVENTO"]?.toUpperCase();
      const eventNameEN = eventDetails["NOME-DO-EVENTO-INGLES"]?.toUpperCase();

      const eventName = prioritizeLanguage({
        "pt-br": eventNamePT,
        en: eventNameEN,
      });

      let qualis = "?";
      let sigla = "?";

      for (let name of [eventNamePT, eventNameEN]) {
        const data = await qualisAnaisRepository.findOneBy({
          name,
        });

        if (!data) continue;

        qualis = data.qualis;
        sigla = data.sigla;
      }

      const generalScore = qualisScore(qualis);
      const restrictScore = qualisScoreRestrict(qualis);

      return {
        veic_conf: eventName,
        i_geral: generalScore,
        i_restrito: restrictScore,
        qualis,
        sigla,
        title: prioritizeLanguage({ "pt-br": title, en: titleEn }),
        year,
      };
    })
  );
};

const getProdBib = async (lattes: TLattes): Promise<TProdBib> => {
  const articleProd = await getProdArticlesNormalized(lattes);
  const eventWork = await getEventWork(lattes);

  return {
    article: articleProd,
    event: eventWork,
  };
};

export default getProdBib;

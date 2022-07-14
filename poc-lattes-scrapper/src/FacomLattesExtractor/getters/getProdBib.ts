import {
  normalizeQualis,
  parentJsonPath,
  prioritizeLanguage,
  qualisScore,
  qualisScoreRestrict,
} from "@utils/index";

import type {
  TEventWork,
  TLattes,
  TProdBib,
} from "@FacomLattesExtractor/types";

import type { ProdArticleDTO } from "@ProdArticle/ProdArticleDTO";
import { AppDataSource } from "@typeorm/data-source";
import { QualisPer } from "@typeorm/entity/QualisPer";

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

    const qualis = dataMap.get(issn) ?? "?";
    const generalScore = normalizeQualis(qualisScore(qualis));
    const restrictScore = normalizeQualis(qualisScoreRestrict(qualis));

    const currentDate = new Date(Date.now());

    return {
      create_at: currentDate,
      igeral: generalScore,
      irestrito: restrictScore,
      issn,
      qualis,
      title: prioritizeLanguage({ "pt-br": title, en: titleEn }),
      update_at: currentDate,
      year,
    };
  });
};

const getEventWork = (lattes: TLattes): TEventWork[] => {
  const eventWork = parentJsonPath(lattes, "$..['DETALHAMENTO-DO-TRABALHO']");

  return eventWork.map((item) => {
    const title = item?.["DADOS-BASICOS-DO-TRABALHO"]?.["TITULO-DO-TRABALHO"];
    const titleEn =
      item?.["DADOS-BASICOS-DO-TRABALHO"]?.["TITULO-DO-TRABALHO-INGLES"];

    const year = parseInt(
      item?.["DADOS-BASICOS-DO-TRABALHO"]?.["ANO-DO-TRABALHO"]
    );

    const qualis = "?"; //TODO getQualis(item);
    const sigla = "?"; // TODO
    const generalScore = qualisScore(qualis);
    const restrictScore = qualisScoreRestrict(qualis);

    const eventDetails = item?.["DETALHAMENTO-DO-TRABALHO"];
    const eventNamePT = eventDetails["NOME-DO-EVENTO"];
    const eventNameEN = eventDetails["NOME-DO-EVENTO"];
    const eventName = prioritizeLanguage({
      "pt-br": eventNamePT,
      en: eventNameEN,
    });
    return {
      eventName,
      igeral: generalScore,
      irestrito: restrictScore,
      qualis,
      sigla,
      title: prioritizeLanguage({ "pt-br": title, en: titleEn }),
      year,
    };
  });
};

const getProdBib = async (lattes: TLattes): Promise<TProdBib> => {
  const articleProd = await getProdArticlesNormalized(lattes);
  const eventWork = getEventWork(lattes);

  return {
    article: articleProd,
    event: eventWork,
  };
};

export default getProdBib;

// const getQualis = (eventWork: any): string => {
//   const eventWorkDetails = eventWork?.["DETALHAMENTO-DO-TRABALHO"];
//   const eventName = eventWorkDetails?.["NOME-DO-EVENTO"];
//   const eventNameEn = eventWorkDetails?.["NOME-DO-EVENTO-INGLES"];
//   const checkQualis = readQualis();

//   const maybeQualisByIndex = (eventTitle: string) => {
//     return checkQualis.anais.arrBySigla.findIndex(({ sigla }) =>
//       eventTitle.includes(sigla)
//     );
//   };

//   let qualis = checkQualis.anais.mapByName.get(eventName);

//   if (!!qualis) {
//     qualis = checkQualis.anais.mapByName.get(eventNameEn);
//   }

//   if (!!qualis) {
//     const index = maybeQualisByIndex(eventName);
//     if (index >= 0) qualis = checkQualis.anais.arrBySigla[index].qualis;
//   }

//   if (!!qualis) {
//     const index = maybeQualisByIndex(eventNameEn);
//     if (index >= 0) qualis = checkQualis.anais.arrBySigla[index].qualis;
//   }

//   return qualis ?? "?";
// };

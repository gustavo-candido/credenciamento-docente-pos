import {
  normalizeQualis,
  parentJsonPath,
  prioritizeLanguage,
  qualisScore,
  qualisScoreRestrict,
  readQualis,
} from "@utils/index";

import type {
  TLattes,
  TProdBib,
  TProdWithSummary,
} from "@FacomLattesExtractor/types";

const getProdArticlesNormalized = (lattes: TLattes): TProdBib[] => {
  const articles = parentJsonPath(lattes, "$..['DETALHAMENTO-DO-ARTIGO']");
  const checkQualis = readQualis();

  return articles.map((item) => {
    const title = item?.["DADOS-BASICOS-DO-ARTIGO"]?.["TITULO-DO-ARTIGO"];
    const titleEn =
      item?.["DADOS-BASICOS-DO-ARTIGO"]?.["TITULO-DO-ARTIGO-INGLES"];
    const year = item?.["DADOS-BASICOS-DO-ARTIGO"]?.["ANO-DO-ARTIGO"];
    const issn = item?.["DETALHAMENTO-DO-ARTIGO"]?.["ISSN"].replace("-", "");
    const qualis = checkQualis.per.get(issn) ?? "?";
    const generalScore = normalizeQualis(qualisScore(qualis));
    const restrictScore = normalizeQualis(qualisScoreRestrict(qualis));
    return {
      TITLE: prioritizeLanguage({ "pt-br": title, en: titleEn }),
      YEAR: year,
      ISSN: issn,
      QUALIS: qualis,
      IGERAL: generalScore,
      IRESTRITO: restrictScore,
    };
  });
};

const getProdBib = (lattes: TLattes): TProdBib[] => {
  const articleProd = getProdArticlesNormalized(lattes);

  return articleProd;
};

export default getProdBib;

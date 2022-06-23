import {
  normalizeQualis,
  parentJsonPath,
  prioritizeLanguage,
  qualisScore,
  qualisScoreRestrict,
  readQualis,
} from "@utils/index";

import type { TLattes, TProdBib, TProdWithSummary } from "@Importer/types";

const normalizeQualisOfProdBib = (prodBib: TProdBib): TProdBib => ({
  ...prodBib,
  IGERAL: normalizeQualis(prodBib.IGERAL),
  IRESTRITO: normalizeQualis(prodBib.IRESTRITO),
});

const normalizeSummary = (
  summary: TProdWithSummary["SUMMARY"]
): TProdWithSummary["SUMMARY"] => ({
  "IGERAL-TOTAL": normalizeQualis(summary["IGERAL-TOTAL"]),
  "IRESTRITO-TOTAL": normalizeQualis(summary["IRESTRITO-TOTAL"]),
});

const getProdWithSummaryNormalized = (
  prodBib: TProdBib[]
): TProdWithSummary => {
  const updateSummary = (
    acc: TProdWithSummary,
    prod: TProdBib
  ): TProdWithSummary => {
    return {
      DATA: [...acc.DATA, prod],
      SUMMARY: {
        ["IGERAL-TOTAL"]: acc.SUMMARY["IGERAL-TOTAL"] + prod.IGERAL,
        ["IRESTRITO-TOTAL"]: acc.SUMMARY["IRESTRITO-TOTAL"] + prod.IRESTRITO,
      },
    };
  };

  const prodWithSummary = prodBib.reduce(updateSummary, {
    DATA: [],
    SUMMARY: { ["IGERAL-TOTAL"]: 0, ["IRESTRITO-TOTAL"]: 0 },
  });

  return {
    DATA: prodWithSummary.DATA.map((item) => normalizeQualisOfProdBib(item)),
    SUMMARY: normalizeSummary(prodWithSummary.SUMMARY),
  };
};

const getProdArticles = (lattes: TLattes): TProdBib[] => {
  const articles = parentJsonPath(lattes, "$..['DETALHAMENTO-DO-ARTIGO']");
  const checkQualis = readQualis();

  return articles.map((item) => {
    const title = item?.["DADOS-BASICOS-DO-ARTIGO"]?.["TITULO-DO-ARTIGO"];
    const titleEn =
      item?.["DADOS-BASICOS-DO-ARTIGO"]?.["TITULO-DO-ARTIGO-INGLES"];
    const year = item?.["DADOS-BASICOS-DO-ARTIGO"]?.["ANO-DO-ARTIGO"];
    const issn = item?.["DETALHAMENTO-DO-ARTIGO"]?.["ISSN"].replace("-", "");
    const qualis = checkQualis.per.get(issn);
    const generalScore = qualisScore(qualis);
    const restrictScore = qualisScoreRestrict(qualis);
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

const getProdBib = (lattes: TLattes): TProdWithSummary => {
  const articleProd = getProdArticles(lattes);

  return getProdWithSummaryNormalized(articleProd);
};

export default getProdBib;

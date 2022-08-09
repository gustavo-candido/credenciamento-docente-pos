import jsonpath from "jsonpath";
import flattendeep from "lodash.flattendeep";

import prioritizeLanguage from "@utils/prioritizeLanguage";

import type { TLattes } from "@FacomLattesExtractor/types";

export type TArticleReview = {};

const filterByArticleReview = (item: any) =>
  item?.["DADOS-BASICOS-DO-TRABALHO-TECNICO"]?.["NATUREZA"] === "PARECER";

const getArticleReview = (lattes: TLattes) => {
  const tecWorks = jsonpath.query(lattes, "$..['TRABALHO-TECNICO']");

  const articleReview = flattendeep(tecWorks)
    .filter(filterByArticleReview)
    .map((item) => {
      const basicData = item?.["DADOS-BASICOS-DO-TRABALHO-TECNICO"];

      return {
        year: parseInt(basicData?.["ANO"]),
        title: prioritizeLanguage({
          "pt-br": basicData?.["TITULO-DO-TRABALHO-TECNICO"],
          en: basicData?.["TITULO-DO-TRABALHO-TECNICO-INGLES"],
        }),
        country: basicData?.["PAIS"],
      };
    });
  return articleReview;
};

export default getArticleReview;

import jsonpath from "jsonpath";
import flattendeep from "lodash.flattendeep";

import prioritizeLanguage from "@utils/prioritizeLanguage";

import type { TLattes, TProdTec } from "@FacomLattesExtractor/types";

export type TArticleReview = {};

const filterByOpenSource = (item: any) =>
  item?.["DETALHAMENTO-DO-SOFTWARE"]?.["DISPONIBILIDADE"] === "IRRESTRITA";

const getOpenSource = (lattes: TLattes): Pick<TProdTec, "title" | "year">[] => {
  const tecWorks = jsonpath.query(lattes, "$..['SOFTWARE']");

  const articleReview = flattendeep(tecWorks)
    .filter(filterByOpenSource)
    .map((item) => {
      const basicData = item?.["DADOS-BASICOS-DO-SOFTWARE"];

      return {
        year: basicData?.["ANO"],
        title: prioritizeLanguage({
          "pt-br": basicData?.["TITULO-DO-SOFTWARE"],
          en: basicData?.["TITULO-DO-SOFTWARE-INGLES"],
        }),
      };
    });
  return articleReview;
};

export default getOpenSource;

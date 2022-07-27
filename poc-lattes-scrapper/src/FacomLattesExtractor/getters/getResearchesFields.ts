import jsonpath from "jsonpath";
import flattendeep from "lodash.flattendeep";

import { isFilledString, prioritizeLanguage } from "@utils/index";

import type { TLattes } from "@FacomLattesExtractor/types";

const ptTitleKey = "TITULO-DA-LINHA-DE-PESQUISA";
const enTitleKey = "TITULO-DA-LINHA-DE-PESQUISA-INGLES";

const getResearchesFields = (lattes: TLattes): string[] | undefined => {
  const researchesFields = jsonpath.query(lattes, "$..['LINHA-DE-PESQUISA']");

  const researchesFieldsTitles = flattendeep(researchesFields)
    .map(({ [ptTitleKey]: ptTitle, [enTitleKey]: enTitle }) => ({
      "pt-br": ptTitle,
      en: enTitle,
    }))
    .map(prioritizeLanguage);

  const researchesFieldsTitlesTrimmed =
    researchesFieldsTitles.filter(isFilledString);

  return researchesFieldsTitlesTrimmed.length > 0
    ? researchesFieldsTitlesTrimmed
    : undefined;
};

export default getResearchesFields;

import jsonpath from "jsonpath";
import flattendeep from "lodash.flattendeep";
import { isFilledString } from "../../utils";

import type { TLattes } from "../types";

const ptTitleKey = "TITULO-DA-LINHA-DE-PESQUISA";
const enTitleKey = "TITULO-DA-LINHA-DE-PESQUISA-INGLES";

type IResearchField = {
  [ptTitleKey]?: string;
  [enTitleKey]?: string;
};

const prioritizePortugueseTitle = (item: IResearchField) => {
  if (isFilledString(item?.[ptTitleKey])) {
    return item?.[ptTitleKey];
  }
  return item?.[enTitleKey];
};

const getResearchesFields = (lattes: TLattes): string[] | undefined => {
  const researchesFields = jsonpath.query(lattes, "$..['LINHA-DE-PESQUISA']");

  const researchesFieldsTitles = flattendeep(researchesFields).map(
    prioritizePortugueseTitle
  );

  const researchesFieldsTitlesTrimmed =
    researchesFieldsTitles.filter(isFilledString);

  return researchesFieldsTitlesTrimmed.length > 0
    ? researchesFieldsTitlesTrimmed
    : undefined;
};

export default getResearchesFields;

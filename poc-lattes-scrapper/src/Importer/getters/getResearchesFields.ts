import _ from "jsonpath";

import type { TLattes } from "../types";

const getResearchesFields = (lattes: TLattes): string[] => {
  return _.query(lattes, "$..['TITULO-DA-LINHA-DE-PESQUISA']");
};

export default getResearchesFields;

import isFilledString from "@utils/isFilledString";
import type { TLattes } from "@Importer/types";

const getName = (lattes: TLattes): string | undefined => {
  const name = lattes?.["CURRICULO-VITAE"]?.["DADOS-GERAIS"]?.["NOME-COMPLETO"];

  return isFilledString(name) ? name : undefined;
};

export default getName;

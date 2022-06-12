import { isFilledString } from "../../utils";
import type { TLattes } from "../types";

const getName = (lattes: TLattes): string | undefined => {
  const name = lattes?.["CURRICULO-VITAE"]?.["DADOS-GERAIS"]?.["NOME-COMPLETO"];

  return isFilledString(name) ? name : undefined;
};

export default getName;

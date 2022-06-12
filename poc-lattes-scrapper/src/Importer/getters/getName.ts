import { TLattes } from "Importer/types";

const getName = (lattes: TLattes): string => {
  return lattes?.["CURRICULO-VITAE"]?.["DADOS-GERAIS"]?.["NOME-COMPLETO"];
};

export default getName;

import isFilledString from "@utils/isFilledString";
import type { TLattes } from "@FacomLattesExtractor/types";

const getLattesId = (lattes: TLattes): string | undefined => {
  const name = lattes?.["CURRICULO-VITAE"]?.["NUMERO-IDENTIFICADOR"];

  return isFilledString(name) ? name : undefined;
};

export default getLattesId;

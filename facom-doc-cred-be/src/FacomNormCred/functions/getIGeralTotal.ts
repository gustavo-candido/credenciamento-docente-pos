import { TProdBib } from "@FacomLattesExtractor/types";

export default function getIGeralTotal(prodBib: TProdBib): number {
  return prodBib.article.reduce((acc, art) => {
    return acc + art.i_geral;
  }, 0);
}

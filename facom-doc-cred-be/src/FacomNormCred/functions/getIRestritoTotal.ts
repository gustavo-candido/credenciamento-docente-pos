import { TProdBib } from "@FacomLattesExtractor/types";

export default function getIRestritoTotal(prodBib: TProdBib): number {
  return prodBib.article.reduce((acc, art) => {
    return acc + art.i_restrito;
  }, 0);
}
